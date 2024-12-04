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
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('home');
    }

    /**
     * Get statistics with time series data
     *
     * @return array
     */

    public function getStats()
    {
        $period = request()->query('period', 'year'); // day, week, month, year

        // Set default date ranges based on period
        switch ($period) {
            case 'year':
                $start_date = Carbon::now()->startOfYear();
                $end_date = Carbon::now()->endOfYear();
                break;
            case 'month':
                $start_date = Carbon::now()->startOfMonth();
                $end_date = Carbon::now()->endOfMonth();
                break;
            case 'week':
                $start_date = Carbon::now()->startOfWeek();
                $end_date = Carbon::now()->endOfWeek();
                break;
            case 'yesterday':
                $start_date = Carbon::yesterday()->startOfDay();
                $end_date = Carbon::yesterday()->endOfDay();
                break;
            default: // today
                $start_date = Carbon::now()->startOfDay();
                $end_date = Carbon::now()->endOfDay();
                break;
        }


        // Override defaults if dates are provided
        $start_date = request()->query('start_date')
            ? Carbon::parse(request()->query('start_date'))->startOfDay()
            : $start_date;

        $end_date = request()->query('end_date')
            ? Carbon::parse(request()->query('end_date'))->endOfDay()
            : $end_date;

        // convert start time and end time to utc
        $start_date = Carbon::parse($start_date)->setTimezone('UTC');
        $end_date = Carbon::parse($end_date)->setTimezone('UTC');


        // Modify grouping configuration to handle daily granularity better
        $grouping = $this->getGroupingConfig($period);

        // Generate date periods
        $dates = [];
        $current = clone $start_date;
        while ($current <= $end_date) {
            $dates[] = $current->format($grouping['date_format']);
            $current->add($grouping['interval_period'], $grouping['interval_value']);
        }

        // Alternative query methods to try
        $visitors_data = Visitors::where('created_at', '>=', $start_date)
            ->where('created_at', '<=', $end_date)
            ->select(
                DB::raw("DATE_FORMAT(created_at, '{$grouping['sql_format']}') as date"),
                DB::raw('COUNT(DISTINCT CASE WHEN is_new = 1 THEN tracking_id END) as new_visitors'),
                DB::raw('COUNT(DISTINCT CASE WHEN is_new = 0 THEN tracking_id END) as returning_visitors')
            )
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '{$grouping['sql_format']}')"))
            ->get()
            ->keyBy('date');

        // Format series data
        $new_visitors_data = [];
        $returning_visitors_data = [];
        $labels = [];

        foreach ($dates as $date) {
            $carbon_date = Carbon::createFromFormat($grouping['date_format'], $date);
            $labels[] = $carbon_date->format($grouping['label_format']);
            $new_visitors_data[] = isset($visitors_data[$date]) ? (int)$visitors_data[$date]->new_visitors : 0;
            $returning_visitors_data[] = isset($visitors_data[$date]) ? (int)$visitors_data[$date]->returning_visitors : 0;
        }

        $recentVisitors = Visitors::whereBetween('created_at', [$start_date, $end_date])
            ->select(
                'tracking_id',
                DB::raw('MAX(created_at) as last_visit'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN is_new END) as is_new'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN platform END) as platform'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN browser END) as browser'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN is_desktop END) as is_desktop'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN location END) as location'),
                DB::raw('MAX(CASE WHEN created_at = (SELECT MAX(created_at) FROM visitors v2 WHERE v2.tracking_id = visitors.tracking_id) THEN url END) as url')
            )
            ->groupBy('tracking_id')
            ->orderBy('last_visit', 'desc')
            ->take(5)
            ->get();

        // Get detailed visits for each recent visitor
        $visitorDetails = [];
        foreach ($recentVisitors as $visitor) {
            $visits = Visitors::where('tracking_id', $visitor->tracking_id)
                ->whereBetween('created_at', [$start_date, $end_date])
                ->select(
                    'url',
                    'created_at',
                    'platform',
                    'browser',
                    'location',
                    'is_new'
                )
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

            $visitorDetails[] = [
                'visitor' => [
                    'tracking_id' => $visitor->tracking_id,
                    'is_new' => $visitor->is_new,
                    'platform' => $visitor->platform,
                    'browser' => $visitor->browser,
                    'is_desktop' => $visitor->is_desktop,
                    'location' => $visitor->location,
                    'last_visit' => $visitor->last_visit
                ],
                'visits' => $visits->map(function ($visit) {
                    return [
                        'url' => $visit->url,
                        'timestamp' => $visit->created_at->format('Y-m-d H:i:s'),
                        'platform' => $visit->platform,
                        'browser' => $visit->browser,
                        'location' => $visit->location,
                        'is_new' => $visit->is_new
                    ];
                })
            ];
        }

        $quotes = QuoteRequest::latest()->take(5)->get();

        $activities = [];

        foreach ($quotes as $quote) {
            $activities[] = [
                'type' => 'quote_request',
                'timestamp' => $quote->created_at->format('Y-m-d H:i:s'),
                'data' => [
                    'items_count' => count($quote->cartItems),
                    'email' => $quote->email,
                    'message' => $quote->shipping
                ]
            ];
        }

        // Stats array with the modified visitor data
        $stats = [
            'period' => $period,
            'date_range' => [
                'start' => $start_date->format('Y-m-d'),
                'end' => $end_date->format('Y-m-d')
            ],
            'total_clients' => Client::count(),
            'total_admins' => User::where('role', 1)->count(),
            'visitor_details' => $visitorDetails,
            'activities' => $activities,
            'visitors' => Visitors::whereBetween('created_at', [$start_date, $end_date])
                ->select('tracking_id', 'is_new', 'platform', 'browser', 'is_desktop', 'location')
                ->orderBy('created_at', 'desc')
                ->get(),
            'total_posts' => Post::whereBetween('created_at', [$start_date, $end_date])->count(),
            'series' => [
                'labels' => $labels ?? [],
                'datasets' => [
                    [
                        'name' => 'New Visitors',
                        'data' => $new_visitors_data ?? []
                    ],
                    [
                        'name' => 'Returning Visitors',
                        'data' => $returning_visitors_data ?? []
                    ]
                ]
            ]
        ];

        return $stats;
    }

    /**
     * Get grouping configuration based on period
     *
     * @param string $period
     * @return array
     */
    private function getGroupingConfig($period)
    {
        return match ($period) {
            'year' =>
            [
                'sql_format' => '%Y-%m',
                'date_format' => 'Y-m',
                'label_format' => 'M',
                'interval_period' => 'month',
                'interval_value' => 1
            ],
            'month' =>
            [
                'sql_format' => '%Y-%m-%d',
                'date_format' => 'Y-m-d',
                'label_format' => 'j',  // Day of the month without leading zeros
                'interval_period' => 'day',
                'interval_value' => 1
            ],
            'week' => [
                'sql_format' => '%Y-%m-%d',
                'date_format' => 'Y-m-d',
                'label_format' => 'D',  // Mon, Tue, etc.
                'interval_period' => 'day',
                'interval_value' => 1
            ],
            default =>
            [
                'sql_format' => '%H', // SQL hour format
                'date_format' => 'H', // PHP hour format
                'label_format' => 'g A', // Convert to 12-hour format with AM/PM (e.g., 1 PM)
                'interval_period' => 'hour',
                'interval_value' => 2
            ]
        };
    }
}
