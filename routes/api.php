<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['apiauth', 'json'])->group(function() {
    Route::get('product', 'ApiController@getProd');
    Route::post('product', 'ApiController@newProd');
    Route::get('products/updated_at', 'ApiController@prodUpdates');
    Route::get('test', 'ApiController@test');
});
// clear cache
Route::get('/clear-cache', function() {
    $exitCode = Artisan::call('cache:clear');
    // return what you want
});