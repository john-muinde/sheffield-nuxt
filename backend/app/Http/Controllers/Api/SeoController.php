<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Wearepixel\LaravelGoogleShoppingFeed\LaravelGoogleShoppingFeed;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    //
	public function googleShoppingFeed(){
        $products = Product::all();

        $feed = LaravelGoogleShoppingFeed::init(
            'Seffield Product Feed',
            'App product Feed',
            'https://sheffieldafrica.com'
        );
        
        foreach($products as $product){
            $feed->addItem([
                "id" => $product->id,
                "title" => $product->name,
                "g:availability" => "In stock",
                "g:price" => isset($product->cost_price) ? $product->cost_price.' KES' : 0.00.' KES',
                "link" => "https://sheffieldafrica.com/product/".$product->id."/".$product->hyphenated_name,
                "g:image_link" => "https://sheffieldafrica.com/storage/".$product->main_image_path,
                "description" => $product->description,
            ]);
        }
        
        return $feed->generate();
    }
}
