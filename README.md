# Prerrequisitos de software:

1. Docker y Docker-compose para el backend
2. Node.js para el frontend


# Instrucciones para inicializar el proyecto:

## Inicializar el Backend (Docker-Compose)
1. Navega al directorio `forex_app_backend/`.
2. Ejecuta el siguiente comando para construir e iniciar el backend:

   ```bash
   docker-compose up --build
   ```

## Inicializar el Frontend
1. Navega al directorio `forex_app_frontend/`.
2. Instala las dependencias necesarias con:

   ```bash
   npm install
   ```

3. Ejecuta el siguiente comando para iniciar el frontend:

   ```bash
   npm start
   ```

## NOTA IMPORTANTE SOBRE LAS VARIABLES DE ENTORNO
`Este repositorio incluye archivos .env con credenciales de trabajo y claves API. Soy consciente de que en un entorno de producción real, estos archivos nunca se enviarían al control de versiones por razones de seguridad. Las credenciales incluidas con el único propósito de que se pueda ejecutar la app sin la necesidad de generar los .env manualmente.`