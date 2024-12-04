<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductImagesResource;
use App\Http\Resources\CategoryResource;

class SolutionResource extends JsonResource
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
            'description' => $this->description,
            'solution_category' => $this->solution_category,
            'main_image_path' => $this->main_image_path,
            'is_published' => $this->is_published,
            'product_categories_json' =>
            $this->solutionCategories ? CategoryResource::collection($this->solutionCategories->pluck('category')) : null,
            //'product_categories_json' => $this->solutionCategories ? $this->solutionCategories : null,
            'the_category' => $this->solutionCategory ? $this->solutionCategory : null,
            'the_category_name' => $this->solutionCategory ? $this->solutionCategory->name : null,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
