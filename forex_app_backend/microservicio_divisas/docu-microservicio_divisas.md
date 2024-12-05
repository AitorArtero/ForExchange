# Para crear la DDBB y el user

### Acceder a PostgreSQL como usuario postgres
sudo -u postgres psql

### Una vez dentro de psql, crear la base de datos
CREATE DATABASE forexchange;

### Crear un usuario (si no tienes uno)
CREATE USER myuser WITH PASSWORD 'mypassword';

### Dar permisos al usuario sobre la base de datos
GRANT ALL PRIVILEGES ON DATABASE forexchange TO myuser;

### Salir de psql
\q


---


para ejecutar el microservicio me voy hasta la carpeta de "microservicio_divisas" y ejecuto el siguiente comando (estando en el environment correcto):

> uvicorn main:app --reload --port 8001

en mi caso utilizo el puerto 8001 y no el puerto por defecto (que sería el 8000) porque ya está en uso en mi máquina

tengo un alias creado para facilitar la ejecución