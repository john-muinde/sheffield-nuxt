<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'gallery_introduction',
        'is_published',
        'gallery_type',
        'main_image',
        'gallery_gallery',
        'main_image_path',
    ];



    public function galleryImages()
    {
        return $this->hasMany(GalleryImage::class);
    }
}
