<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProjectImagesResource;
use App\Http\Resources\ClientResource;

class ProjectResource extends JsonResource
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
            'client' => $this->client,
            'client_name' => $this->projectClient ? $this->projectClient->name : null,
            'content' => $this->content,
            'is_published' => $this->is_published,
            'segment' => $this->segment,
            'main_image_path' => $this->main_image_path,
            'project_images' => ProjectImagesResource::collection($this->projectImages),
            'client_json' => $this->projectClient ? $this->projectClient : null,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
