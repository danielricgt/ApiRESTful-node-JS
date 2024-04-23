'use strict'

// cargar modeluso de node para crear el servidor

var express = require('express');
var bodyParser = require('body-parser');


//ejecutar express (http)

var app = express();


// Cargar ficheros rutas


//Middleware

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS

//Anadir prefijos a rutas

// Ruta o medoto de prueba para el API REST



app.get('/probando', (req, res)=>{
    return res.status(200).send({
        
        curso: 'Frameworks Master',
        autor: 'Daniel Galvan',
        profesion: 'Ingeniero'
    }
    )
});

//Exportar el modulo (fichero actual)

module.exports = app;