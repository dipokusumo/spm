<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;

use Spatie\MediaLibrary\InteractsWithMedia;

class SiteSettings extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        'footer_socials',
        'footer_links',
        'navbar_logo',
        'navbar_links',
        'footer_anchor',
    ];

    protected $casts = [
        'footer_socials' => 'array',
        'footer_links' => 'array',
        'navbar_links' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('navbar_logo_url')
            ->singleFile(); // optional: ensures only 1 file per page
    }

}
