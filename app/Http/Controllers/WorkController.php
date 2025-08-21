<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Inertia\Inertia;

class WorkController extends Controller
{
    public function homepage()
    {
        $work = Work::get(['campaign_image', 'name', 'campaign', 'campaign_name', 'campaign_description'])
            ->orderByDesc('updated_at')
            ->take(10)
            ->get();

        return Inertia::render('homepage', [
            'work' => $work,
        ]);
    }

    public function show($division, $slug)
    {
        $work = Work::where('slug', $slug)
            ->whereHas('division', fn($q) => $q->where('slug', $division))
            ->firstOrFail();

        return Inertia::render('work', [
            'divisionId' => $work->division_id ?? '',
            'division' => $work->division ?? '',
            'name' => $work->name ?? '',
            'campaign' => $work->campaign ?? '',
            'campaignName' => $work->campaign_name ?? '',
            'campaignDescription' => $work->campaign_description ?? '',
            'campaignImage' => $work->campaign_image ?? '',
            'title' => $work->title ?? '',
            'slug' => $work->slug ?? '',
            'seo' => [
                'title' => $work->seo_title ?? '',
                'description' => $work->seo_description ?? '',
                'image' => $work->seo_image ?? '',
            ],
            'blocks' => $work->blocks ?? [],
        ]);
    }
}
