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

    public function updateTodoById($id, $todoUpdated)
    {
        $todo = $this->getTodosUsingId($id);

        if (!$todo) {
            return false;
        }

        return $todo->update([
            'task_name' => $todoUpdated['task_name'],
            'description' => $todoUpdated['description'],
            'updated_at' => $todoUpdated['updated_at']
        ]);
    }
}
