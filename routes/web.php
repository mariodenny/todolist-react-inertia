<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

// Route::get('todos', [TodoController::class, 'index']);
Route::get('test', [TodoController::class, 'test']);
Route::inertia('', 'Todos/Home');

Route::prefix('todos')->controller(TodoController::class)->group(function () {
    Route::get('', 'index');
    Route::put('/{id}/status', 'updateStatus');
});
