<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showroom extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'location',
        'longitude',
        'latitude',
        'phone_number1',
        'phone_number2',
        'email',
        'description',
        'is_published',
        'main_image',
        'product_gallery',
        'main_image_path',

    ];



    public function showroomImages()
    {
        return $this->hasMany(ShowroomImage::class);
    }
}
