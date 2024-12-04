<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
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
            // 'parent_id' => $this->parent_id,
            'is_published' => $this->is_published,
            'main_image_path' => $this->main_image_path,
            // 'parent_name' => $this->parent ? $this->parent->name : null,
            // 'parent_json' => $this->parent ? $this->parent : null,
            // 'parent_name_with_dashes' => $this->computeParentNameWithDashes(),
            //'children'    => BrandResource::collection($this->whenLoaded('children')),
            'description' => $this->description,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}