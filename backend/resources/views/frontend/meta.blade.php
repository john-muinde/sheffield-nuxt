@php
    use Illuminate\Support\Str;
    use Illuminate\Support\Facades\Log;

    class MetaGenerator
    {
        protected $supportedTypes = [
            'blogs' => \App\Models\Blog::class,
            'product' => \App\Models\Product::class,
            'video' => \App\Models\Video::class,
            'media' => [\App\Models\Blog::class, \App\Models\Video::class, \App\Models\Product::class],
        ];

        public function extractIdFromUrl($url)
        {
            $segments = parse_url($url, PHP_URL_PATH);
            $segments = explode('/', trim($segments, '/'));

            // Handle case where ID is the second last segment
            $lastSegment = end($segments);
            $secondLastSegment = prev($segments);
            $thirdLastSegment = prev($segments);

            if (is_numeric($lastSegment)) {
                return ['type' => $thirdLastSegment, 'id' => $secondLastSegment];
            }

            foreach ($segments as $index => $segment) {
                if (isset($this->supportedTypes[$segment])) {
                    // Check next segment for potential ID
                    if (isset($segments[$index + 1])) {
                        $possibleId = $segments[$index + 1];

                        // Handle URLs with hyphens or underscores
                        if (Str::contains($possibleId, ['-', '_'])) {
                            $extractedId = Str::before($possibleId, '-');
                            $extractedId = Str::before($extractedId, '_');

                            return is_numeric($extractedId) ? ['type' => $segment, 'id' => $extractedId] : null;
                        }

                        // Handle URLs with ID followed by name
                        if (is_numeric($possibleId)) {
                            return ['type' => $segment, 'id' => $possibleId];
                        }
                    }
                }
            }

            return null;
        }

        public function findContent($extractedData)
        {
            $content = null;

            if ($extractedData && isset($this->supportedTypes[$extractedData['type']])) {
                $models = $this->supportedTypes[$extractedData['type']];
                $modelsToCheck = is_array($models) ? $models : [$models];

                foreach ($modelsToCheck as $modelClass) {
                    try {
                        $content = $modelClass::find($extractedData['id']);
                        if ($content) {
                            return [
                                'type' => $extractedData['type'],
                                'content' => $content,
                            ];
                        }
                    } catch (\Exception $e) {
                        Log::error('Error finding content: ' . $e->getMessage());
                    }
                }
            }

            return null;
        }

        public function generateMetaTags($contentData)
        {
            if (!$contentData) {
                return $this->getDefaultMetaTags();
            }

            $content = $contentData['content'];
            $type = $contentData['type'];

            // Clean description method
            $cleanDescription = function ($description, $maxLength = 160) {
                $cleanText = strip_tags($description);
                $cleanText = html_entity_decode($cleanText);

                if (strlen($cleanText) > $maxLength) {
                    $cleanText = substr($cleanText, 0, $maxLength) . '...';
                }

                return htmlspecialchars($cleanText, ENT_QUOTES, 'UTF-8');
            };

            // Dynamic meta tag generation based on content type
            switch ($type) {
                case 'blogs':
                    return [
                        'title' => $content->name . ' | Sheffield Steel Systems Blog',
                        'description' => $cleanDescription($content->content),
                        'ogTitle' => $content->name,
                        'ogDescription' => $cleanDescription($content->content),
                        'primaryImage' => $content->main_image_path
                            ? url('storage/' . $content->main_image_path)
                            : url('assets/images/logo.png'),
                        'jsonLdSchema' => [
                            '@context' => 'https://schema.org',
                            '@type' => 'BlogPosting',
                            'headline' => $content->name,
                            'image' => [url('storage/' . $content->main_image_path)],
                            'datePublished' => $content->created_at->toIso8601String(),
                            'dateModified' => $content->updated_at->toIso8601String(),
                            'author' => $content->author
                                ? [
                                    [
                                        '@type' => 'Person',
                                        'name' => $content->author->name,
                                        'url' =>
                                            $content->author->profile_url ??
                                            url('/author') . '/' . $content->author->id,
                                    ],
                                ]
                                : [
                                    [
                                        '@type' => 'Organization',
                                        'name' => 'Sheffield Steel Systems Limited',
                                        'url' => url('/'),
                                    ],
                                ],
                        ],
                    ];

                case 'product':
                    return [
                        'title' => $content->name . ' | Sheffield Steel Systems',
                        'description' => $cleanDescription($content->description ?? ''),
                        'ogTitle' => $content->name . ' - Sheffield Steel Systems',
                        'ogDescription' => $cleanDescription($content->description ?? ''),
                        'primaryImage' => $content->main_image_path
                            ? url('storage/' . $content->main_image_path)
                            : url('assets/images/logo.png'),
                        'jsonLdSchema' => null,
                    ];

                case 'video':
                    return [
                        'title' => $content->title . ' | Sheffield Steel Systems',
                        'description' => $cleanDescription($content->description ?? ''),
                        'ogTitle' => $content->title . ' - Sheffield Steel Systems',
                        'ogDescription' => $cleanDescription($content->description ?? ''),
                        'primaryImage' => $content->thumbnail ? $content->thumbnail : url('assets/images/logo.png'),
                        'jsonLdSchema' => [
                            '@context' => 'https://schema.org',
                            '@type' => 'VideoObject',
                            'name' => $content->title,
                            'description' => $content->description,
                            'thumbnailUrl' => $content->thumbnail ?? url('assets/images/logo.png'),
                            'uploadDate' => $content->created_at->toIso8601String(),
                        ],
                    ];

                default:
                    return $this->getDefaultMetaTags();
            }
        }

        public function getDefaultMetaTags()
        {
            return [
                'title' => 'Sheffield Steel Systems | Commercial Kitchen, Laundry & Steel Solutions',
                'description' => "Discover Sheffield Steel Systems, East Africa's leader in commercial kitchen equipment, laundry solutions,
                    coldrooms, steel fabrication.",
                'ogTitle' => 'Sheffield Steel Systems Limited - Transforming Ideas into Sustainable Realities',
                'ogDescription' =>
                    "East Africa's leading solution and service provider for Commercial Kitchen, commercial equipment, Laundry, and Cold Storage Solutions.",
                'primaryImage' => url('assets/images/logo.png'),
                'jsonLdSchema' => null,
            ];
        }
    }

    // Initialize and use the MetaGenerator
    $metaGenerator = new MetaGenerator();
    $currentUrl = request()->fullUrl();
    $extractedId = $metaGenerator->extractIdFromUrl($currentUrl);
    $contentData = $extractedId ? $metaGenerator->findContent($extractedId) : null;
    $metaTags = $metaGenerator->generateMetaTags($contentData);

    $productsForSchema = collect();
    $promotionalProducts = [];

    $currentProduct = $contentData && $contentData['type'] === 'product' ? $contentData['content'] : null;

    if ($currentProduct) {
        $currentProduct = \App\Http\Resources\ProductResource::make($currentProduct);
        $productsForSchema->push($currentProduct);
    } else {
        $promotionalProducts = \App\Models\Product::whereHas('productCategories', function ($query) {
            $query->where('category_id', 371);
        })
            ->where('is_published', true)
            ->with('productBrand', 'productCategories')
            ->get();
        $productsForSchema = $productsForSchema->merge($promotionalProducts)->unique('id');
    }
    foreach ($productsForSchema as &$product) {
        $product->productImages;
    }
