<?php

namespace Database\Seeders;

use App\Models\BatteryType;
use App\Models\Categoria;
use App\Models\Product;
use App\Models\Proveedor;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $bosch   = Proveedor::where('nombre', 'like', '%Bosch%')->first()->id;
        $acdelco = Proveedor::where('nombre', 'like', '%AC Delco%')->first()->id;
        $willard = Proveedor::where('nombre', 'like', '%Willard%')->first()->id;

        $bateria   = Categoria::where('es_bateria', true)->first()->id;
        $accesorio = Categoria::where('es_bateria', false)->first()->id;

        $t45  = BatteryType::where('nombre', '45Ah')->first()->id;
        $t55  = BatteryType::where('nombre', '55Ah')->first()->id;
        $t60  = BatteryType::where('nombre', '60Ah')->first()->id;
        $t70  = BatteryType::where('nombre', '70Ah')->first()->id;
        $t80  = BatteryType::where('nombre', '80Ah')->first()->id;
        $t100 = BatteryType::where('nombre', '100Ah')->first()->id;

        Product::insert([
            ['nombre' => 'Bosch S4 45Ah',          'precio_costo' => 60,  'precio_venta' => 89.99,  'stock' => 8,  'categoria_id' => $bateria,   'calidad_marca' => 5, 'fecha_ingreso' => '2024-10-01', 'proveedor_id' => $bosch,   'battery_type_id' => $t45,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Bosch S4 55Ah',          'precio_costo' => 70,  'precio_venta' => 105.00, 'stock' => 5,  'categoria_id' => $bateria,   'calidad_marca' => 5, 'fecha_ingreso' => '2024-08-15', 'proveedor_id' => $bosch,   'battery_type_id' => $t55,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Bosch S4 60Ah',          'precio_costo' => 75,  'precio_venta' => 120.00, 'stock' => 10, 'categoria_id' => $bateria,   'calidad_marca' => 5, 'fecha_ingreso' => '2025-01-10', 'proveedor_id' => $bosch,   'battery_type_id' => $t60,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Bosch S5 70Ah Premium',  'precio_costo' => 90,  'precio_venta' => 150.00, 'stock' => 4,  'categoria_id' => $bateria,   'calidad_marca' => 5, 'fecha_ingreso' => '2025-02-20', 'proveedor_id' => $bosch,   'battery_type_id' => $t70,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'AC Delco 55Ah',          'precio_costo' => 50,  'precio_venta' => 88.00,  'stock' => 6,  'categoria_id' => $bateria,   'calidad_marca' => 4, 'fecha_ingreso' => '2024-06-01', 'proveedor_id' => $acdelco, 'battery_type_id' => $t55,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'AC Delco 60Ah',          'precio_costo' => 55,  'precio_venta' => 95.00,  'stock' => 3,  'categoria_id' => $bateria,   'calidad_marca' => 4, 'fecha_ingreso' => '2024-05-15', 'proveedor_id' => $acdelco, 'battery_type_id' => $t60,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Willard 55Ah',            'precio_costo' => 45,  'precio_venta' => 80.00,  'stock' => 0,  'categoria_id' => $bateria,   'calidad_marca' => 3, 'fecha_ingreso' => '2024-03-01', 'proveedor_id' => $willard, 'battery_type_id' => $t55,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Willard 80Ah',            'precio_costo' => 100, 'precio_venta' => 175.00, 'stock' => 2,  'categoria_id' => $bateria,   'calidad_marca' => 3, 'fecha_ingreso' => '2024-04-10', 'proveedor_id' => $willard, 'battery_type_id' => $t80,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Willard 100Ah 4x4',      'precio_costo' => 130, 'precio_venta' => 210.00, 'stock' => 3,  'categoria_id' => $bateria,   'calidad_marca' => 3, 'fecha_ingreso' => '2024-07-20', 'proveedor_id' => $willard, 'battery_type_id' => $t100, 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Cargador de Batería 12V', 'precio_costo' => 20,  'precio_venta' => 35.00,  'stock' => 15, 'categoria_id' => $accesorio, 'calidad_marca' => 3, 'fecha_ingreso' => '2025-01-05', 'proveedor_id' => null,     'battery_type_id' => null,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Terminales para Batería', 'precio_costo' => 4,   'precio_venta' => 8.50,   'stock' => 30, 'categoria_id' => $accesorio, 'calidad_marca' => 3, 'fecha_ingreso' => '2025-02-01', 'proveedor_id' => null,     'battery_type_id' => null,  'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Cables de Arranque 3m',   'precio_costo' => 12,  'precio_venta' => 22.00,  'stock' => 12, 'categoria_id' => $accesorio, 'calidad_marca' => 3, 'fecha_ingreso' => '2025-03-10', 'proveedor_id' => null,     'battery_type_id' => null,  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}