<?php

namespace App\Services;

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
}
