<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnioVehiculo;
use App\Models\Compatibilidad;
use App\Models\Marca;
use App\Models\Modelo;
use App\Models\Product;
use Illuminate\Http\Request;

class CatalogoController extends Controller
{
    public function marcas()
    {
        return Marca::orderBy('nombre')->get();
    }

    public function modelos($marcaId)
    {
        return Modelo::where('marca_id', $marcaId)->orderBy('nombre')->get();
    }

    public function anios($modeloId)
    {
        return AnioVehiculo::where('modelo_id', $modeloId)
            ->orderBy('anio', 'desc')
            ->get();
    }

    public function recomendar(Request $request)
    {
        $request->validate([
            'anio_vehiculo_id' => 'required|exists:anio_vehiculos,id',
        ]);

        $compatibilidades = Compatibilidad::where('anio_vehiculo_id', $request->anio_vehiculo_id)
            ->pluck('battery_type_id');

        $productos = Product::with(['proveedor', 'batteryType', 'categoria'])
            ->whereIn('battery_type_id', $compatibilidades)
            ->where('stock', '>', 0)
            ->whereHas('categoria', function ($q) {
                $q->where('es_bateria', true);
            })
            ->get();

        $productos = $productos->map(function (Product $product) {
            $descuento = $this->calcularDescuento($product);
            $precioFinal = $product->precio_venta * (1 - $descuento / 100);

            $ventasRecientes = $product->ventas()
                ->where('created_at', '>=', now()->subDays(30))
                ->sum('cantidad');

            $score = 0;
            $score += $product->calidad_marca * 20;
            $score += max(0, 50 - $precioFinal);
            $score += min($product->stock * 2, 20);
            $score += min($ventasRecientes * 5, 30);
            $score += $descuento * 2;

            $product->precio_final = round($precioFinal, 2);
            $product->descuento = $descuento;
            $product->ventas_recientes = $ventasRecientes;
            $product->score = round($score, 2);

            return $product;
        });

        $productos = $productos->sortByDesc('score')->values();

        return response()->json($productos);
    }

    private function calcularDescuento(Product $product): float
    {
        $descuento = 0;
        $diasEnBodega = $product->fecha_ingreso->diffInDays(now());

        if ($diasEnBodega > 180) {
            $descuento += 25;
        } elseif ($diasEnBodega > 90) {
            $descuento += 15;
        }

        $margen = (($product->precio_venta - $product->precio_costo) / $product->precio_venta) * 100;
        if ($margen > 40) {
            $descuento += 15;
        }

        return min($descuento, 30);
    }
}