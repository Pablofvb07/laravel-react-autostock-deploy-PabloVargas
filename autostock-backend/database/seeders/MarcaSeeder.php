<?php

namespace Database\Seeders;

use App\Models\Marca;
use Illuminate\Database\Seeder;

class MarcaSeeder extends Seeder
{
    public function run(): void
    {
        $marcas = [
            'Chevrolet', 'Toyota', 'Hyundai', 'Kia',
            'Mazda', 'Nissan', 'Ford', 'Volkswagen',
            'Renault', 'Suzuki',
        ];

        foreach ($marcas as $nombre) {
            Marca::create(['nombre' => $nombre]);
        }
    }
}