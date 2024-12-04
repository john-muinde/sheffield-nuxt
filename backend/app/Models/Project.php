<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'client',
        'content',
        'is_published',
        'main_image',
        'project_gallery',
        'main_image_path',

    ];



    public function projectImages()
    {
        return $this->hasMany(ProjectImage::class);
    }

    // public function projectClients()
    // {
    //     return $this->hasMany(ProjectsClient::class);
    // }

    public function projectClient()
    {
        return $this->belongsTo(Client::class, 'client', 'id');
    }
}
