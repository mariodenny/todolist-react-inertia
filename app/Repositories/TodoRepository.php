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
}
