'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;



mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/pruebas1')
.then(()=> {
    console.log('conexion realizada exitosamente a la BD');
    // crear servidor y ponerme a escuchar peticiones http
    app.listen(port, () => {
        console.log('servidor corriendo en http://localhost:'+port);
    })
});