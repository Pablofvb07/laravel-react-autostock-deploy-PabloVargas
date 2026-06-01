<?php

namespace Database\Seeders;

use App\Models\AnioVehiculo;
use App\Models\BatteryType;
use App\Models\Compatibilidad;
use App\Models\Marca;
use App\Models\Modelo;
use Illuminate\Database\Seeder;

class CompatibilidadSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Toyota'     => ['Corolla' => '60Ah', 'Yaris' => '45Ah',  'Hilux' => '80Ah',  'RAV4' => '70Ah'],
            'Chevrolet'  => ['Sail'    => '55Ah', 'Aveo'  => '45Ah',  'Spark' => '45Ah',  'Captiva' => '70Ah'],
            'Hyundai'    => ['Accent'  => '45Ah', 'Tucson'=> '60Ah',  'Santa Fe' => '70Ah', 'Grand i10' => '45Ah'],
            'Kia'        => ['Rio'     => '45Ah', 'Picanto' => '45Ah','Sportage' => '60Ah', 'Sorento' => '70Ah'],
            'Mazda'      => ['Mazda3'  => '55Ah', 'CX-3'  => '55Ah',  'CX-5' => '60Ah',   'BT-50' => '80Ah'],
            'Nissan'     => ['Versa'   => '45Ah', 'Sentra'=> '55Ah',  'Frontier' => '80Ah','Pathfinder' => '70Ah'],
            'Ford'       => ['EcoSport'=> '55Ah', 'Escape'=> '60Ah',  'Ranger' => '80Ah',  'Explorer' => '70Ah'],
            'Volkswagen' => ['Polo'    => '45Ah', 'Golf'  => '55Ah',  'Jetta' => '60Ah',   'Tiguan' => '60Ah'],
            'Renault'    => ['Kwid'    => '45Ah', 'Logan' => '55Ah',  'Sandero' => '55Ah', 'Duster' => '60Ah'],
            'Suzuki'     => ['Swift'   => '45Ah', 'Vitara'=> '55Ah',  'Grand Vitara' => '60Ah'],
        ];

        foreach ($data as $marcaNombre => $modelos) {
            $marca = Marca::where('nombre', $marcaNombre)->first();

            foreach ($modelos as $modeloNombre => $batteryNombre) {
                $modelo      = Modelo::where('nombre', $modeloNombre)->where('marca_id', $marca->id)->first();
                $batteryType = BatteryType::where('nombre', $batteryNombre)->first();

                if (!$modelo || !$batteryType) continue;

                $anios = AnioVehiculo::where('modelo_id', $modelo->id)->get();

                foreach ($anios as $anio) {
                    Compatibilidad::firstOrCreate([
                        'anio_vehiculo_id' => $anio->id,
                        'battery_type_id'  => $batteryType->id,
                    ]);
                }
            }
        }
    }
}