"use strict";

// cargar modeluso de node para crear el servidor

var express = require("express");
var bodyParser = require("body-parser");

//ejecutar express (http)

var app = express();

// Cargar ficheros rutas

var article_routes = require("./routes/article");

//Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Anadir prefijos a rutas / cargar rutas

app.use("/api", article_routes);

// Ruta o medoto de prueba para el API REST

/*
app.post('/probando', (req, res)=>{
    var hola = req.body.hola;
    return res.status(200).send({

        
        
        curso: 'Frameworks Master',
        autor: 'Daniel Galvan',
        profesion: 'Ingeniero',
        hola
    }
    )
});
*/
//Exportar el modulo (fichero actual)

module.exports = app;
