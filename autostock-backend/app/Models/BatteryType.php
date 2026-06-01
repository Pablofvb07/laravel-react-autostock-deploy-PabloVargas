<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatteryType extends Model
{
    protected $fillable = ['nombre'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function compatibilidades()
    {
        return $this->hasMany(Compatibilidad::class);
    }
}