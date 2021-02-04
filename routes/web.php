<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', 'Auth\LoginController@show')->name('login');
Route::post('login', 'Auth\LoginController@login');

//Route::get('test', 'TestController@index');

Route::middleware(['auth'])->group(function () {
    Route::get('logout', 'Auth\LoginController@logout')->name('logout');
    Route::get('/', 'HomeController@show')->name('home');


    Route::group(['prefix' => 'ajax'], function () {
        Route::group(['middleware' => 'json'], function() {
            Route::get('/dupe/{id}', 'HomeController@dupe')->where('id', '[0-9]+');
            Route::get('/delLabel/{id}', 'HomeController@delLabel')->where('id', '[0-9]+');
            Route::get('/delProduct/{id}', 'HomeController@delProduct')->where('id', '[0-9]+');
            Route::get('/active/{id}', 'HomeController@active')->where('id', '[0-9]+');
            Route::post('/save', 'HomeController@save')->where('id', '[0-9]+');
            Route::post('/updCod', 'HomeController@updCod');
        });
        Route::post('/upimg/{id}', 'HomeController@uploadImage')->where('id', '[0-9]+_[1234]');
    });
});

Route::fallback(function () {
    return 'Errore 404 - Pagina non trovata';
});
