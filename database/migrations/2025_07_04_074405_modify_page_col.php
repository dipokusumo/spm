<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table(config('filament-fabricator.table_name', 'pages'), function (Blueprint $table) {
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_image')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table(config('filament-fabricator.table_name', 'pages'), function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_description', 'seo_image']);
        });
    }
};
