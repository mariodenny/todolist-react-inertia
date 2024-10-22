<?php

namespace Database\Seeders;

use App\Models\Todo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): bool
    {
        return Todo::insert([
            [
                'task_name' => 'Belajar Fullstack',
                'description' => 'Fullstack web development menggunakan laravel+inertia+react',
                'is_finish' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'task_name' => 'Konsep dasar hook react',
                'description' => 'Pahami useState dan useEffect di react',
                'is_finish' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
