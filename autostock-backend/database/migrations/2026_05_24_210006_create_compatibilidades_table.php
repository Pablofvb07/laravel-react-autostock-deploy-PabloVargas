<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('compatibilidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anio_vehiculo_id')->constrained('anio_vehiculos')->cascadeOnDelete();
            $table->foreignId('battery_type_id')->constrained('battery_types')->cascadeOnDelete();
            $table->unique(['anio_vehiculo_id', 'battery_type_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('compatibilidades');
    }
};