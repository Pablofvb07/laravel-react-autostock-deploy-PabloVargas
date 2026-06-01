<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $fillable = [
        'product_id', 'user_id', 'cantidad',
        'cliente_nombre', 'tipo_cliente', 'cliente_cedula',
        'precio_unitario', 'descuento_aplicado', 'total',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}