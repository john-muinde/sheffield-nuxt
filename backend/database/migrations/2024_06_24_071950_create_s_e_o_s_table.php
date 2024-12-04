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
        Schema::create('s_e_o_s', function (Blueprint $table) {
            $table->id();
            $table->string('page', length: 512)->nullable(false)->unique();
            $table->string('title', length: 2048)->nullable(false);
            $table->string('description', length: 1024)->nullable(false);
            $table->string('keywords', length: 4096)->nullable(false);
            $table->string('canonical', length: 255)->nullable();
            $table->string('og_image')->nullable();
            $table->string('og_url')->nullable();
            $table->string('twitter_image')->nullable();
            $table->string('type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_e_o_s');
    }
};
