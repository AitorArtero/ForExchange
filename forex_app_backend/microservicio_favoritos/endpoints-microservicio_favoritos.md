Pruebas para checkear el correcto funcionamiento del microservicio (via cURL):

### Registrar usuario:

curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d '{"email": "usuario@ejemplo.com", "password": "123456", "name": "Usuario Ejemplo"}'

### LogIn de Usuario (tiene que estar registrado):

curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"email": "usuario@ejemplo.com", "password": "123456"}'

### Obtener perfil de usuario:

curl -X GET http://localhost:3000/api/profile -H "Authorization: Bearer TU_TOKEN_OBTENIDO_EN_LOGIN"

### Cerrar sesión:

curl -X POST http://localhost:3000/api/logout -H "Authorization: Bearer TU_TOKEN_OBTENIDO_EN_LOGIN"

### Eliminar cuenta:

curl -X DELETE http://localhost:3000/api/profile -H "Authorization: Bearer TU_TOKEN_OBTENIDO_EN_LOGIN"

---

## Favorites Service:

### Obtener los favoritos de un usuario:
curl -X GET http://localhost:5000/api/v1/favorites \
  -H "Authorization: Bearer TU_TOKEN"

### Añadir un favorito a un usuario:

curl -X POST http://localhost:5000/api/v1/favorites \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"exchangeRateId": "456"}'

### Eliminar un favorito de un usuario

curl -X DELETE http://localhost:5000/api/v1/favorites/123 \
  -H "Authorization: Bearer TU_TOKEN"
