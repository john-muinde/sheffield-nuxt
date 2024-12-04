<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
       

        $data = [
            'id'   => $this->id ?? null,
            'name' => $this->name ?? null,
            'parent_id' => $this->parent_id ?? null,
            'is_published' => $this->is_published ?? null,
            'main_image_path' => $this->main_image_path ?? null,
            'total_products' => $this->total_products ?? 0,
            'parent_name' => null,
            'parent_json' => null,
            'parent_name_with_dashes' => null,
            'parent_parent_name_with_dashes' => null,
            'description' => $this->description ?? null,
            'created_at' => null
        ];

        if (isset($this->created_at)) {

            $data['created_at'] = $this->created_at->toDateString();
        }

        if (isset($this->parent)) {

            $data['parent_name'] = $this->parent ? $this->parent->name : null;
            $data['parent_name_with_dashes'] = $this->computeParentNameWithDashes();
            $data['parent_name_with_slashes'] = $this->computeParentParentNameWithSlashes();

            $parentArray = $this->parent->toArray();
            if ($parentArray) {
                $parentArray['parent_name_with_dashes'] = $this->computeParentParentNameWithDashes();
                $data['parent_json'] = $parentArray;
                $data['parent_parent_name_with_dashes'] = $this->computeParentParentNameWithDashes();
            }
        }else{

            $data['parent_name'] = $this->name ?? null;
            $data['parent_name_with_dashes'] = $this->name ?? null;
            $data['parent_name_with_slashes'] = $this->name ?? null;

        }

        return $data;
    }

    private function computeParentNameWithDashes()
    {
        $category = $this;
        $name = $this->name;
        $parentNames = [];

        while ($category->parent) {
            $parentNames[] = $category->parent->name;
            $category = $category->parent;
        }

        if(count($parentNames) > 0){

            $the_caregory_name = implode(' - ', array_reverse($parentNames))." - ".$name;

        }else{

            $the_caregory_name = $name;

        }

        return $the_caregory_name;
    }

    private function computeParentParentNameWithDashes()
    {
        $category = $this->parent;
        $name = $this->parent->name;
        $parentNames = [];

        while ($category->parent) {
            $parentNames[] = $category->parent->name;
            $category = $category->parent;
        }

        if(count($parentNames) > 0){

            $the_caregory_name = implode(' - ', array_reverse($parentNames))." - ".$name;

        }else{

            $the_caregory_name = $name;

        }

        return $the_caregory_name;
    }

    private function computeParentParentNameWithSlashes()
    {
        $category = $this->parent;
        $parentNames = [];

        $string = $this->name;
        $string = str_replace(' ', '-', $string);
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
        $parentNames[] = $string;

        $string = $this->parent->name;
        $string = str_replace(' ', '-', $string);
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
        $parentNames[] = $string;

        while ($category->parent) {
            $string = $category->parent->name;
            $string = str_replace(' ', '-', $string);
            $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
            $parentNames[] = $string;
            $category = $category->parent;
        }

        if(count($parentNames) > 0){

            $parentNames = array_reverse($parentNames);

            $parentNames = array_slice($parentNames, 0, 2);

            $the_caregory_name = implode('/', $parentNames);

        }else{

            $the_caregory_name = $name.'/'.$name;

        }

        $the_caregory_name = strtolower($the_caregory_name);

        return $the_caregory_name;
    }
}
