<h1 align="center">API Disney</h1>
<h3 align="center">API para explorar las Peliculas y actores del mundo Disney</h3>



<p>Crear Schema <b>apidisney</b> corriendo el script createSchema</p>
<p>Correr las migraciones con: sequelize db:migrate</p>
<p>Correr los seeders con: sequelize db:seed:all</p>

<span><b>EN CASO DE ERROR O QUERER VOLVER ATRÁS, BORRAR MIGRACIONES CON: sequelize db:migrate:undo:all Y VOLVER A CORRERLAS CON: sequelize db:migrate y luego los seed con: db:seed:all</b> </span>

###
***SINTAXÍS DE PLUGIN REST Client de VSC sin las etiquetas HTML***
## Registro
POST http://localhost:3000/auth/register HTTP/1.1
<p>content-type: application/json</p>

{
    "email": "bauereze@gmail.com",
    "password": "Pass!1234"
}

###

## Login
POST http://localhost:3000/auth/login HTTP/1.1
<p>content-type: application/json</p>

{
    "email": "bauereze@gmail.com",
    "password": "Pass!1234"
}

###

### ENPOINTS

ATENCION: Para realizar todas las consultas a traves de los enpoints se necesita colocar el TOKEN que se genera al registrarse y loguearse
<p>Authorization:"TOKEN EJEMPLO" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXVlcmV6ZWVAZ21haWwuY29tIiwiaWF0IjoxNjM4MTkwMjk0LCJleHAiOjE2MzgyMjYyOTR9.447qI_5cLwI05HNumChQzu8p7BbWvFQ_vJJ6Ke9V1Wk</p>


## PERSONAJES
GET http://localhost:3000/characters HTTP/1.1
<p>content-type: application/json</p>



###
## Listado de Personajes
GET http://localhost:3000/characters HTTP/1.1
<p>content-type: application/json</p>



###

## Buscar por nombre en orden desc
GET http://localhost:3000/characters?name=a&order=desc HTTP/1.1
<p>content-type: application/json</p>


###

## Filtrar por edad
GET http://localhost:3000/characters?age=36 HTTP/1.1
<p>content-type: application/json</p>


###

## Ordenar ASC | DESC
GET http://localhost:3000/characters?order=desc HTTP/1.1
<p>content-type: application/json</p>
###

## Filtrar por peso
GET http://localhost:3000/characters?weight=118 HTTP/1.1
<p>content-type: application/json</p>
###

###

## Detalle del Personaje
GET http://localhost:3000/characters/2 HTTP/1.1
<p>content-type: application/json</p>



###
## Crear Personaje
POST  http://localhost:3000/characters HTTP/1.1
<p>content-type: application/json</p>

{
    "name":"Johnny Deep",
    "image":"Johnny Deep.jpg",
    "age":54,
    "weight":99.50,
    "history":""

}
###

## Editar Personaje
PUT  http://localhost:3000/characters/6 HTTP/1.1
<p>content-type: application/json</p>



{
    "name":"Johnny Deep",
    "image":"Johnny Deep.jpg",
    "age":54,
    "weight":99.50,
    "history":""


}
###

## Eliminar Personaje
DELETE   http://localhost:3000/characters/6 HTTP/1.1
<p>content-type: application/json</p>



###
## Lista de Peliculas
GET http://localhost:3000/movies HTTP/1.1
<p>content-type: application/json</p>



###
## Buscar por título en orden desc
GET http://localhost:3000/movies?title=k&order=desc HTTP/1.1
<p>content-type: application/json</p>

###

## Filtrar por género [accion[id:1], animación[id:2], aventura[id:3], drama[id:4]]
GET http://localhost:3000/movies?genre=1 HTTP/1.1
<p>content-type: application/json</p>

###

## Ordenar ASC | DESC
GET http://localhost:3000/movies?order=asc HTTP/1.1
<p>content-type: application/json</p>

###

## Buscar peliculas por genero o titulo
GET http://localhost:3000/movies/search?name=drama HTTP/1.1
GET http://localhost:3000/movies/search?title=piratas HTTP/1.1
<p>content-type: application/json</p>

###


## Detalle de la Pelicula
GET http://localhost:3000/movies/7 HTTP/1.1
<p>content-type: application/json</p>



###
## Crear Pelicula formato de fecha YYYY/MM/DD
POST  http://localhost:3000/movies HTTP/1.1
<p>content-type: application/json</p>

{
    "title":"Piratas del Caribe",
    "releaseDate":"2020/02/20",
    "rating":10,
    "genreId":3,

}
###

## Editar Pelicula formato de fecha YYYY/MM/DD
PUT  http://localhost:3000/movies/6 HTTP/1.1
<p>content-type: application/json</p>


{
    "title":"Piratas del Caribe",
    "releaseDate":"2020/02/20",
    "rating":10,
    "genreId":3,

}
###

## Eliminar Peliculas
DELETE   http://localhost:3000/movies/5 HTTP/1.1
<p>content-type: application/json</p>


###

## RELACION CHARACTER MOVIE

## Crear relacion

POST  http://localhost:3000/movies/associate HTTP/1.1
<p>content-type: application/json</p>

{
    "characterId":5,
    "movieId":7

} 

###
### GENEROS

## Listado de generos
GET http://localhost:3000/genres HTTP/1.1
<p>content-type: application/json</p>



###

## Detalle del genero
GET http://localhost:3000/genres/2 HTTP/1.1
<p>content-type: application/json</p>



###
## Crear genero
POST  http://localhost:3000/genres HTTP/1.1
<p>content-type: application/json</p>


 {
    name : "animación",
    image:"icons8-animación-30.png",
   
  },
###

## Editar genero
PUT  http://localhost:3000/genres/6 HTTP/1.1
<p>content-type: application/json</p>


 {
    name : "animación",
    image:"icons8-animación-30.png",
   
  },

###

## Eliminar genero
DELETE   http://localhost:3000/genres/6 HTTP/1.1
<p>content-type: application/json</p>



###