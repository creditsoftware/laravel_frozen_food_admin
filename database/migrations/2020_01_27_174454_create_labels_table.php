<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLabelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('labels', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('product_id');
            $table->bigInteger('format_id');
            $table->text('notes')->nullable();

            $table->char('name');
            $table->text('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->text('allergens')->nullable();

            $table->char('energy')->nullable();
            $table->char('carbo')->nullable();
            $table->char('protein')->nullable();
            $table->char('fat')->nullable();
            $table->char('acidfat')->nullable();
            $table->char('sugar')->nullable();
            $table->char('salt')->nullable();
            $table->timestamps();
        });

        foreach(\App\Models\Product::all() as $p) {
            $l = new \App\Models\Label();
            $l->product_id = $p->id;
            $l->format_id = 1;
            $l->name = $p->name;
            $l->subtitle = "PRODOTTO CONGELATO | CONSERVARE A -18°C";
            $l->description = str_repeat("test ", 40);
            $l->energy = rand(1, 100);
            $l->fat = rand(1, 100);
            $l->carbo = rand(1, 100);
            $l->protein = rand(1, 100);
            $l->acidfat = rand(1, 100);
            $l->sugar = rand(1, 100);
            $l->salt = rand(1, 100);
            $l->save();

            $p->activelabel = $l->id;
            $p->save();
        }


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('labels');
    }
}
