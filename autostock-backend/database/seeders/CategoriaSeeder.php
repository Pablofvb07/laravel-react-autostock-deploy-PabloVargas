<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        Categoria::insert([
            ['nombre' => 'Batería',   'es_bateria' => true,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Accesorio', 'es_bateria' => false, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}