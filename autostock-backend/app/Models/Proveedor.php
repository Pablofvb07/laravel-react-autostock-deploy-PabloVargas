<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedores';
    protected $fillable = ['nombre', 'telefono', 'email', 'direccion'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}