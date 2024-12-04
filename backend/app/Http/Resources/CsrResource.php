<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CsrImagesResource;
class CsrResource extends JsonResource
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
            'csr_introduction' => $this->csr_introduction,
            'company_involvement' => $this->company_involvement,
            'collaborations_and_partnership' => $this->collaborations_and_partnership,
            'is_published' => $this->is_published,
            'main_image_path' => $this->main_image_path,
            'csr_images' => CsrImagesResource::collection($this->csrImages),
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
