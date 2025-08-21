<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('homepages', function (Blueprint $table) {
            $table->dropColumn(['hero_title', 'hero_subtitle']);
        });
    }

    public function down(): void
    {
        Schema::table('homepages', function (Blueprint $table) {
            $table->string('hero_title')->nullable();
            $table->text('hero_subtitle')->nullable();
        });
    }
};
