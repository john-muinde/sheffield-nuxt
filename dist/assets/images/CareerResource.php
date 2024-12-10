<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CareerResource extends JsonResource
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
            'title' => $this->title,
            'department' => $this->department,
            'location' => $this->location,
            'education' => $this->education,
            'experience' => $this->experience,
            'deadline' => $this->deadline,
            'description' => $this->description,
            'responsibilities' => $this->responsibilities,
            'requirements' => $this->requirements,
            'document_path' => $this->document_path,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
