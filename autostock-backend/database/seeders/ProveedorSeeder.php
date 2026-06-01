<?php

namespace Database\Seeders;

use App\Models\Proveedor;
use Illuminate\Database\Seeder;

class ProveedorSeeder extends Seeder
{
    public function run(): void
    {
        Proveedor::insert([
            [
                'nombre'     => 'Distribuidora Bosch Ecuador',
                'telefono'   => '0998001122',
                'email'      => 'ventas@boschec.com',
                'direccion'  => 'Av. 10 de Agosto N45-100, Quito',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre'     => 'AC Delco Distribuciones',
                'telefono'   => '0991234567',
                'email'      => 'info@acdelcoec.com',
                'direccion'  => 'Av. 6 de Diciembre N23-50, Quito',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre'     => 'Willard Baterías S.A.',
                'telefono'   => '0987654321',
                'email'      => 'ventas@willardbaterias.com',
                'direccion'  => 'Km 5.5 Vía a Daule, Guayaquil',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}