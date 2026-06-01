<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modelo extends Model
{
    protected $fillable = ['nombre', 'marca_id'];

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    public function aniosVehiculo()
    {
        return $this->hasMany(AnioVehiculo::class);
    }
}