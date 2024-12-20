<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Visitors table indexes
        Schema::table('visitors', function (Blueprint $table) {
            $table->index('created_at', 'idx_visitors_created_at');
            $table->index('tracking_id', 'idx_visitors_tracking_id');
            $table->index(['tracking_id', 'created_at'], 'idx_visitors_tracking_created');
        });

        // Posts table index
        Schema::table('posts', function (Blueprint $table) {
            $table->index('created_at', 'idx_posts_created_at');
        });

        // Quote requests table index
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->index('created_at', 'idx_quote_requests_created_at');
        });
    }

    public function down()
    {
        Schema::table('visitors', function (Blueprint $table) {
            $table->dropIndex('idx_visitors_created_at');
            $table->dropIndex('idx_visitors_tracking_id');
            $table->dropIndex('idx_visitors_tracking_created');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex('idx_posts_created_at');
        });

        Schema::table('quote_requests', function (Blueprint $table) {
            $table->dropIndex('idx_quote_requests_created_at');
        });
    }
};
