# ============================================================
# Autostock Backend — Dockerfile
# Laravel 13 · PHP 8.3 · PostgreSQL (Supabase)
# Compatible con Railway y Render
# ============================================================

FROM php:8.3-fpm-alpine AS base

# Instalar dependencias del sistema
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    oniguruma-dev \
    icu-dev \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        pgsql \
        zip \
        mbstring \
        intl \
        opcache \
    && apk del --no-cache git

# Instalar Composer
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

# ============================================================
# Configuración de PHP
# ============================================================
COPY docker/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# ============================================================
# Configuración de Nginx
# ============================================================
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/http.d/default.conf

# ============================================================
# Configuración de Supervisor (gestiona php-fpm + nginx)
# ============================================================
COPY docker/supervisord.conf /etc/supervisord.conf

# ============================================================
# Copiar y preparar la aplicación
# ============================================================
WORKDIR /var/www/html

# Copiar composer files primero (cache de capas Docker)
COPY composer.json composer.lock ./

# Instalar dependencias PHP (sin dev, optimizado)
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --optimize-autoloader \
    --no-scripts

# Copiar el resto de la aplicación
COPY . .

# Permisos correctos para Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Script de inicio
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

# Puerto que expone la app (Railway/Render lo detectan automáticamente)
EXPOSE 8080

CMD ["/start.sh"]
