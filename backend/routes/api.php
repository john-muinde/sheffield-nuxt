<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BlogCategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CareerController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ShowroomController;
use App\Http\Controllers\Api\CsrController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\SolutionController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductImagesController;
use App\Http\Controllers\Api\CsrImagesController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectImagesController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\GalleryImagesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SupportEmailController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('dashboard-stats', [HomeController::class, 'getStats']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('support-email', SupportEmailController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('careers', CareerController::class);
    Route::apiResource('csrs', CsrController::class);
    Route::apiResource('blogs', BlogController::class);
    Route::apiResource('blogCategories', BlogCategoryController::class);
    Route::apiResource('brands', BrandController::class);
    Route::apiResource('events', EventController::class);
    Route::apiResource('testimonials', TestimonialController::class);
    Route::apiResource('solutions', SolutionController::class);
    Route::apiResource('showrooms', ShowroomController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('permissions', PermissionController::class);
    Route::apiResource('product-images', ProductImagesController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('publications', PublicationController::class);
    Route::apiResource('videos', VideoController::class);
    Route::apiResource('galleries', GalleryController::class);
    Route::apiResource('news', NewsController::class);
    Route::apiResource('gallery-images', GalleryImagesController::class);
    Route::get('category-list', [CategoryController::class, 'getList']);
    Route::get('category-main', [CategoryController::class, 'getCategoriesMain']);
    Route::get('category-list/{id}', [CategoryController::class, 'getSelectedCategoryList']);
    Route::get('/user', [ProfileController::class, 'user']);
    Route::put('/user', [ProfileController::class, 'update']);

    Route::get('get-categories', [CategoryController::class, 'getCategories']);
    Route::post('categories-update-order', [CategoryController::class, 'postNewOrderCategories']);

    Route::get('get-products-admin', [ProductController::class, 'getproductsAdmin']);
    Route::post('products-update-order', [ProductController::class, 'postNewOrderProducts']);

    Route::get('get-solutions', [SolutionController::class, 'getSolutionsAdmin']);
    Route::post('solutions-update-order', [SolutionController::class, 'postNewOrderSolutions']);
    Route::get('get-solutions-categories', [SolutionController::class, 'getSolutionsCategories']);
    Route::post('solutions-categories-update-order', [SolutionController::class, 'postNewOrderSolutionOrders']);


    Route::get('blogCategory-list', [BlogCategoryController::class, 'getList']);

    Route::get('publication-list', [PublicationController::class, 'getList']);

    Route::get('video-list', [VideoController::class, 'getList']);



    //Route::put('products/111', [ProductController::class, 'update']);

    Route::get('abilities', function (Request $request) {
        return $request->user()->roles()->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique()
            ->values()
            ->toArray();
    });
});

Route::get('get-sidebar-categories', [CategoryController::class, 'getSidebarCategories']);
Route::get('category-list', [CategoryController::class, 'getList']);
Route::get('brand-list', [BrandController::class, 'getList']);
Route::get('get-posts', [PostController::class, 'getPosts']);
Route::get('get-category-posts/{id}', [PostController::class, 'getCategoryByPosts']);
Route::get('get-post/{id}', [PostController::class, 'getPost']);
Route::get('get-products', [ProductController::class, 'getProducts']);
Route::get('get-product', [ProductController::class, 'getProduct']);
Route::get('get-showrooms', [ShowroomController::class, 'getShowrooms']);
Route::get('get-showroom', [ShowroomController::class, 'getShowroom']);
Route::post('product-enquiry', [ProductController::class, 'productEnquiry']);
Route::get('get-featured-products', [ProductController::class, 'getFeaturedProducts']);
Route::get('get-main-categories/{id}', [CategoryController::class, 'getMainCategories']);
Route::get('get-solutions/{id}', [SolutionController::class, 'getMainSolutions']);
Route::get('get-solution-categories', [SolutionController::class, 'getSolutionCategories']);
Route::get('get-solution-category-products', [SolutionController::class, 'getSolutionCategoryProducts']);
Route::get('client-list', [ClientController::class, 'getList']);
Route::get('get-clients-home', [ClientController::class, 'getList']);
Route::get('get-events', [EventController::class, 'getEvents']);
Route::get('get-projects', [ProjectController::class, 'getProjects']);
Route::get('get-clients', [ClientController::class, 'getClients']);
Route::get('get-one-project/{id}', [ProjectController::class, 'getProject']);
Route::get('get-blogs', [BlogController::class, 'getBlogs']);
Route::get('get-blog-details', [BlogController::class, 'getBlogDetails']);
Route::get('get-blog-sidebar', [BlogController::class, 'getBlogSidebar']);
Route::get('get-media-center', [BlogController::class, 'getMediaCenter']);
Route::get('get-media-center-videos', [BlogController::class, 'getMediaCenterVideos']);
Route::get('get-media-center-galleries', [BlogController::class, 'getMediaCenterGalleries']);
Route::get('get-media-center-galleries-details', [BlogController::class, 'getMediaCenterGalleriesDetails']);
Route::get('get-in-the-news', [BlogController::class, 'getInTheNews']);
Route::get('news-list', [NewsController::class, 'getList']);


Route::post('contacts', [UserController::class, 'contactUs']);
Route::post('career-cv', [UserController::class, 'careerCv']);
Route::post('request-quote', [UserController::class, 'requestQuote']);

//product search
Route::get('product_search/{search}', [ProductController::class, 'searchProduct']);

Route::get('google_shopping_product_feed', [App\Http\Controllers\Api\SeoController::class, 'googleShoppingFeed']);

Route::get('user-roles', function (Request $request) {
    return User::with('roles')->get();
});

Route::fallback(function () {
    abort(404, 'API resource not found');
});
