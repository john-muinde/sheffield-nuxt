<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductImagesResource;
use App\Http\Resources\CategoryResource;

class ProductResource extends JsonResource
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
            'brand' => $this->brand,
            'brand_name' => $this->productBrand ? $this->productBrand->name : null,
            'model_number' => $this->model_number,
            'sku' => $this->sku,
            'quantity' => $this->quantity,
            'cost_price' => $this->cost_price,
            'retail_price' => $this->retail_price,
            'weight' => $this->weight,
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'technical_specification' => $this->technical_specification,
            'terms_of_operation' => $this->terms_of_operation,
            'is_published' => $this->is_published,
            'main_image_path' => $this->main_image_path,
            'document_path' => $this->document_path,
            'document' => $this->document,
            'product_images' => ProductImagesResource::collection($this->productImages),
            'product_brand' => $this->productBrand ? $this->productBrand : null,
            'categories_json' => $this->productCategories ? CategoryResource::collection($this->productCategories->pluck('category')) : null,
            // 'parent_name' => $this->parent ? $this->parent->name : null,
            // 'parent_json' => $this->parent ? $this->parent : null,
            // 'parent_name_with_dashes' => $this->computeParentNameWithDashes(),
            //'children'    => CategoryResource::collection($this->whenLoaded('children')),
            // 'description' => $this->description,
            'created_at' => $this->created_at->toDateString()
        ];
    }



    // private function computeMainSecParentNameWithDashes()
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
