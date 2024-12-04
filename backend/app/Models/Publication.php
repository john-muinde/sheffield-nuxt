<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'content',
        'is_published',
        'main_image',
        'type',
        'publication_file',
        'thumbnail_path'

    ];
}
