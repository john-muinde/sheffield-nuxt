<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowroomResource extends JsonResource
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
            'location' => $this->location,
            'longitude' => $this->longitude,
            'latitude' => $this->latitude,
            'phone_number1' => $this->phone_number1,
            'phone_number2' => $this->phone_number2,
            'email' => $this->email,
            'description' => $this->description,
            'is_published' => $this->is_published,
            'main_image_path' => $this->main_image_path,
            'showroom_images' => ShowroomImagesResource::collection($this->showroomImages),
            'created_at' => $this->created_at ? $this->created_at->toDateString() : "",
        ];
    }
}
