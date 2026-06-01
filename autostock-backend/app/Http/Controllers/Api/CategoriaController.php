<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function index()
    {
        return Categoria::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'     => 'required|string|max:255|unique:categorias,nombre',
            'es_bateria' => 'required|boolean',
        ]);

        return response()->json(Categoria::create($request->all()), 201);
    }

    public function update(Request $request, $id)
    {
        $categoria = Categoria::findOrFail($id);

        $request->validate([
            'nombre'     => "required|string|max:255|unique:categorias,nombre,{$id}",
            'es_bateria' => 'required|boolean',
        ]);

        $categoria->update($request->all());
        return response()->json($categoria);
    }

    public function destroy($id)
    {
        $categoria = Categoria::findOrFail($id);

        if ($categoria->products()->count() > 0) {
            return response()->json([
                'error' => 'No puedes eliminar una categoría que tiene productos asignados'
            ], 422);
        }

        $categoria->delete();
        return response()->json(['message' => 'Categoría eliminada']);
    }
}