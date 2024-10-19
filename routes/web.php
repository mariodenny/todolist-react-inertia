<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('todos', [TodoController::class, 'getAllTodosWithDetails']);
Route::get('test', [TodoController::class, 'test']);
