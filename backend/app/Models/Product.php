<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'brand',
        'model_number',
        'sku',
        'quantity',
        'cost_price',
        'retail_price',
        'weight',
        'length',
        'width',
        'height',
        'short_description',
        'description',
        'terms_of_operation',
        'is_published',
        'main_image',
        'document',
        'product_gallery',
        'document_path',
        'main_image_path',
        'technical_specification',

    ];

    

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productCategories()
    {
        return $this->hasMany(ProductCategory::class);
    }

    public function productBrand()
    {
        return $this->belongsTo(Brand::class, 'brand', 'id');
    }

    //new


    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function getHyphenatedNameAttribute(){
        $hyphenatedString = str_replace(' ', '-', $this->name);
        return $hyphenatedString;
    }
    // end new
}
