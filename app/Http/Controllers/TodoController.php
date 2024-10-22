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

    public function show(int $id)
    {
        $todo = $this->service->getTodoUsingId($id);
    }

    public function updateStatus(Request $request, int $id)
    {
        $todo = $this->service->updateStatusFinish($request, $id);

        if (!$todo) {
            return response()->json([
                'status' => 'error',
                'message' => 'Request Failed!',
                'code' => 500
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Request Success!',
            'code' => 200
        ]);
    }
}
