<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Venta;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    public function index()
    {
        return Venta::with(['product', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id'     => 'required|exists:products,id',
            'cantidad'       => 'required|integer|min:1',
            'cliente_nombre' => 'required|string|max:255',
            'tipo_cliente'   => 'required|in:consumidor_final,cedula,ruc',
            'cliente_cedula' => 'required_unless:tipo_cliente,consumidor_final|nullable|string',
        ]);

        if ($request->tipo_cliente !== 'consumidor_final') {
            if (!$this->validarCedulaRuc($request->cliente_cedula)) {
                return response()->json(['error' => 'La cédula o RUC ingresado no es válido'], 422);
            }
        }

        $product = Product::findOrFail($request->product_id);

        if ($product->stock < $request->cantidad) {
            return response()->json(['error' => 'Stock insuficiente. Disponible: ' . $product->stock], 422);
        }

        $descuento   = $this->calcularDescuento($product);
        $precioFinal = $product->precio_venta * (1 - $descuento / 100);

        $product->decrement('stock', $request->cantidad);

        $venta = Venta::create([
            'product_id'         => $product->id,
            'user_id'            => $request->user()->id,
            'cantidad'           => $request->cantidad,
            'cliente_nombre'     => $request->cliente_nombre,
            'tipo_cliente'       => $request->tipo_cliente,
            'cliente_cedula'     => $request->tipo_cliente !== 'consumidor_final' ? $request->cliente_cedula : null,
            'precio_unitario'    => $product->precio_venta,
            'descuento_aplicado' => $descuento,
            'total'              => $precioFinal * $request->cantidad,
        ]);

        return response()->json($venta->load(['product', 'user']), 201);
    }

    private function calcularDescuento(Product $product): float
    {
        $descuento    = 0;
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

    private function validarCedulaRuc(string $numero): bool
    {
        if (!ctype_digit($numero)) return false;

        $len = strlen($numero);
        if ($len !== 10 && $len !== 13) return false;

        $provincia = (int) substr($numero, 0, 2);
        if ($provincia < 1 || $provincia > 24) return false;

        if ($len === 13 && substr($numero, 10, 3) !== '001') return false;

        $digits       = array_map('intval', str_split(substr($numero, 0, 9)));
        $coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        $suma         = 0;

        foreach ($digits as $i => $digit) {
            $res  = $digit * $coeficientes[$i];
            $suma += $res > 9 ? $res - 9 : $res;
        }

        $verificador = $suma % 10 === 0 ? 0 : 10 - ($suma % 10);
        return $verificador === (int) $numero[9];
    }
}