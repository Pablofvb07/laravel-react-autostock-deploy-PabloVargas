<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProveedorController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\CatalogoController;
use App\Http\Controllers\Api\ReporteController;
use App\Http\Controllers\Api\CategoriaController;

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Catálogo público
Route::get('/catalogo/marcas',            [CatalogoController::class, 'marcas']);
Route::get('/catalogo/modelos/{marcaId}', [CatalogoController::class, 'modelos']);
Route::get('/catalogo/anios/{modeloId}',  [CatalogoController::class, 'anios']);
Route::get('/catalogo/recomendar',        [CatalogoController::class, 'recomendar']);
Route::get('/catalogo/battery-types', function() {
    return \App\Models\BatteryType::all();
});

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Admin y vendedor
    Route::get('/products',      [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/proveedores',   [ProveedorController::class, 'index']);
    Route::post('/ventas',       [VentaController::class, 'store']);

    Route::get('/categorias', [CategoriaController::class, 'index']);

    // Solo admin
    Route::middleware('role:admin')->group(function () {

        Route::post('/products',        [ProductController::class, 'store']);
        Route::put('/products/{id}',    [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);

        Route::get('/proveedores/{id}',    [ProveedorController::class, 'show']);
        Route::post('/proveedores',        [ProveedorController::class, 'store']);
        Route::put('/proveedores/{id}',    [ProveedorController::class, 'update']);
        Route::delete('/proveedores/{id}', [ProveedorController::class, 'destroy']);

        Route::get('/ventas', [VentaController::class, 'index']);

        Route::post('/categorias',       [CategoriaController::class, 'store']);
        Route::put('/categorias/{id}',   [CategoriaController::class, 'update']);
        Route::delete('/categorias/{id}',[CategoriaController::class, 'destroy']);

        Route::get('/reportes/margen', [ReporteController::class, 'margenGanancia']);
        Route::get('/reportes/bodega', [ReporteController::class, 'tiempoBodega']);
    });
});