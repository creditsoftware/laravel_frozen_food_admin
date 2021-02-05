<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Label;

class ApiController extends Controller
{
    public function getProd()
    {
        if(!request()->has('code'))
            return response(['err' => 'missing code']);

        $code = request()->get('code');

        $p = Product::whereCode($code)->first();
        if(!$p) return response(['err' => 'product code not found'], 400);
        $l = Label::find($p->activelabel);
        if(!$l) return response(['err' => 'activelabel not found'], 400);

        $p = $p->toArray();
        $l = $l->toArray();

        unset($p['id']);
        unset($p['activelabel']);

        unset($l['id']);
        unset($l['product_id']);
        unset($l['format_id']);
        unset($l['updated_at']);
        unset($l['webdesc']);
        unset($l['image1']);
        unset($l['image2']);
        unset($l['image3']);
        unset($l['image4']);
        $l['description'] = $l['ingredients'] . " " . $l['recipes'];
        unset($l['ingredients']);
        unset($l['recipes']);

        return [ 'product' => $p, 'label' => $l ];
    }

    public function newProd() {
        $code = request()->get('code');
        $name = request()->get('name');
        if(!$code)  return response(['err' => 'missing code'], 400);
        if(!$name)  return response(['err' => 'missing name'], 400);

        $p = Product::whereCode($code)->first();
        if($p) {
            $p->name = $name;
            $p->save();
            return ['ok' => 'product updated'];
        }

        $p = new Product();
        $p->code = $code;
        $p->name = $name;
        $p->save();

        $l = new Label();
        $l->name = $name;
        $l->product_id = $p->id;
        $l->format_id = 1;
        $l->save();

        $p->activelabel = $l->id;
        $p->save();

        return ['ok' => 'product created'];
    }

    public function prodUpdates() {
        $all = Product::all(['code', 'updated_at'])->sortByDesc('updated_at')->toArray();
        return array_column($all, 'updated_at', 'code');
    }
}
