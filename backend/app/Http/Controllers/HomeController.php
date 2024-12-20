<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Post;
use App\Models\QuoteRequest;
use App\Models\User;
use App\Models\Visitors;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    // Reduced cache time for file driver to prevent stale cache files
    private const CACHE_TTL = 300; // 5 minutes
    private const STATIC_CACHE_TTL = 1800; // 30 minutes for less frequently changing data

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('home');
    }

    public function getStats()
    {
        $period = request()->query('period', 'year');
        $customStartDate = request()->query('start_date');
        $customEndDate = request()->query('end_date');

        // Include authenticated user ID in cache key to prevent cache collisions
        $userId = auth()->id();
        $cacheKey = "stats_u{$userId}_{$period}_{$customStartDate}_{$customEndDate}";

        // Using shorter TTL with file cache
        $stats = Cache::remember($cacheKey, self::CACHE_TTL, function () use ($period, $customStartDate, $customEndDate) {
            [$start_date, $end_date] = $this->getDateRange($period, $customStartDate, $customEndDate);
            $grouping = $this->getGroupingConfig($period);

            // Fetch data in parallel using database transactions
            DB::beginTransaction();
            try {
                $stats = [
                    'period' => $period,
                    'date_range' => [
                        'start' => $start_date->format('Y-m-d'),
                        'end' => $end_date->format('Y-m-d')
                    ],
                    'total_clients' => $this->getCachedCount('clients_count', fn() => Client::count()),
                    'total_admins' => $this->getCachedCount('admins_count', fn() => User::where('role', 1)->count()),
                    'visitor_details' => $this->getRecentVisitors($start_date, $end_date),
                    'activities' => $this->getRecentActivities(),
                    'visitors' => $this->getVisitorsData($start_date, $end_date),
                    'total_posts' => Post::whereBetween('created_at', [$start_date, $end_date])->count(),
                    'series' => $this->getVisitorsSeries($start_date, $end_date, $grouping)
                ];
                DB::commit();
                return $stats;
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        });

        return $stats;
    }

    private function getDateRange($period, $customStartDate, $customEndDate)
    {
        $start_date = match ($period) {
            'year' => Carbon::now()->startOfYear(),
            'month' => Carbon::now()->startOfMonth(),
            'week' => Carbon::now()->startOfWeek(),
            'yesterday' => Carbon::yesterday()->startOfDay(),
            default => Carbon::now()->startOfDay()
        };

        $end_date = match ($period) {
            'year' => Carbon::now()->endOfYear(),
            'month' => Carbon::now()->endOfMonth(),
            'week' => Carbon::now()->endOfWeek(),
            'yesterday' => Carbon::yesterday()->endOfDay(),
            default => Carbon::now()->endOfDay()
        };

        if ($customStartDate) {
            $start_date = Carbon::parse($customStartDate)->startOfDay();
        }
        if ($customEndDate) {
            $end_date = Carbon::parse($customEndDate)->endOfDay();
        }

        return [
            $start_date->setTimezone('UTC'),
            $end_date->setTimezone('UTC')
        ];
    }

    private function getRecentVisitors($start_date, $end_date)
    {
        $key = "recent_visitors_" . $start_date->timestamp . "_" . $end_date->timestamp;

        return Cache::remember($key, self::CACHE_TTL, function () use ($start_date, $end_date) {
            return Visitors::whereBetween('created_at', [$start_date, $end_date])
                ->select(
                    'tracking_id',
                    DB::raw('MAX(created_at) as last_visit'),
                    DB::raw('FIRST_VALUE(is_new) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as is_new'),
                    DB::raw('FIRST_VALUE(platform) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as platform'),
                    DB::raw('FIRST_VALUE(browser) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as browser'),
                    DB::raw('FIRST_VALUE(is_desktop) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as is_desktop'),
                    DB::raw('FIRST_VALUE(location) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as location'),
                    DB::raw('FIRST_VALUE(url) OVER (PARTITION BY tracking_id ORDER BY created_at DESC) as url')
                )
                ->groupBy('tracking_id')
                ->orderBy('last_visit', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($visitor) use ($start_date, $end_date) {
                    $visitsKey = "visitor_visits_{$visitor->tracking_id}_{$start_date->timestamp}_{$end_date->timestamp}";

                    return [
                        'visitor' => [
                            'tracking_id' => $visitor->tracking_id,
                            'is_new' => $visitor->is_new,
                            'platform' => $visitor->platform,
                            'browser' => $visitor->browser,
                            'is_desktop' => $visitor->is_desktop,
                            'location' => $visitor->location,
                            'last_visit' => $visitor->last_visit
                        ],
                        'visits' => Cache::remember($visitsKey, self::CACHE_TTL, function () use ($visitor, $start_date, $end_date) {
                            return Visitors::where('tracking_id', $visitor->tracking_id)
                                ->whereBetween('created_at', [$start_date, $end_date])
                                ->select('url', 'created_at', 'platform', 'browser', 'location', 'is_new')
                                ->orderBy('created_at', 'desc')
                                ->limit(5)
                                ->get()
                                ->map(fn($visit) => [
                                    'url' => $visit->url,
                                    'timestamp' => $visit->created_at->format('Y-m-d H:i:s'),
                                    'platform' => $visit->platform,
                                    'browser' => $visit->browser,
                                    'location' => $visit->location,
                                    'is_new' => $visit->is_new
                                ]);
                        })
                    ];
                });
        });
    }

    private function getRecentActivities()
    {
        return Cache::remember('recent_activities', self::CACHE_TTL, function () {
            return QuoteRequest::latest()
                ->take(5)
                ->get()
                ->map(fn($quote) => [
                    'type' => 'quote_request',
                    'timestamp' => $quote->created_at->format('Y-m-d H:i:s'),
                    'data' => [
                        'items_count' => count($quote->cartItems),
                        'email' => $quote->email,
                        'message' => $quote->shipping
                    ]
                ]);
        });
    }

    private function getVisitorsData($start_date, $end_date)
    {
        $key = "visitors_data_{$start_date->timestamp}_{$end_date->timestamp}";

        return Cache::remember($key, self::CACHE_TTL, function () use ($start_date, $end_date) {
            return Visitors::whereBetween('created_at', [$start_date, $end_date])
                ->select('tracking_id', 'is_new', 'platform', 'browser', 'is_desktop', 'location')
                ->orderBy('created_at', 'desc')
                ->get();
        });
    }

    private function getVisitorsSeries($start_date, $end_date, $grouping)
    {
        $key = "visitors_series_{$start_date->timestamp}_{$end_date->timestamp}";

        return Cache::remember($key, self::CACHE_TTL, function () use ($start_date, $end_date, $grouping) {
            $dates = $this->generateDatePeriods($start_date, $end_date, $grouping);

            $visitors_data = DB::table('visitors')
                ->where('created_at', '>=', $start_date)
                ->where('created_at', '<=', $end_date)
                ->select(
                    DB::raw("DATE_FORMAT(created_at, '{$grouping['sql_format']}') as date"),
                    DB::raw('COUNT(DISTINCT CASE WHEN is_new = 1 THEN tracking_id END) as new_visitors'),
                    DB::raw('COUNT(DISTINCT CASE WHEN is_new = 0 THEN tracking_id END) as returning_visitors')
                )
                ->groupBy(DB::raw("DATE_FORMAT(created_at, '{$grouping['sql_format']}')"))
                ->get()
                ->keyBy('date');

            return $this->formatSeriesData($dates, $visitors_data, $grouping);
        });
    }

    private function generateDatePeriods($start_date, $end_date, $grouping)
    {
        $dates = [];
        $current = clone $start_date;

        while ($current <= $end_date) {
            $dates[] = $current->format($grouping['date_format']);
            $current->add($grouping['interval_period'], $grouping['interval_value']);
        }

        return $dates;
    }

    private function formatSeriesData($dates, $visitors_data, $grouping)
    {
        $labels = [];
        $new_visitors = [];
        $returning_visitors = [];

        foreach ($dates as $date) {
            $carbon_date = Carbon::createFromFormat($grouping['date_format'], $date);
            $labels[] = $carbon_date->format($grouping['label_format']);
            $new_visitors[] = isset($visitors_data[$date]) ? (int)$visitors_data[$date]->new_visitors : 0;
            $returning_visitors[] = isset($visitors_data[$date]) ? (int)$visitors_data[$date]->returning_visitors : 0;
        }

        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'name' => 'New Visitors',
                    'data' => $new_visitors
                ],
                [
                    'name' => 'Returning Visitors',
                    'data' => $returning_visitors
                ]
            ]
        ];
    }

    private function getCachedCount($key, $callback)
    {
        return Cache::remember($key, self::STATIC_CACHE_TTL, $callback);
    }

    private function getGroupingConfig($period)
    {
        return match ($period) {
            'year' => [
                'sql_format' => '%Y-%m',
                'date_format' => 'Y-m',
                'label_format' => 'M',
                'interval_period' => 'month',
                'interval_value' => 1
            ],
            'month' => [
                'sql_format' => '%Y-%m-%d',
                'date_format' => 'Y-m-d',
                'label_format' => 'j',
                'interval_period' => 'day',
                'interval_value' => 1
            ],
            'week' => [
                'sql_format' => '%Y-%m-%d',
                'date_format' => 'Y-m-d',
                'label_format' => 'D',
                'interval_period' => 'day',
                'interval_value' => 1
            ],
            default => [
                'sql_format' => '%H',
                'date_format' => 'H',
                'label_format' => 'g A',
                'interval_period' => 'hour',
                'interval_value' => 2
            ]
        };
    }
}
