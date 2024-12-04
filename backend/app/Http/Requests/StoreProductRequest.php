<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'brand' => '',
            'model_number' => 'required',
            'sku' => '',
            'quantity' => '',
            'cost_price' => '',
            'retail_price' => '',
            'weight' => '',
            'length' => '',
            'width' => '',
            'height' => '',
            'short_description' => 'required',
            'description' => 'required',
            'technical_specification' => '',
            'terms_of_operation' => '',
            'document_path' => '',
            'is_published' => 'required',


        ];
    }
}
