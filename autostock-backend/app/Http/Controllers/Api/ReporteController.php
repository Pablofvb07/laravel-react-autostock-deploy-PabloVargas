<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ReporteController extends Controller
{
    public function margenGanancia()
    {
        $productos = Product::with(['proveedor', 'categoria'])
            ->whereHas('categoria', function ($q) {
                $q->where('es_bateria', true);
            })
            ->get()
            ->map(function (Product $p) {
                $margen               = $p->precio_venta - $p->precio_costo;
                $p->margen            = round($margen, 2);
                $p->porcentaje_margen = round(($margen / $p->precio_venta) * 100, 2);
                return $p;
            })
            ->sortByDesc('porcentaje_margen')
            ->values();

        return response()->json($productos);
    }

    public function tiempoBodega()
    {
        $productos = Product::with(['proveedor', 'categoria'])
            ->whereHas('categoria', function ($q) {
                $q->where('es_bateria', true);
            })
            ->where('stock', '>', 0)
            ->get()
            ->map(function (Product $p) {
                $p->dias_en_bodega = $p->fecha_ingreso->diffInDays(now());
                return $p;
            })
            ->sortByDesc('dias_en_bodega')
            ->values();

        return response()->json($productos);
    }
}