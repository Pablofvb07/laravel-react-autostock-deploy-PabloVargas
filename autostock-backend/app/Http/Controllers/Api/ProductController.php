<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with(['proveedor', 'batteryType', 'categoria'])->get();
    }

    public function store(Request $request)
    {
        $categoria = Categoria::findOrFail($request->categoria_id);

        $request->validate([
            'nombre'          => 'required|string|max:255',
            'precio_costo'    => 'required|numeric|min:0.01',
            'precio_venta'    => 'required|numeric|min:0.01',
            'stock'           => 'required|integer|min:0',
            'categoria_id'    => 'required|exists:categorias,id',
            'calidad_marca'   => 'required|integer|min:1|max:5',
            'fecha_ingreso'   => 'required|date',
            'proveedor_id'    => $categoria->es_bateria ? 'required|exists:proveedores,id' : 'nullable|exists:proveedores,id',
            'battery_type_id' => $categoria->es_bateria ? 'required|exists:battery_types,id' : 'nullable|exists:battery_types,id',
        ]);

        $product = Product::create($request->all());
        return response()->json($product->load(['proveedor', 'batteryType', 'categoria']), 201);
    }

    public function show($id)
    {
        return Product::with(['proveedor', 'batteryType', 'categoria'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product   = Product::findOrFail($id);
        $categoria = Categoria::findOrFail($request->categoria_id);

        $request->validate([
            'nombre'          => 'required|string|max:255',
            'precio_costo'    => 'required|numeric|min:0.01',
            'precio_venta'    => 'required|numeric|min:0.01',
            'stock'           => 'required|integer|min:0',
            'categoria_id'    => 'required|exists:categorias,id',
            'calidad_marca'   => 'required|integer|min:1|max:5',
            'fecha_ingreso'   => 'required|date',
            'proveedor_id'    => $categoria->es_bateria ? 'required|exists:proveedores,id' : 'nullable|exists:proveedores,id',
            'battery_type_id' => $categoria->es_bateria ? 'required|exists:battery_types,id' : 'nullable|exists:battery_types,id',
        ]);

        $product->update($request->all());
        return response()->json($product->load(['proveedor', 'batteryType', 'categoria']));
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Producto eliminado']);
    }
}