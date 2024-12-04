<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    use HasFactory;

    protected $table = 'contact_us';

    protected $fillable = [
        'request_type',
        'area_of_interest',
        'surname',
        'email',
        'company_name',
        'business_type',
        'country',
        'message_request',
        'code',
        'firstname',
        'phone_number',
        'accept_terms_conditions',
        'status',
    ];
}
