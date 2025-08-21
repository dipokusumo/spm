<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


class Homepage extends Model implements HasMedia
{

    use InteractsWithMedia;
    protected $guarded = [];
    protected $casts = [
        'blocks' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('background_url')
            ->singleFile(); // optional: ensures only 1 file per page
    }

}

