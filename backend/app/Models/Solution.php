<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'description', 
        'solution_category',
        'is_published', 
        'main_image_path'
    ];



    public function solutionImages()
    {
        return $this->hasMany(SolutionImage::class);
    }

    public function solutionCategory()
    {
        return $this->belongsTo(Category::class, 'solution_category');
    }

    public function solutionCategories()
    {
        return $this->hasMany(SolutionCategory::class)->orderBy('order_index', 'ASC');
    }

    
}