@endphp

<!-- Primary Meta Tags -->
<title>{{ $metaTags['title'] }}</title>
<meta name="description" content="{{ $metaTags['description'] }}">
<meta name="author" content="Sheffield Steel Systems Limited">
<meta name="designer" content="Sheffield Steel Systems Limited">
<meta name="publisher" content="Sheffield Steel Systems Limited">
<meta name="copyright" content="Sheffield Steel Systems Limited">
<meta name="rating" content="general">
<meta name="distribution" content="global">
<meta name="revisit-after" content="1 day">
<meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large">

<!-- Comprehensive Keywords List -->
<meta name="keywords"
    content="
        commercial kitchen equipment kenya, industrial kitchen supplier east africa, commercial kitchen manufacturer africa,
        coldroom installation nairobi, industrial refrigeration kenya, cold storage solutions east africa,
        stainless steel fabrication kenya, custom steel work nairobi, metal fabrication east africa,

        commercial kitchen equipment, industrial kitchen design, kitchen installation services,
        commercial refrigeration systems, walk-in coldrooms, blast freezers, chillers,
        stainless steel counters, steel fixtures, custom fabrication,
        industrial laundry equipment, commercial washing machines, industrial dryers,

        restaurant kitchen equipment, hotel kitchen solutions, hospital kitchen systems,
        school cafeteria equipment, industrial canteen setup, food processing equipment,
        bakery equipment, butchery equipment, supermarket installations,

        commercial ovens, industrial cookers, professional grills,
        food prep stations, commercial fridges, freezer rooms,
        dishwashing systems, ventilation hoods, cooking ranges,

        kitchen consultancy, project management, maintenance services,
        equipment repair, spare parts supply, warranty services,
        kitchen design, layout optimization, workflow planning,

        HACCP compliant kitchens, food safety equipment, hygiene systems,
        energy-efficient solutions, sustainable kitchen design, green technologies,
        kitchen automation, monitoring systems, smart kitchen solutions,

        Java House kitchen systems, KFC equipment supplier, Carrefour installations,
        Sarova Hotels kitchen partner, Big Square equipment, Artcaffe solutions,
        Nairobi Hospital systems, AKUH installations, Karen Hospital equipment,
        Kenya Airways catering, Hilton Hotels supplier, Radisson installations,
        Kenchic industrial, Standard Chartered facilities, Naivas solutions,
        Gertrudes Hospital, MP Shah equipment, Muthaiga Country Club,
        Karen Country Club, Capital Club, Vetlab Club installations,
        East African Breweries, Strathmore University, USIU facilities,

        nairobi commercial kitchens, mombasa restaurant equipment,
        kisumu kitchen installations, eldoret coldroom solutions,
        nakuru steel fabrication, nyeri kitchen equipment,
        kampala uganda installations, dar es salaam solutions,
        kigali rwanda equipment, arusha tanzania systems,
        juba south sudan partner, bujumbura burundi supplier,

        hotel kitchen equipment, restaurant solutions, hospital systems,
        school cafeteria installations, industrial kitchen setups,
        supermarket refrigeration, butchery equipment, bakery solutions,

        commercial kitchen maintenance, equipment repair services,
        spare parts supplier, warranty support, technical assistance,
        project consulting, kitchen design services, layout planning,

        industrial cooking equipment, commercial food prep,
        kitchen storage solutions, ventilation systems,
        food service equipment, catering solutions,

        coldroom installation, freezer room setup,
        blast chiller systems, refrigeration solutions,
        temperature control systems, cold storage,

        stainless steel fabrication, custom metal work,
        steel kitchen equipment, metalwork solutions,
        custom countertops, steel fixtures,

        laundry equipment, commercial washers,
        industrial dryers, laundry solutions,
        cleaning equipment systems,

        restaurant chain solutions, hotel group equipment,
        hospital kitchen systems, school catering equipment,
        industrial facility solutions, commercial setups">


