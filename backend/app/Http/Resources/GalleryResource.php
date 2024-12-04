<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\GalleryImagesResource;

class GalleryResource extends JsonResource
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
            'gallery_introduction' => $this->gallery_introduction,
            'is_published' => $this->is_published,
            'gallery_type' => $this->gallery_type,
            'main_image_path' => $this->main_image_path,
            'gallery_images' => GalleryImagesResource::collection($this->galleryImages),
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
