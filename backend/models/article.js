'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ArtcleSchema = Schema({

    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String

});

module.export = mongoose.nodel('Article', ArtcleSchema);
// crea una colecion articles y guarda documentos de este tipo y conesta eestrcutura dentro de la coleccion
