<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DivisionContact extends Model
{
    protected $guarded = [];

    protected $casts = [
        'service' => 'array',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
