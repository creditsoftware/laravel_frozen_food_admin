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

    public function newProd(Request $request) {
      
        $pdata = $request->json()->all();
        $prod = $pdata['product'];// product
        $batch = $pdata['batch'];// batch

        if(!$prod)  return response(['err' => 'missing product'], 400);
        if(!$batch)  return response(['err' => 'missing batch'], 400);

        $code = isset($prod['code'])?$prod['code']:NULL;
        $name = isset($prod['name'])?$prod['name']:NULL;

        $number = isset($batch['number'])?$batch['number']:NULL;
        $expiration = isset($batch['expiration'])?$batch['expiration']:NULL;
        $packed = isset($batch['packed'])?$batch['packed']:NULL;
        $fao = isset($batch['fao'])?$batch['fao']:NULL;
        $origin = isset($batch['origin'])?$batch['origin']:NULL;
        $method = isset($batch['method'])?$batch['method']:NULL;
        $latin = isset($batch['latin'])?$batch['latin']:NULL;
        $sizing = isset($batch['sizing'])?$batch['sizing']:NULL;
        $price = isset($batch['price'])?$batch['price']:NULL;
        
        if(!$code)  return response(['err' => 'missing code'], 400);
        if(!$name)  return response(['err' => 'missing name'], 400);

        // if(!$number)  return response(['err' => 'missing number'], 400);
        // if(!$expiration)  return response(['err' => 'missing expiration'], 400);
        // if(!$packed)  return response(['err' => 'missing packed'], 400);
        // if(!$fao)  return response(['err' => 'missing fao'], 400);
        // if(!$origin)  return response(['err' => 'missing origin'], 400);
        // if(!$method)  return response(['err' => 'missing method'], 400);
        // if(!$latin)  return response(['err' => 'missing latin'], 400);
        // if(!$sizing)  return response(['err' => 'missing sizing'], 400);
        // if(!$price)  return response(['err' => 'missing price'], 400);

        $p = Product::whereCode($code)->first();
        if($p) {
            $p->name = $name;

            $p->number = $number;
            $p->expiration = $expiration;
            $p->packed = $packed;
            $p->fao = $fao;
            $p->origin = $origin;
            $p->method = $method;
            $p->latin = $latin;
            $p->sizing = $sizing;
            $p->price = $price;
            $p->save();
            return ['ok' => 'product updated'];
        }

        $p = new Product();
        $p->code = $code;
        $p->name = $name;
        $p->number = $number;
        $p->expiration = $expiration;
        $p->packed = $packed;
        $p->fao = $fao;
        $p->origin = $origin;
        $p->method = $method;
        $p->latin = $latin;
        $p->sizing = $sizing;
        $p->price = $price;
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
    public function test() {
        return ['ok' => 'ok'];
    }
}
