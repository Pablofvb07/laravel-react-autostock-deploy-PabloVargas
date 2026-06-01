<?php

namespace Database\Seeders;

use App\Models\Marca;
use App\Models\Modelo;
use Illuminate\Database\Seeder;

class ModeloSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Chevrolet'  => ['Sail', 'Aveo', 'Spark', 'Captiva', 'N300'],
            'Toyota'     => ['Corolla', 'Hilux', 'RAV4', 'Yaris'],
            'Hyundai'    => ['Tucson', 'Santa Fe', 'Accent', 'Grand i10'],
            'Kia'        => ['Sportage', 'Sorento', 'Rio', 'Picanto'],
            'Mazda'      => ['CX-5', 'CX-3', 'Mazda3', 'BT-50'],
            'Nissan'     => ['Frontier', 'Pathfinder', 'Sentra', 'Versa'],
            'Ford'       => ['Ranger', 'Explorer', 'Escape', 'EcoSport'],
            'Volkswagen' => ['Golf', 'Tiguan', 'Jetta', 'Polo'],
            'Renault'    => ['Duster', 'Logan', 'Sandero', 'Kwid'],
            'Suzuki'     => ['Grand Vitara', 'Vitara', 'Swift'],
        ];

        foreach ($data as $marcaNombre => $modelos) {
            $marca = Marca::where('nombre', $marcaNombre)->first();
            foreach ($modelos as $nombre) {
                Modelo::create(['nombre' => $nombre, 'marca_id' => $marca->id]);
            }
        }
    }
}