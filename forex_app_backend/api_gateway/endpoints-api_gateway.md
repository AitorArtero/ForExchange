# Para hacer las pruebas para comprobar que todo funciona (con curl):

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