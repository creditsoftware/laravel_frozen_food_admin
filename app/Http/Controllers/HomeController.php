<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Label;
use App\Models\Format;
use Str;

class HomeController extends Controller
{
    public function show() {
        return react('home', 'Home',
            [
                'products' =>  Product::all()->toJson(),
                'labels' => Label::all()->toJson(),
            ]
        );
    }


    public function updCod() {
        $oldCod = request()->get('oldCod');
        $newCod = request()->get('newCod');
        if(!trim($oldCod) || !trim($newCod)) return ['err' => 'invalid input cods'];

        $c = Product::whereCode($newCod)->count();
        if($c > 0) return ['err' => 'codice duplicato'];

        $p = Product::whereCode($oldCod)->get();
        if(count($p) == 0) return ['err' => 'code not found'];

        $p[0]->code = $newCod;
        $p[0]->save();

        return ['ok' => 'changed'];
    }

    public function dupe($id) {
        $l = Label::find($id);
        if(!$l) return ['err' => 'label not found'];

        $m = $l->replicate();
        $m->save();
        return ['ok' => $m];
    }

    public function delLabel($id) {
        $l = Label::find($id);
        if(!$l) return ['err' => 'label not found'];
        $p = Product::find($l->product_id);
        if($p->activelabel == $id)
            return ['err' => "can't delete active label"];

        $l->delete();
        return ['ok' => 'deleted'];
    }

    public function delProduct($id) {
        $p = Product::find($id);
        if(!$p) return ['err' => 'product not found'];

        $labels = Label::whereProductId($id)->get();
        foreach($labels as $l) {
            $l->delete();
        }
        $p->delete();
        return['ok' => 'deleted'];
    }

    public function active($id) {
        $l = Label::find($id);
        if(!$l) return ['err' => 'label not found'];

        $p = Product::find($l->product_id);
        if(!$p) return ['err' => 'product not found'];

        $p->activelabel = $l->id;
        $p->save();
        return ['ok' => $p];
    }

    public function save() {
        $id = request()->get('id');
        $code = request()->get('code');
        $price = request()->get('price');
        $p = Product::whereCode($code)->first();
        if(!$p) return ['err' => 'product not found'];
        $p->price = $price;
        $p->save();
        $l = Label::find($id);
        if(!$l) return ['err' => 'label not found'];
        $l->notes = request()->get('notes');
        $l->name = request()->get('name');
        $l->webdesc = request()->get('webdesc');
        $l->ingredients = request()->get('ingredients');
        $l->recipes = request()->get('recipes');
        $l->allergens = request()->get('allergens');

        $l->energy = request()->get('energy');
        $l->carbo = request()->get('carbo');
        $l->protein = request()->get('protein');
        $l->fat = request()->get('fat');
        $l->acidfat = request()->get('acidfat');
        $l->sugar = request()->get('sugar');
        $l->salt = request()->get('salt');

        $l->image1 = request()->get('image1');
        $l->image2 = request()->get('image2');
        $l->image3 = request()->get('image3');
        $l->image4 = request()->get('image4');
        $l->save();

        $l->product->touch();

        $this->deleteOtherImages($id, [$l->image1, $l->image2, $l->image3, $l->image4]);

        return ['ok' => $l];
    }

    public function uploadImage($id) {
        $content = request()->getContent();
        $length = strlen($content);

        if($length === 0)
            return response('zero length content', 400);

        $time = time();
        $fname = "{$id}_{$time}.jpg";

        file_put_contents("./public/uploads/label/{$fname}", $content);
        return $fname;

    }

    private function deleteOtherImages($id, Array $keep) {
        $files = scandir("./public/uploads/label/");

        foreach($files as $f) {
            if(!Str::startsWith($f, "{$id}_"))
                continue;

            if(in_array($f, $keep))
                continue;

            unlink("./public/uploads/label/".$f);
        }
    }
}
