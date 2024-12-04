<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'is_published', 'main_image_path', 'file_path', 'thumbnail_path', 'url'];
}
