@php
    $config = [
        'appName' => config('app.name'),
        'locale' => ($locale = app()->getLocale()),
        'locales' => config('app.locales'),
    ];
@endphp
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description"
        content="We offer commercial kitchen, laundry, cold room & stainless steel fabricated solutions from design, manufacturing, supply, installation & aftersales.">
    <link rel="shortcut icon" href="{{ asset('favicon.png') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet" />
    <title>Home | Admin Sheffield Steel Systems </title>
    <meta name="google-site-verification" content="MDV6HhOKIgKRjiLA7URFOhZc0eOmt5-pZiZ7zvtKyGQ" />
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-4ERSL5DRTF"></script>

    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-4ERSL5DRTF');
    </script>

    @vite('resources/css/app.css')
    <link rel="stylesheet" style="text/css"
        href="https://cdn.datatables.net/responsive/2.1.0/css/responsive.dataTables.min.css" />

</head>

<body>
    <div id="app">
        <div id="breadcrumb"></div>
    </div>

    <script>
        window.config = @json($config);
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>

    @vite('resources/js/admin-main.js')
</body>

</html>
