<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'nombre', 'precio_costo', 'precio_venta',
        'stock', 'categoria_id', 'calidad_marca',
        'fecha_ingreso', 'proveedor_id', 'battery_type_id',
    ];

    protected function casts(): array
    {
        return [
            'fecha_ingreso' => 'date',
        ];
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function batteryType()
    {
        return $this->belongsTo(BatteryType::class);
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class);
    }
}