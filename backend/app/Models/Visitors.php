<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitors extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_id',
        'is_new',
        'ip',
        'is_desktop',
        'browser',
        'platform',
        'is_robot',
        'robot_name',
        'location',
        'url',
    ];
}
