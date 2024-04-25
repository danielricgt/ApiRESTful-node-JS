'use strict'

var validator = require('validator');
var Article = require ('../models/article')
var controller = {

    datosCurso:  (req, res)=>{
        var hola = req.body.hola;
        return res.status(200).send({
    
            
            
            curso: 'Frameworks Master',
            autor: 'Daniel Galvan',
            profesion: 'Ingeniero',
            hola
        });
},
 
test:(req, res) => {

    

    return res.status(200).send({
        message: 'soy la accion trst de mi controlador de articulos'
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
        message: 'faltan datos por enviar'
    });
    }

    if (validate_title && validate_content) {
        return res.status(200).send({

            message:'validacion correcta'
        });
    }else{
        return res.status(200).send({
            message: 'datos no validos'
        });
     
    }

   

}

}; //end controller

module.exports =  controller;