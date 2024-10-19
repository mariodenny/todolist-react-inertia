<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        // 
    }

    public function test()
    {
        return Inertia::render('Test');
    }

    public function getAllTodosWithDetails()
    {
        $todos = Todo::with('todoDetails')->get();

        return Inertia::render('Todos/Index', [
            'todos' => $todos
        ]);
    }

    public function getTodoWithDetails(int $id)
    {
        return Todo::with('todoDetails')->findOrFail($id);
    }
}
