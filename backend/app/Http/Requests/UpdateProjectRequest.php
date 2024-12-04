<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'client' => 'required',
            'content' => 'required',
            'is_published' => 'required',
            //'main_image' => 'nullable|image',
            //'product_gallery.*' => 'nullable|image',
            //'document' => 'nullable|file',
        ];
    }




}
