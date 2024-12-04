@php
    $config = [
        'appName' => config('app.name'),
        'locale' => ($locale = app()->getLocale()),
        'locales' => config('app.locales'),
    ];
@endphp
<!DOCTYPE html>
<html lang="{{ $locale }}" prefix="og: https://ogp.me/ns#">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">


    @include('frontend.meta')

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ url('favicon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ url('favicon.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ url('favicon.png') }}">




    @vite('resources/css/app.css')
    @vite('resources/js/apps/frontend/assets/css/bootstrap.min.css')
    @vite('resources/js/apps/frontend/assets/css/plugins/owl-carousel/owl.carousel.css')
    @vite('node_modules/vue3-carousel/dist/carousel.css')
    @vite('resources/js/apps/frontend/assets/css/plugins/jquery.countdown.css')
    @vite('resources/js/apps/frontend/assets/css/style.css')
    @vite('resources/js/apps/frontend/assets/css/skins/skin-demo-14.css')
    @vite('resources/js/apps/frontend/assets/css/demos/demo-14.css')
    @vite('resources/js/apps/frontend/assets/css/demos/demo-4.css')

    <link rel="stylesheet" id="dflip-style-css" href="/dearflip/dflip/css/dflip.min.css" media="all" />

    <script src="/dearflip/dflip/js/libs/jquery.min.js" id="jquery-core-js"></script>
    <script src="/dearflip/dflip/js/libs/jquery-migrate.min.js" id="jquery-migrate-js"></script>

    <script type='text/javascript'>
        window.smartlook || (function(d) {
            var o = smartlook = function() {
                    o.api.push(arguments)
                },
                h = d.getElementsByTagName('head')[0];
            var c = d.createElement('script');
            o.api = new Array();
            c.async = true;
            c.type = 'text/javascript';
            c.charset = 'utf-8';
            c.src = 'https://web-sdk.smartlook.com/recorder.js';
            h.appendChild(c);
        })(document);
        smartlook('init', '1877a41e49ec51b8bb404184dd7fa59f985f3925', {
            region: 'eu'
        });
    </script>

</head>

<body>
    <div id="app" v-cloak>
        <div id="breadcrumb"></div>
    </div>

    <script>
        window.config = @json($config);
    </script>

    <script src="/dearflip/dflip/js/libs/imagesloaded.min.js" id="imagesloaded-js"></script>
    <script src="/dearflip/dflip/js/libs/masonry.min.js" id="masonry-js"></script>

    <script src="/dearflip/dflip/js/dflip.min.js" id="dflip-script-js"></script>
    <script data-cfasync="false">
        var dFlipLocation =
            "https://js.dearflip.com/wp-content/plugins/dflip/assets/";
        var dFlipWPGlobal = {
            text: {
                toggleSound: "Turn on\/off Sound",
                toggleThumbnails: "Toggle Thumbnails",
                toggleOutline: "Toggle Outline\/Bookmark",
                previousPage: "Previous Page",
                nextPage: "Next Page",
                toggleFullscreen: "Toggle Fullscreen",
                zoomIn: "Zoom In",
                zoomOut: "Zoom Out",
                toggleHelp: "Toggle Help",
                singlePageMode: "Single Page Mode",
                doublePageMode: "Double Page Mode",
                downloadPDFFile: "Download PDF File",
                gotoFirstPage: "Goto First Page",
                gotoLastPage: "Goto Last Page",
                share: "Share",
                search: "Search",
                print: "Print",
                mailSubject: "I wanted you to see this FlipBook",
                mailBody: "Check out this site {{ url()->current() }}",
                loading: "Loading",
            },
            viewerType: "flipbook",
            mobileViewerType: "auto",
            moreControls: "download,pageMode,startPage,endPage,sound",
            hideControls: "altPrev,altNext",
            leftControls: "outline,thumbnail",
            rightControls: "fullScreen,share,download,more",
            hideShareControls: "",
            scrollWheel: "true",
            backgroundColor: "rgb(229,229,229)",
            backgroundImage: "",
            height: "auto",
            paddingTop: "30",
            paddingBottom: "30",
            paddingLeft: "30",
            paddingRight: "30",
            controlsPosition: "bottom",
            controlsFloating: true,
            direction: "1",
            duration: "800",
            soundEnable: "true",
            showDownloadControl: "true",
            showSearchControl: "false",
            showPrintControl: "false",
            enableAnalytics: "true",
            webgl: "true",
            hard: "none",
            autoEnableOutline: "false",
            autoEnableThumbnail: "false",
            pageScale: "fit",
            maxTextureSize: "3200",
            rangeChunkSize: "1048576",
            disableRange: false,
            zoomRatio: "1.5",
            flexibility: "1",
            pageMode: "0",
            singlePageMode: "0",
            pageSize: "0",
            autoPlay: "false",
            autoPlayDuration: "5000",
            autoPlayStart: "false",
            linkTarget: "2",
            sharePrefix: "flipbook-",
            pdfVersion: "default",
            thumbLayout: "book-title-hover",
            targetWindow: "_popup",
            buttonClass: "",
            hasSpiral: false,
            spiralColor: "#eee",
            cover3DType: "plain",
            color3DCover: "#aaaaaa",
            color3DSheets: "#fff",
            flipbook3DTiltAngleUp: "0",
            flipbook3DTiltAngleLeft: "0",
            autoPDFLinktoViewer: false,
            sideMenuOverlay: true,
            displayLightboxPlayIcon: true,
            popupBackGroundColor: "#eee",
            shelfImage: "",
            enableAutoLinks: false,
        };
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

    <img id='pixel-tracker' style='display: none !important;' src="" />
    <script>
        //place it after jquery loaded
        $(function() {
            trackingId = null;
            if (!localStorage.getItem("pixel-tracker")) {
                trackingId = '{{ \Str::random(30) }}';
                localStorage.setItem("pixel-tracker", trackingId);
            } else {
                trackingId = localStorage.getItem("pixel-tracker");
            }
            $('#pixel-tracker').attr("src", "{{ route('pixel-tracker') }}?event=page_visit&tracking_id=" +
                trackingId + "&url=" + window.location.href);
        });
    </script>

    @vite('resources/js/frontend-main.js')
    @vite('resources/js/apps/frontend/assets/js/bootstrap.bundle.min.js?commonjs-entry')
    @vite('resources/js/apps/frontend/assets/js/jquery.hoverIntent.min.js?commonjs-entry')
    @vite('resources/js/apps/frontend/assets/js/jquery.waypoints.min.js')
    @vite('resources/js/apps/frontend/assets/js/superfish.min.js')
    @vite('resources/js/apps/frontend/assets/js/bootstrap-input-spinner.js')
    @vite('resources/js/apps/frontend/assets/js/jquery.plugin.min.js')
    @vite('resources/js/apps/frontend/assets/js/jquery.countdown.min.js')
    @vite('resources/js/apps/frontend/assets/js/jquery.elevateZoom.min.js')
    @vite('resources/js/apps/frontend/assets/js/main.js')
    @vite('resources/js/apps/frontend/assets/js/demos/demo-14.js')

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDBMDPJZ" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

</body>

</html>
