<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->char('code');
                $table->char('name');
                $table->bigInteger('activelabel')->nullable();
                $table->string('number')->nullable();
                $table->string('expiration')->nullable();
                $table->string('packed')->nullable();
                $table->string('fao')->nullable();
                $table->string('origin')->nullable();
                $table->string('method')->nullable();
                $table->string('latin')->nullable();
                $table->string('sizing')->nullable();
                $table->string('price')->nullable();
                $table->string('glazing')->nullable();
                $table->string('um')->nullable();
                $table->string('category')->nullable();
                $table->timestamps();
        });

        $prods = [
            'Fishburger di Merluzzo',
            'Filetto di Branzino Congelato',
            'Sardina Congelata',
            'Code di Gambero impanate',
            'Gusci di Capasanta',
            'Alette Piccanti',
            'Ali di Razza',
            'Anatra intera',
            'Anelli di Calamaro',
            'Anelli di Cipolla impanati',
            'Anelli di Totano alla romana',
            'Anelli e ciuffi di Calamari',
            'Aragosta intera',
            'Aragostelle',
            'Astice Americano',
            'Astice Americano Cotto',
            'Basi per Pizza',
            'Bastoncini di Merluzzo panati',
            'Bocconcini di Merluzzo nordico',
            'Bocconcini di Pollo',
            'Branzino extra',
            'Branzino piccolo',
            'Broccoli',
            'Busto di Pollo',
            'Calamari interi con pelle medi',
            'Calamari interi giganti',
            'Calamari interi piccoli',
            'Calamari interi puliti'
        ];

        $n = 0;
        while($n--)
            $prods[] = Str::random(15);

        foreach($prods as $name) {
            $p = new App\Models\Product();
            $p->name = $name;
            $p->code = Str::random(5);
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
        Schema::dropIfExists('products');
    }
}
