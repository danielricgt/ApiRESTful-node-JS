"use strict";

var validator = require("validator");
var Article = require("../models/article");
const article = require("../models/article");
var fs = require("fs");
var path = require("path");

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

    if (last || last != undefined) {
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

  getArticle: (req, res) => {
    // recoger el id de la url

    var articleId = req.params.id;

    // comprobar que existe

    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No exsite el  articulo",
      });
    }

    //buscar el articule

    Article.findById(articleId)
      .then((article) => {
        if (!article) {
          return res.status(404).send({
            status: "error",
            message: "No exsite el  articulo",
          });
        }

        // devolverlo en json
        return res.status(200).send({
          status: "sucess",
          message: article,
        });
      })
      .catch(() => {
        return res.status(500).send({
          status: "error",
          message: "ha ocurrido un error",
        });
      });
  },

  update: (req, res) => {
    // recoger el id del articulo  por la url

    let articleId = req.params.id;

    // recoger los datos que llegan porput

    let params = req.body;

    // validar datos

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
      // find and update
      Article.findOneAndUpdate({ _id: articleId }, params, { new: true })
        .then((articleUpdated) => {
          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "No existe el articulo!!!",
            });
          }
          return res.status(200).send({
            status: "sucess",
            article: articleUpdated,
          });
        })
        .catch(() => {
          return res.status(500).send({
            status: "error",
            message: " Error al actualizar",
          });
        });
    } else {
      return res.status(200).send({
        status: "error",
        message: "La validacion no es correcta",
      });
    }
  },

  delete: (req, res) => {
    // recoger el id de la url
    var articleId = req.params.id;

    // find and delete
    Article.findOneAndDelete({ _id: articleId })
      .then((articleRemoved) => {
        if (!articleRemoved) {
          return res.status(200).send({
            status: "error",
            message: "El articulo no existe",
          });
        }

        return res.status(200).send({
          status: "success",
          message: articleRemoved,
        });
      })
      .catch(() => {
        return res.status(404).send({
          status: "error",
          message: "La validacion no es correcta",
        });
      });
  },

  upload: (req, res) => {
    // configurar el modulo connect multiparty router/article.js
    // recoger el fichero de la peticion

    var file_name = "imagen no subida..";

    if (!req.files) {
      return res.status(404).send({
        status: "error",
        message: file_name,
      });
    }

    // conseguir el nombre y la extension del archivo
    var file_path = req.files.file0.path;
    var file_split = file_path.split("/");

    // NOMBRE DEL ARCHIVO

    var file_name = file_split[2];

    // comprobar la extension y borrrar el fichero
    var extension_split = file_name.split(".");
    var file_ext = extension_split[1];

    if (
      file_ext != "png" &&
      file_ext != "jpg" &&
      file_ext != "jpeg" &&
      file_ext != "gif"
    ) {
      fs.unlink(file_path, (err) => {
        return res.status(404).send({
          status: "error",
          message: "La extension de la img no es valida ",
        });
      });
    } else {
      // BUSCAR EL ARTICULO, ASIGNARLE EL NOMBRE DE LA IMG Y ACTUALIZARLO
      var articleIds = req.params.id;
      // buscar el art asignar el nombre de la img y actualizarlo
      Article.findOneAndUpdate(
        { _id: articleIds },
        { image: file_name },
        { new: true }
      )
        .then((articleUpdated) => {
          if (!articleUpdated) {
            return res.status(200).send({
              status: "error",
              message: "error al guardar la img del articulo ",
            });
          }

          return res.status(200).send({
            status: "sucess",
            message: articleUpdated,
          });
        })
        .catch(() => {
          return res.status(404).send({
            status: "error",
            message: "La extension de la img no es valida ",
          });
        });
    }
  }, // end upload file

  getImage: (req, res) => {
    var file = req.params.image;
    var path_file = "./upload/articles/" + file;

    fs.exists(path_file, (exist) => {
      if (exist) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(404).send({
          status: "error",
          message: "la img no existe",
        });
      }
    });
  },


  search: (req, res) =>{

    // sacar el string a buscar
    var searchString = req.params.search;

    // find or
Article.find({ "$or" :[
  { "title": { "$regex":searchString, "$options": "i"}},
  { "content": {"$regex":searchString, "$options": "i"}}
]})
.sort([['date', 'descending']])
.exec().then((articles)=>{

  if (!articles || articles.length <= 0 ) {
    return res.status(404).send({
      status: "error",
      message: "No hay articulos que coincidan con tu busqueda",
    });
  }
  return res.status(200).send({
    status: "success",
    articles,
  });

})
.catch(() => {
  return res.status(500).send({
    status: "error",
    message: "Error en la peticion ",
  });
});
  }
}; //end controller

module.exports = controller;
