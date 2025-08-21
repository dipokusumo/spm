<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();

            // Footer
            $table->text('footer_description')->nullable();
            $table->json('footer_socials')->nullable(); // [{ label, url, icon }]

            // Navbar
            $table->string('navbar_logo')->nullable(); // path to logo file
            $table->json('navbar_links')->nullable();  // [{ label, url }]

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
