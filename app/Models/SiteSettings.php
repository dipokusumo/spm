<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;

use Spatie\MediaLibrary\InteractsWithMedia;

class SiteSettings extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        'footer_description',
        'footer_socials',
        'navbar_logo',
        'navbar_links',
    ];

    protected $casts = [
        'footer_socials' => 'array',
        'navbar_links' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('navbar_logo_url')
            ->singleFile(); // optional: ensures only 1 file per page
    }

}
