<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
//use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::post('login', [AuthenticatedSessionController::class, 'login']);
Route::post('register', [AuthenticatedSessionController::class, 'register']);
Route::post('logout', [AuthenticatedSessionController::class, 'logout']);


Route::get('/create-symlink', function () {
    return view('create_symlink');
});


Route::get('/admin/{any?}', function () {
    return view('admin/app');
})->where('any', '.*');

Route::get('/pixel-tracker', [App\Http\Controllers\VisitorsController::class, 'pixelTracking'])->name('pixel-tracker');

Route::get('/{any}', [App\Http\Controllers\AppController::class, 'frontend'])->where('any', '^(?!admin).*');