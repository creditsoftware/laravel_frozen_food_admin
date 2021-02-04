<?php

namespace App\Http\Controllers;


use App\Models\User;
use App\Models\Product;
use App\Models\Label;
use App\Models\Format;
use Hash;

class TestController extends Controller
{
    public function index() {
        return react('test', 'Test');
    }
}
