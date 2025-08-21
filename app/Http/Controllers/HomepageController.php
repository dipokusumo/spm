<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Homepage;
use App\Models\Division;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $homepage = Homepage::first();
        $divisions = Division::all();

        return Inertia::render('homepage', [
            'seo' => [
                'title' => $homepage->seo_title ?? 'Arteegroup - Homepage',
                'description' => $homepage->seo_description ?? 'Welcome to Arteegroup, your partner in digital innovation.',
                'image' => $homepage->seo_image ?? '',
            ],
            'blocks' => $homepage->blocks ?? [],
            'divisions' => $divisions,
        ]);
    }
}
