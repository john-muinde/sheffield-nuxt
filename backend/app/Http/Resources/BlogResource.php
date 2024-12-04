<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BlogImagesResource;
use App\Http\Resources\BlogCategoryResource;

class BlogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'   => $this->id,
            'name' => $this->name,
            'content' => $this->content,
            'is_published' => $this->is_published,
            'main_image_path' => $this->main_image_path,
            'blog_images' => BlogImagesResource::collection($this->blogImages),
            'categories_json' => $this->blogCategories ? BlogCategoryResource::collection($this->blogCategories->pluck('category')) : null,
            // 'parent_name' => $this->parent ? $this->parent->name : null,
            // 'parent_json' => $this->parent ? $this->parent : null,
            // 'parent_name_with_dashes' => $this->computeParentNameWithDashes(),
            //'children'    => BlogCategoryResource::collection($this->whenLoaded('children')),
            // 'description' => $this->description,
            'created_at' => $this->created_at->toDateString()
        ];
    }

    // private function computeParentNameWithDashes()
    // {
    //     $category = $this;
    //     $name = $this->name;
    //     $parentNames = [];

    //     while ($category->parent) {
    //         $parentNames[] = $category->parent->name;
    //         $category = $category->parent;
    //     }

    //     if(count($parentNames) > 0){

    //         $the_caregory_name = implode(' - ', array_reverse($parentNames))." - ".$name;

    //     }else{

    //         $the_caregory_name = $name;

    //     }

    //     return $the_caregory_name;
    // }
}