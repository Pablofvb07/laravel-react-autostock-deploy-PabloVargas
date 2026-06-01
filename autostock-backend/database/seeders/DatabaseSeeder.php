<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BatteryTypeSeeder::class,
            MarcaSeeder::class,
            ModeloSeeder::class,
            AnioVehiculoSeeder::class,
            ProveedorSeeder::class,
            CategoriaSeeder::class,
            ProductSeeder::class,
            CompatibilidadSeeder::class,
        ]);
    }
}