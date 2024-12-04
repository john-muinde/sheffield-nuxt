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
        Schema::table('solutions', function (Blueprint $table) {


            $table->dropColumn('brand');
            $table->dropColumn('model_number');
            $table->dropColumn('sku');
            $table->dropColumn('quantity');
            $table->dropColumn('cost_price');
            $table->dropColumn('retail_price');
            $table->dropColumn('weight');
            //categories
            $table->dropColumn('length');
            $table->dropColumn('width');
            $table->dropColumn('height');
            $table->dropColumn('short_description');
            $table->dropColumn('terms_of_operation');
            $table->dropColumn('technical_specification');
            $table->dropColumn('main_image_path');
            $table->dropColumn('document_path');

            //

            
            $table->integer('solution_category')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('solutions', function (Blueprint $table) {

            $table->dropColumn('name');
            $table->dropColumn('description');
            $table->dropColumn('solution_category');
            $table->dropColumn('main_image_path');
            $table->dropColumn('is_published');
            $table->dropColumn('created_by');
        });
    }
};
