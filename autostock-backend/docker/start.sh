#!/bin/sh
# ============================================================
# start.sh — Script de inicio del contenedor
# ============================================================

set -e

echo "🚀 Iniciando Autostock Backend..."

cd /var/www/html

# Cachear configuración para producción
echo "📦 Optimizando Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ejecutar migraciones automáticamente al iniciar
echo "🗄️  Ejecutando migraciones..."
php artisan migrate --force

echo "✅ Listo. Iniciando servicios..."

# Supervisord gestiona tanto php-fpm como nginx
exec /usr/bin/supervisord -c /etc/supervisord.conf
