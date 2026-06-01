<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Compatibilidad extends Model
{
    protected $table = 'compatibilidades';
    protected $fillable = ['anio_vehiculo_id', 'battery_type_id'];

    public function anioVehiculo()
    {
        return $this->belongsTo(AnioVehiculo::class);
    }

    public function batteryType()
    {
        return $this->belongsTo(BatteryType::class);
    }
}