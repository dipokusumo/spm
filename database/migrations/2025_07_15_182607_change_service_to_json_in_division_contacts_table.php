<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('division_contacts', function (Blueprint $table) {
            // Ubah kolom service menjadi JSON
            $table->json('service')->change();
        });
    }

    public function down(): void
    {
        Schema::table('division_contacts', function (Blueprint $table) {
            // Rollback ke string jika dibatalkan
            $table->string('service')->change();
        });
    }
};
