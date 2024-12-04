<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCsrRequest extends FormRequest
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
            'csr_introduction' => 'required',
            'company_involvement' => 'required',
            'collaborations_and_partnership' => 'nullable',
            'is_published' => 'required',
            //'main_image' => 'nullable|image',
            //'product_gallery.*' => 'nullable|image',
            //'document' => 'nullable|file',
        ];
    }
}