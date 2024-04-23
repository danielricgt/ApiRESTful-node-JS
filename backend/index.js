'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;



mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://daniel2024:daniel2024@cluster0.nh3mih2.mongodb.net/')
.then(()=> {
    console.log('conexion realizada exitosamente a la BD');
    // crear servidor y ponerme a escuchar peticiones http
    app.listen(port, () => {
        console.log('servidor corriendo en http://localhost:'+port);
    })
});