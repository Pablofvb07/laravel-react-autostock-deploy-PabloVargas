<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anio_vehiculos', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('anio');
            $table->foreignId('modelo_id')->constrained('modelos')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anio_vehiculos');
    }
};