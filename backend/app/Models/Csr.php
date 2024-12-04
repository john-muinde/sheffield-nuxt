<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Csr extends Model
{
    use HasFactory;

    protected $fillable = [

        'name',
        'csr_introduction',
        'company_involvement',
        'collaborations_and_partnership',
        'is_published',
        'main_image',
        'csr_gallery',
        'main_image_path',
    ];



    public function csrImages()
    {
        return $this->hasMany(CsrImage::class);
    }
}
