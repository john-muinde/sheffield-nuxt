<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'brand' => 'required',
            'model_number' => 'required',
            'sku' => 'required',
            'quantity' => 'nullable',
            'cost_price' => 'nullable',
            'retail_price' => 'nullable',
            'weight' => 'nullable',
            'length' => 'nullable',
            'width' => 'nullable',
            'height' => 'nullable',
            'short_description' => 'required',
            'description' => 'required',
            'technical_specification' => 'nullable',
            'terms_of_operation' => 'nullable',
            'is_published' => 'required',
            //'main_image' => 'nullable|image',
            //'product_gallery.*' => 'nullable|image',
            //'document' => 'nullable|file',
        ];
    }




}
