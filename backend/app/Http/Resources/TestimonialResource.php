<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
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
            'website' => $this->website,
            'person' => $this->person,
            'email' => $this->email,
            'description' => $this->description,
            'main_image_path' => $this->main_image_path,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
