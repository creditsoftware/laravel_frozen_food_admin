<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->json('fields');
            $table->timestamps();
        });

        DB::table('formats')->insert([
           'fields'=> '[
    {
        "h": 455,
        "w": 790,
        "x": 71,
        "y": 410,
        "id": "name",
        "size": 1087,
        "lineh": 100,
        "title": "Nome",
        "uisize": 1
    },
    {
        "h": 722,
        "w": 931,
        "x": 72,
        "y": 484,
        "id": "description",
        "size": 413,
        "lineh": 134,
        "title": "Descrizione",
        "uisize": 12
    },
    {
        "h": 759,
        "w": 900,
        "x": 780,
        "y": 745,
        "id": "energy",
        "size": 471,
        "lineh": 100,
        "title": "Energia",
        "suffix": "KCal",
        "uisize": 0.33
    },
    {
        "h": 788,
        "w": 900,
        "x": 780,
        "y": 772,
        "id": "fat",
        "size": 472,
        "lineh": 100,
        "title": "Grassi",
        "suffix": "gr",
        "uisize": 0.33
    },
    {
        "h": 815,
        "w": 900,
        "x": 780,
        "y": 798,
        "id": "acidfat",
        "size": 472,
        "lineh": 100,
        "title": "Acidi grassi saturi",
        "suffix": "gr",
        "uisize": 0.33
    },
    {
        "h": 852,
        "w": 900,
        "x": 780,
        "y": 837,
        "id": "carbo",
        "size": 472,
        "lineh": 100,
        "title": "Carboidrati",
        "suffix": "gr"
    },
    {
        "h": 880,
        "w": 900,
        "x": 780,
        "y": 862,
        "id": "sugar",
        "size": 472,
        "lineh": 100,
        "title": "Zuccheri",
        "suffix": "gr",
        "uisize": 0.33
    },
    {
        "h": 903,
        "w": 900,
        "x": 780,
        "y": 889,
        "id": "protein",
        "size": 472,
        "lineh": 100,
        "title": "Proteine",
        "suffix": "gr",
        "uisize": 0.33
    },
    {
        "h": 933,
        "w": 900,
        "x": 780,
        "y": 915,
        "id": "salt",
        "size": 472,
        "lineh": 100,
        "title": "Sale",
        "suffix": "gr",
        "uisize": 0.33
    }
]'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formats');
    }
}
