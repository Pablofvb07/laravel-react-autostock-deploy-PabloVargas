# 🔋 AutoStock — Sistema de Recomendación de Baterías

Sistema web para recomendar la batería ideal para cualquier vehículo, con scoring automático, descuentos y registro de ventas.

## 🌐 URLs

| Servicio | URL |
|----------|-----|
| Frontend | https://laravel-react-autostock-deploy-pabl.vercel.app |
| Backend API | https://laravel-react-autostock-deploy.onrender.com/api |

---

## 🔑 Credenciales

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | admin@autostock.com | password |
| Vendedor | vendedor@autostock.com | password |

---

## 🚗 ¿Cómo usar el Buscador de Baterías?

1. Inicia sesión como **Vendedor**
2. Haz clic en **Buscar Batería**
3. Selecciona la **Marca** del vehículo (ej: Toyota)
4. Selecciona el **Modelo** (ej: Corolla)
5. Selecciona el **Año** (ej: 2019)
6. El sistema muestra las baterías compatibles ordenadas por recomendación
7. Elige una batería y haz clic en **💰 Vender**

---

## 👤 Roles

### Administrador
- Gestionar productos, categorías y proveedores
- Gestionar marcas, modelos y años de vehículos
- Ver historial completo de ventas
- Administrar usuarios

### Vendedor
- Buscar batería por marca/modelo/año
- Ver recomendaciones con scoring y descuentos automáticos
- Registrar ventas directamente
- Ver inventario disponible

---

## 🧠 Sistema de Scoring

Cada batería recibe un puntaje automático. La de mayor puntaje aparece primero.

| Factor | Fórmula | Máximo |
|--------|---------|--------|
| Calidad de marca (1-5) | calidad × 20 | 100 pts |
| Precio (más barato = mejor) | max(0, 50 - precioFinal) | 50 pts |
| Stock disponible | min(stock × 2, 20) | 20 pts |
| Ventas últimos 30 días | min(ventas × 5, 30) | 30 pts |
| Descuento aplicado | descuento × 2 | 60 pts bonus |

---

## 🏷️ Descuentos Automáticos

| Condición | Descuento |
|-----------|-----------|
| Más de 180 días en bodega | +25% |
| Entre 90 y 180 días en bodega | +15% |
| Margen de ganancia mayor al 40% | +15% |
| **Máximo aplicable** | **30%** |

---

## 📦 Productos en el Sistema

| Producto | Precio | Stock | Calidad |
|----------|--------|-------|---------|
| Bosch S4 45Ah | $89.99 | 8 | ⭐⭐⭐⭐⭐ |
| Bosch S4 55Ah | $105.00 | 5 | ⭐⭐⭐⭐⭐ |
| Bosch S4 60Ah | $120.00 | 10 | ⭐⭐⭐⭐⭐ |
| Bosch S5 70Ah Premium | $150.00 | 4 | ⭐⭐⭐⭐⭐ |
| AC Delco 55Ah | $88.00 | 6 | ⭐⭐⭐⭐ |
| AC Delco 60Ah | $95.00 | 3 | ⭐⭐⭐⭐ |
| Willard 80Ah | $175.00 | 2 | ⭐⭐⭐ |
| Willard 100Ah 4x4 | $210.00 | 3 | ⭐⭐⭐ |
| Cargador de Batería 12V | $35.00 | 15 | ⭐⭐⭐ |
| Terminales para Batería | $8.50 | 30 | ⭐⭐⭐ |
| Cables de Arranque 3m | $22.00 | 12 | ⭐⭐⭐ |

---

## 🚙 Marcas de Vehículos Disponibles

Chevrolet · Toyota · Hyundai · Kia · Mazda · Nissan · Ford · Volkswagen · Renault · Suzuki

---

## 🛠️ Tecnologías

| Capa | Tecnología | Despliegue |
|------|-----------|------------|
| Frontend | React + Vite + React Router | Vercel |
| Backend | Laravel 13 + PHP 8.4 | Render (Docker) |
| Base de datos | PostgreSQL | Supabase |
| Autenticación | Laravel Sanctum | — |
| Contenedor | Docker + Nginx + php-fpm | — |
