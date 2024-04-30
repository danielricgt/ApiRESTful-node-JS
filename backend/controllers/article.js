"use strict";

var validator = require("validator");
var Article = require("../models/article");
var controller = {
  datosCurso: (req, res) => {
    let hola = req.body.hola;
    return res.status(200).send({
      curso: "Frameworks Master",
      autor: "Daniel Galvan",
      profesion: "Ingeniero",
      hola,
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      message: "soy la accion trst de mi controlador de articulos",
    });
  },

  save: (req, res) => {
    //recoger los parametros por post
    var params = req.body;

    //validar datos (validator)

    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(200).send({
        status: "error",
        message: "faltan datos por enviar",
      });
    }

    if (validate_title && validate_content) {
      //         //crear el objeto a guardar

      var article = new Article();

      //         // Asignar valores

      article.title = params.title;
      article.content = params.content;
      article.image = null;

      // //     // Guardar el articulo
      article
        .save()
        .then((articleStored) => {
          if (!articleStored) {
            return res.status(404).send({
              status: "error",
              message: "el articulo no se ha guardado",
            });
          }
          //devolver una respuesta
          return res.status(200).send({
            status: "success",
            article: articleStored,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: "ha ocurrido un error",
          });
        });
    } else {
      return res.status(200).send({
        status: "error",
        message: "datos no validos",
      });
    }
  },

  getArticles: (req, res) => {

    var query = Article.find({});
    var last = req.params.last;
    console.log(last);

    if (last || last !=undefined) {
      query.limit(5);
    }
 
    //find
    query
      .sort("-_id")
      .exec()
      .then((articles) => {
        if (!articles) {
          return res.status(404).send({
            status: "error",
            message: "No hay articulos",
          });
        }

        return res.status(200).send({
          status: "sucess",
          articles,
        });
      });
  },
}; //end controller

module.exports = controller;
