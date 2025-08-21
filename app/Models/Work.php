<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Models\Division;
use Illuminate\Validation\ValidationException;

class Work extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $guarded = [];
    protected $casts = [
        'blocks' => 'array',
        'is_highlighted' => 'boolean',
    ];

    protected static function booted()
    {
        static::saving(function ($model) {
            if ($model->is_highlighted) {
                $query = Work::where('is_highlighted', true)
                    ->where('division_id', $model->division_id);

                if ($model->id) {
                    $query->where('id', '!=', $model->id);
                }

                if ($query->exists()) {
                    throw ValidationException::withMessages([
                        'is_highlighted' => 'Another campaign is already highlighted for this division.',
                    ]);
                }
            }
        });
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
