<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Artesaos\SEOTools\Facades\SEOMeta;

class AppController extends Controller
{
    //
    // public function index()
    // {
    //     return view('app');
    // }
    public function frontend(Request $request)
    {
        //$string = $request->path();
        //SEOMeta::setTitle($string);
        //SEOMeta::setDescription($string);
        return view('frontend/app');
    }

    public function admin()
    {
        return view('admin/app');
    }
}