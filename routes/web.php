<?php

use App\Http\Controllers\HomepageController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DivisionContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomepageController::class, 'index'])->name('homepage');

Route::get('/{slug}', [DivisionController::class, 'show'])
    ->name('division')
    ->where('slug', '[a-zA-Z0-9\-]+');

Route::get('/{division}/{slug}', [WorkController::class, 'show'])
    ->name('work')
    ->where('slug', '[a-zA-Z0-9\-]+');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::post('/division-contact', [DivisionContactController::class, 'store'])->name('division.contact.store');

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
