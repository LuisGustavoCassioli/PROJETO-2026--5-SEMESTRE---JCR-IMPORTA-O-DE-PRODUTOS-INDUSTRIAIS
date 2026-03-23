<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/produtos', function () {
    return view('produtos');
});

Route::get('/sobre-nos', function () {
    return view('sobre-nos');
});

