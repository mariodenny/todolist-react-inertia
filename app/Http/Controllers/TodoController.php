<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\StoreTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use App\Models\Todo;
use App\Services\TodoService;
use App\Trait\InertiaRender;
use App\Trait\JsonResponser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    use JsonResponser;

    public function __construct(
        protected TodoService $service
    ) {
        $this->service = $service;
    }

    public function test()
    {
        return Inertia::render('Test');
    }

    public function store(StoreTodoRequest $request)
    {
        $todo = $this->service->createTodoData($request);

        if (!$todo) {
            return $this->jsonErrorResponse($todo);
        }

        return $this->jsonSuccessResponse($todo);
    }

    public function update(int $id, UpdateTodoRequest $request)
    {
        $todo = $this->service->createUpdateTodoData($id, $request);

        if (!$todo) {
            return $this->jsonErrorResponse($todo);
        }

        return $this->jsonSuccessResponse($todo);
    }

    public function delete(int $id)
    {
        $todo = $this->service->deleteTodo($id);

        if (!$todo) {
            return $this->jsonErrorResponse($todo);
        }

        return $this->jsonSuccessResponse($todo);
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

        if (!$todo) {
            return $this->jsonErrorResponse($todo);
        }

        return $this->jsonSuccessResponse($todo);
    }

    public function updateStatus(Request $request, int $id)
    {
        $todo = $this->service->updateStatusFinish($request, $id);

        if (!$todo) {
            return $this->jsonErrorResponse($todo);
        }

        return $this->jsonSuccessResponse($todo);
    }
}
