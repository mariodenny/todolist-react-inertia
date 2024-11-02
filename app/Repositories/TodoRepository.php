<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Models\TodoDetail;

class TodoRepository
{

    public function __construct(
        protected Todo $model,
        protected TodoDetail $modelDetail
    ) {
        $this->model = $model;
        $this->modelDetail = $modelDetail;
    }

    public function getAllTodosWithDetails()
    {
        return $this->model->with('todoDetails')->get();
    }

    public function getTodosUsingId(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function updateStatusTodoUsingId($status, int $id)
    {
        $todo = $this->getTodosUsingId($id);

        if (!$todo) {
            return false;
        }

        return $todo->update(['is_finish' => $status]);
    }

    public function storeNewTodo($todo)
    {
        return $this->model->create($todo);
    }

    public function deleteTodo(int $id)
    {
        $todo = $this->getTodosUsingId($id);

        if (!$todo) {
            return false;
        }

        return $todo->delete();
    }

    public function updateTodoById($id, $todo)
    {
        $todo = $this->getTodosUsingId($id);

        if (!$todo) {
            return false;
        }

        return $todo->update([
            'task_name' => $todo->task_name,
            'description' => $todo->description,
            'updated_at' => $todo->updated_at
        ]);
    }
}
