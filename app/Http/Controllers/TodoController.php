<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Services\TodoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function __construct(
        protected TodoService $service
    ) {
        $this->service = $service;
    }

    public function test()
    {
        return Inertia::render('Test');
    }

    public function index()
    {
        $todos = $this->service->getAllTodos();
        return Inertia::render('Todos/Index', [
            'todos' => $todos
        ]);
    }
}
