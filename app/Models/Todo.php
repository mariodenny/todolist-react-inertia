<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $guarded = ['id'];

    public function todoDetails()
    {
        return $this->hasMany(TodoDetail::class, 'todo_id');
    }
}
