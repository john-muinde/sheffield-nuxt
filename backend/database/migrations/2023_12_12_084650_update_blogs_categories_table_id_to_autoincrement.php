<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('blogs_categories', function (Blueprint $table) {
            //
            DB::statement('ALTER TABLE blogs_categories MODIFY id BIGINT UNSIGNED AUTO_INCREMENT;');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs_categories', function (Blueprint $table) {
            //
        });
    }
};
