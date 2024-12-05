## Levantar el servidor (docker-compose)

Se utiliza Docker Compose para orquestar y desplegar fácilmente los diferentes servicios que componen ForExchange. El archivo *docker-compose.yml* define la configuración de los distintos servicios, incluyendo los microservicios de Forex y Favoritos, así como la base de datos de cada uno (PostgreSQL y MongoDB, respectivamente) y el API Gateway que gestiona las peticiones entre ellos.

Cuando ejecutamos el comando ```docker-compose up --build``` desde la carpeta donde se encuentra el archivo *docker-compose.yml*, Docker Compose realiza los siguientes pasos:
1. **Encontrar los Dockerfiles:** Localiza los Dockerfiles de cada servicio en las subcarpetas correspondientes.
2. **Construir las imágenes Docker:** Construye las imágenes Docker a partir de los Dockerfiles.
3. **Crear los contenedores:** Crea los contenedores Docker a partir de las imágenes.
4. **Levantar los servicios:** Levanta y ejecuta los diferentes servicios de la aplicación.

Lo más poderoso de Docker Compose es que realiza todo este proceso de manera automática, sin que tengas que preocuparte por construir las imágenes manualmente o coordinar el despliegue de los diferentes servicios. Basta con ejecutar un solo comando para poner en marcha toda tu aplicación.

## Comandos útiles:

Los siguientes comandos se ejecutarán desde la carpeta donde se encuentra el archivo docker-compose.yml:

### Levantar los servicios (contenedores) con docker-compose:
```bash
docker-compose up --build
```
### Para detener los contenedores:
```bash
docker-compose down
```
### Ver los logs de los servicios (debbuging)
```bash
docker-compose logs
docker-compose logs api_gateway
docker-compose logs forex_service
docker-compose logs favorites_service
```

---

# Endpoints de la app (con curl):

## Forex Service:

### Estatus:

curl http://localhost:5000/api/v1/forex/health

### Currencies:

curl http://localhost:5000/api/v1/forex/currencies

### Exchange rate:

curl "http://localhost:5000/api/v1/forex/exchange-rate?from_currency=USD&to_currency=EUR"

### Get exchange rate by id:

curl "http://localhost:5000/api/v1/forex/exchange-rate/6"

### Convert amount:

curl "http://localhost:5000/api/v1/forex/convert?from_currency=USD&to_currency=EUR&amount=100"

---

## Gestion de user

### Registro de usuario:
curl -X POST http://localhost:5000/api/v1/register -H "Content-Type: application/json" -d '{"email": "usuario@ejemplo.com", "password": "123456", "name": "Usuario Ejemplo"}'

### Login:
curl -X POST http://localhost:5000/api/v1/login -H "Content-Type: application/json" -d '{"email": "usuario@ejemplo.com", "password": "123456"}'

### Obtener info del perfil de usuario:

curl -X GET http://localhost:5000/api/v1/profile -H "Authorization: Bearer TU_TOKEN"

### Cerrar sesión (deshabilitar el token obtenido en el login):

curl -X POST http://localhost:5000/api/v1/logout -H "Authorization: Bearer TU_TOKEN"

### Eliminar cuenta:

curl -X DELETE http://localhost:5000/api/v1/profile -H "Authorization: Bearer TU_TOKEN"

---

## Favorites Service:

### Obtener los favoritos de un usuario:
curl -X GET http://localhost:5000/api/v1/favorites \
  -H "Authorization: Bearer TU_TOKEN"

### Añadir un favorito a un usuario:

curl -X POST http://localhost:5000/api/v1/favorites \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"exchangeRateId": "6"}'

### Eliminar un favorito de un usuario

curl -X DELETE http://localhost:5000/api/v1/favorites/123 \
  -H "Authorization: Bearer TU_TOKEN"