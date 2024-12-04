<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'parent_id', 'description', 'is_published'];

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy("order_index", "ASC");
    }

    public function getAllChildrenIds()
    {
        $childrenIds = [];

        foreach ($this->children as $child) {
            $childrenIds[] = $child->id;
            $childrenIds = array_merge($childrenIds, $child->getAllChildrenIds());
        }

        return $childrenIds;
    }

    public function categoryProducts()
    {
        return $this->hasMany(ProductCategory::class);
    }

    // new
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories')->orderBy('order_index', 'ASC');
    }
    // end new

    public function getTotalProductsAttribute()
    {
        return $this->categoryProducts()->count();
    }

    public static function getCategoriesRecursively($parentId, &$result = [])
    {
        $categories = self::where('parent_id', $parentId)->get();

        foreach ($categories as $category) {
            $result[] = $category;
            self::getCategoriesRecursively($category->id, $result);
        }
    }
}
