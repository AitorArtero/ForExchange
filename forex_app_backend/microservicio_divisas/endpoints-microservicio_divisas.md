Pruebas para checkear el correcto funcionamiento del microservicio (via cURL):

### Estatus:

curl http://127.0.0.1:8001/health


### Currencies:

curl http://127.0.0.1:8001/api/v1/currencies


### Exchange rate:

curl "http://127.0.0.1:8001/api/v1/exchange-rate?from_currency=USD&to_currency=EUR"

### Get exchange rate by id:

curl "http://127.0.0.1:8001/api/v1/exchange-rate/6"


### Convert amount:

curl "http://127.0.0.1:8001/api/v1/convert?from_currency=USD&to_currency=EUR&amount=100"



---


Al ejecutar el cURL 'curl "http://127.0.0.1:8001/api/v1/exchange-rate?from_currency=USD&to_currency=EUR"' la api debería mirar si tiene el valor del exchange en cache en la base de datos, y la petición se hizo hace menos de una hora. De no cumplirse, se utilizará la API de alphavantage.

Al ejecutar la consulta por segunda vez, quise comprobar si el script accedía correctamente a la base de datos en lugar de volver a hacer la petición. Al revisar los logs del servicio, noté que no solo la consulta se ejecuta de forma correcta, evitando llamadas innecesarias a la API, sino que la respuesta de la base de datos es extremadamente rápida (0,0004 s).
