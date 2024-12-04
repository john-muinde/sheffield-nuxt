<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id();
            $table->string('request_type');
            $table->string('area_of_interest');
            $table->string('surname');
            $table->string('email');
            $table->string('company_name')->nullable();
            $table->string('business_type')->nullable();
            $table->string('country');
            $table->text('message_request');
            $table->string('code')->nullable();
            $table->string('firstname');
            $table->string('phone_number');
            $table->boolean('accept_terms_conditions');
            $table->enum('status', ['pending', 'replied', 'bought'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contact_us');
    }
};
