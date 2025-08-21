<?php

use App\Http\Controllers\HomepageController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomepageController::class, 'index'])->name('homepage');

Route::get('/preview/{slug}', [PageController::class, 'preview'])
    ->name('page.preview')
    ->where('slug', '[a-zA-Z0-9\-]+');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
