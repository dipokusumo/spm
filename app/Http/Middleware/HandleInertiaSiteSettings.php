<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use App\Models\SiteSettings;

class HandleInertiaSiteSettings
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        Inertia::share('siteSettings', function () {
            return SiteSettings::first()?->data ?? [];
        });

        return $next($request);
    }
}
