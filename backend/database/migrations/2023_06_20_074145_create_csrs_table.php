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
        Schema::create('csrs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('main_image_path')->nullable();
            $table->text('csr_introduction')->nullable();
            $table->text('company_involvement')->nullable();
            $table->text('collaborations_and_partnership')->nullable();
            $table->boolean('is_published')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('csrs');
    }
};
