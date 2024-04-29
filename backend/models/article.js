'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({

    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String

});

module.exports = mongoose.model('Article', ArticleSchema);
// articles --> crea una colecion articles y guarda documentos de este tipo y conesta eestrcutura dentro de la coleccion
