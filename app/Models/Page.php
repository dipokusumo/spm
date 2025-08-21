<?php

namespace App\Models;

use Z3d0X\FilamentFabricator\Models\Page as FabricatorPage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Page extends FabricatorPage implements HasMedia
{
    use InteractsWithMedia;
    protected $casts = [
        'blocks' => 'array',
        'parent_id' => 'integer',
        'seo_title' => 'string',
        'seo_description' => 'string',
        'seo_image' => 'string',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('seo_image')
            ->singleFile(); // optional: ensures only 1 file per page
    }
}
;

