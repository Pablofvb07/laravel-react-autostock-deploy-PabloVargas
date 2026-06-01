<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnioVehiculo extends Model
{
    protected $table = 'anio_vehiculos';
    protected $fillable = ['anio', 'modelo_id'];

    public function modelo()
    {
        return $this->belongsTo(Modelo::class);
    }

    public function compatibilidades()
    {
        return $this->hasMany(Compatibilidad::class);
    }
}