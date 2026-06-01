<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function index()
    {
        return Proveedor::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'    => 'required|string|max:255',
            'telefono'  => 'required|string|max:20',
            'email'     => 'required|email|unique:proveedores,email',
            'direccion' => 'required|string|max:255',
        ]);

        return response()->json(Proveedor::create($request->all()), 201);
    }

    public function show($id)
    {
        return Proveedor::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $proveedor = Proveedor::findOrFail($id);

        $request->validate([
            'nombre'    => 'required|string|max:255',
            'telefono'  => 'required|string|max:20',
            'email'     => "required|email|unique:proveedores,email,{$id}",
            'direccion' => 'required|string|max:255',
        ]);

        $proveedor->update($request->all());
        return response()->json($proveedor);
    }

    public function destroy($id)
    {
        Proveedor::findOrFail($id)->delete();
        return response()->json(['message' => 'Proveedor eliminado']);
    }
}