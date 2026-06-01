<?php

namespace Database\Seeders;

use App\Models\AnioVehiculo;
use App\Models\Modelo;
use Illuminate\Database\Seeder;

class AnioVehiculoSeeder extends Seeder
{
    public function run(): void
    {
        $modelos = Modelo::all();

        foreach ($modelos as $modelo) {
            foreach (range(2010, 2024) as $anio) {
                AnioVehiculo::create([
                    'anio'      => $anio,
                    'modelo_id' => $modelo->id,
                ]);
            }
        }
    }
}