<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'content',
        'is_published',
        'main_image',
        'blog_gallery',
        'main_image_path',

    ];



    public function blogImages()
    {
        return $this->hasMany(BlogImage::class);
    }

    public function blogCategories()
    {
        return $this->hasMany(BlogsCategory::class);
    }

    // public function productBrand()
    // {
    //     return $this->belongsTo(Brand::class, 'brand', 'id');
    // }
}