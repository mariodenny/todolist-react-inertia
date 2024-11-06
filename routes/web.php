<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('todos', [TodoController::class, 'index']);
Route::get('test', [TodoController::class, 'test']);
Route::get('user/login', [UserController::class, 'loginForm']);

Route::prefix('todos')->controller(TodoController::class)->group(function () {
    Route::get('', 'index');
    Route::get('/{id}', 'show');
    Route::post('', 'store');
    Route::put('/{id}', 'update');
    Route::put('/{id}/status', 'updateStatus');
    Route::delete('{id}', 'delete');
});
