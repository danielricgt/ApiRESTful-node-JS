'use strict'

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
}
}; //end controller

module.exports =  controller;