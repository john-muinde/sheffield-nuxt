<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'careers';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'department',
        'location',
        'education',
        'experience',
        'deadline',
        'description',
        'responsibilities',
        'requirements',
        'document_path',
        'is_published',
        'created_by',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'deadline' => 'date',
        'is_published' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'created_by',
    ];

    /**
     * Set default values for attributes.
     */
    protected $attributes = [
        'is_published' => false,
    ];

    /**
     * Define any relationships if necessary.
     * For example, if `created_by` relates to a `User` model:
     */

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
