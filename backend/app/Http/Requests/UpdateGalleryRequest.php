<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'gallery_introduction' => 'required',
            'is_published' => 'required',
            //'main_image' => 'nullable|image',
            //'product_gallery.*' => 'nullable|image',
            //'document' => 'nullable|file',
        ];
    }
}
