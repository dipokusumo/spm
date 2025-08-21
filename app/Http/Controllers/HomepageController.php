<?php

namespace App\Http\Controllers;

use App\Models\Homepage;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $homepage = Homepage::first();

        return Inertia::render('homepage', [
            'seo' => [
                'title' => $homepage->seo_title ?? 'SPM',
                'description' => $homepage->seo_description ?? '',
                'image' => $homepage->seo_image ?? '',
            ],
            'blocks' => $homepage->blocks ?? [],
        ]);
    }
}
