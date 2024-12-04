<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'type',
        'video_url',
        'content file_path',
        'shown_in_about_us',
        'file_path',
        'main_image_path',
        'is_published' 

    ];
}
