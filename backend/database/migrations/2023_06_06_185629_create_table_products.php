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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('brand')->nullable();
            $table->string('model_number')->nullable();
            $table->string('sku')->nullable();
            $table->string('quantity')->nullable();
            $table->decimal('cost_price', 8, 2)->nullable();
            $table->decimal('retail_price', 8, 2)->nullable();
            $table->float('weight')->nullable();
            //categories
            $table->float('length')->nullable();
            $table->float('width')->nullable();
            $table->float('height')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();
            $table->text('terms_of_operation')->nullable();
            $table->boolean('is_published')->nullable();
            $table->integer('created_by')->nullable();

            $table->string('main_image_path')->nullable();
            $table->string('document_path')->nullable();

            $table->text('technical_specification')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
