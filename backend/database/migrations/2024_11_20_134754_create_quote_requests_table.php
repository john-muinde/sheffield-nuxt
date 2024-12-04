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
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('surname');
            $table->string('email');
            $table->string('company_name')->nullable();
            $table->string('business_type')->nullable();
            $table->string('country');
            $table->string('location')->nullable();
            $table->string('code')->nullable();
            $table->string('firstname');
            $table->string('phone_number');
            $table->string('shipping');
            $table->string('installation');
            $table->json('cartItems');
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
        Schema::dropIfExists('quote_requests');
    }
};
