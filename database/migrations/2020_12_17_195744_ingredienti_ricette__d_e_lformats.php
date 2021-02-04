<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IngredientiRicetteDELformats extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('formats');
        Schema::table('labels', function(Blueprint  $table) {
            $table->renameColumn('description', 'ingredients');
            $table->renameColumn('image', 'image1');
        });

        Schema::table('labels', function(Blueprint $table) {
            $table->text('recipes')->after('ingredients')->nullable();
            $table->renameColumn('subtitle', 'webdesc');

            $table->char('image2')->nullable()->after('image1');
            $table->char('image3')->nullable()->after('image2');
            $table->char('image4')->nullable()->after('image3');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
