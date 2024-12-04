<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'content' => $this->content,
            'publication_file' => $this->publication_file,
            'thumbnail_path' => $this->thumbnail_path,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at->toDateString()

        ];
    }
}
