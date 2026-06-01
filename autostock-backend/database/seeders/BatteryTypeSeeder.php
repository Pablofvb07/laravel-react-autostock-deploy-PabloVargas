<?php

namespace Database\Seeders;

use App\Models\BatteryType;
use Illuminate\Database\Seeder;

class BatteryTypeSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = ['45Ah', '55Ah', '60Ah', '70Ah', '80Ah', '100Ah'];

        foreach ($tipos as $tipo) {
            BatteryType::create(['nombre' => $tipo]);
        }
    }
}