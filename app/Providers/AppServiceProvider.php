<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Z3d0X\FilamentFabricator\Resources\PageResource;
use Inertia\Inertia;
use App\Models\SiteSettings;
use Illuminate\Support\Facades\Storage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('siteSettings', function () {
            $settings = \App\Models\SiteSettings::first();

            return [
                ...($settings?->toArray() ?? []),
                'navbar_logo' => $settings?->navbar_logo
                    ? asset('storage/' . $settings->navbar_logo)
                    : null,
            ];
        });
    }
}
