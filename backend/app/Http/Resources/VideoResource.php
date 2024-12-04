<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            'file_path' => $this->file_path,
            'video_url' => $this->video_url,
            'main_image_path' => $this->main_image_path,
            'is_published' => $this->is_published,
            'shown_in_about_us' => $this->shown_in_about_us,
            'created_at' => $this->created_at->toDateString()
            
        ];
    }
}