<!-- Open Graph / Facebook -->
<meta property="og:title" content="{{ $metaTags['ogTitle'] }}">
<meta property="og:description" content="{{ $metaTags['ogDescription'] }}">
<meta property="og:image" content="{{ $metaTags['primaryImage'] }}">
<meta property="og:image:secure_url" content="{{ $metaTags['primaryImage'] }}">
<link rel="canonical" href="{{ url()->current() }}">
<meta property="og:locale" content="en_US">
<meta property="og:type" content="website">
<meta property="og:url" content="{{ url()->current() }}">
<meta property="og:site_name" content="Sheffield Steel Systems Limited">
<meta property="og:updated_time" content="{{ now()->toIso8601String() }}">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="622">
<meta property="og:image:alt" content="Sheffield Steel Systems Limited">
<meta property="og:image:type" content="image/png">
<meta property="article:published_time" content="2003-01-01T00:00:00+00:00">
<meta property="article:modified_time" content="{{ now()->toIso8601String() }}">



<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ $metaTags['ogTitle'] }}">
<meta name="twitter:description" content="{{ $metaTags['ogDescription'] }}">
<meta name="twitter:image" content="{{ $metaTags['primaryImage'] }}">
<meta name="twitter:site" content="@SheffieldAfrica">
<meta name="twitter:creator" content="@SheffieldAfrica">
<meta name="twitter:label1" content="Written by">
<meta name="twitter:data1" content="Sheffield Steel Systems Limited">
<meta name="twitter:label2" content="Time to read">
<meta name="twitter:data2" content="4 minutes">

<!-- Geographical Service Areas -->
<meta name="geo.region" content="KE-30">
<meta name="geo.placename" content="Nairobi">
<meta name="geo.position" content="-1.3553028;36.9004438">
<meta name="ICBM" content="-1.3553028, 36.9004438">

@if ($metaTags['jsonLdSchema'])
    <script type="application/ld+json">
{!!json_encode($metaTags['jsonLdSchema']) !!}
</script>
@endif


@include('frontend.scripts')
