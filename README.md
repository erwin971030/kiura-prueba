<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Prueba Backend Kiura

1. Clonar proyecto 
    ```
    npm install
    ```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

4. Cambiar las variables de entorno
    ```
    docker-compose -up -d
    ``` 

6. Levantar: 
    ```
    npm run start:dev
    ```

7. Entrar en un navegador a: 
    ```
    http://localhost:3000/api
    ```

8. Ejecutar primero el Seeder para cargar los datos a la Base de datos (Lo encontraras en Swagger luego de entrar al punto 7).