<?php

namespace App\Services;

use App\Http\Requests\Todo\StoreTodoRequest;
use App\Repositories\TodoRepository;

class TodoService
{

    public function __construct(
        protected TodoRepository $repository
    ) {
        $this->repository = $repository;
    }

    public function getAllTodos()
    {
        return $this->repository->getAllTodosWithDetails();
    }

    public function getTodoUsingId(int $id)
    {
        return $this->repository->getTodosUsingId($id);
    }

    public function updateStatusFinish($request, int $id)
    {
        $request->validate([
            'is_finish' => 'in:0,1'
        ]);

        $status = $request->is_finish;

        return $this->repository->updateStatusTodoUsingId($status, $id);
    }

    public function createTodoData(StoreTodoRequest $request)
    {
        $todo = [
            'task_name' => $request->task_name,
            'description' => $request->description,
            'is_finish' => $request->is_finish,
        ];

        return $this->repository->storeNewTodo($todo);
    }

    public function deleteTodo(int $id)
    {
        return $this->repository->deleteTodo($id);
    }
}
