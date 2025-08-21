<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show($slug): \Inertia\Response
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        return Inertia::render('PagePreview', [
            'seo' => [
                'title' => $page->seo_title,
                'description' => $page->seo_description,
                'image' => $page->seo_image,
            ],
            'blocks' => $page->blocks,
        ]);
    }

    public function preview(Request $request, string $slug = 'preview')
    {
        if (request()->has('preview') && session()->has('preview_data')) {
            $data = session('preview_data');


            return Inertia::render('PagePreview', [
                'seo' => $data['seo'],
                'blocks' => $data['blocks'],
            ]);
        }

        abort(404);
    }

}
