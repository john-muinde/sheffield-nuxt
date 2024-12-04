<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $table = 'quote_requests';

    protected $fillable = [
        'surname',
        'email',
        'company_name',
        'business_type',
        'country',
        'location',
        'code',
        'firstname',
        'phone_number',
        'shipping',
        'installation',
        'cartItems',
        'status',
    ];

    protected $casts = [
        'cartItems' => 'array',
        'installation' => 'boolean',
    ];
}
