const path = require('path');
const db = require('../database/models');
/* const sequelize = db.sequelize; */
const { Op, DataTypes } = require("sequelize");
/* const moment = require('moment'); */
const { validationResult } = require("express-validator");
const getURLBase = (req) => `${req.protocol}://${req.get("host")}/characters/`;
const fs = require("fs");
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
module.exports = {
/*   list: (req, res) => {
    db.Character.findAll({
      attributes: ["id", "name", "image"],
    })
      .then((data) => {
      
        let respuesta = {
          status: 200,
          total: data.length,
          data: data,
        };
        
        res.status(200).json(respuesta);
      })
      .catch((err) => {
        console.log(err), res.status(500).json(err);
      });
  },
 */
  
  list: (req, res) => {
    console.log(req.query);
    let query;
    if (req.query.name) {
        query = "name"
    } else if (req.query.age) {
        query = "age"
    } else if (req.query.weight) {
        query = "weight"
    } else {
        query = "name"
    }


    try {
        db.Character.findAll({
            attributes: ["id", "name", "image", "history", "age"],
            where: {
                name: {
                    [Op.substring]: req.query.name ? req.query.name : "",
                },
                age: {
                    [Op.substring]: req.query.age ? req.query.age : "",
                },
                weight: {
                    [Op.substring]: req.query.weight ? req.query.weight : "",
                },
            },
            include: req.query && req.query.name || req.query.age || req.query.weight ? [
                { association: "movies", attributes: ["id", "title", "image"] }
            ] : null,
            order: [
                [query, req.query.order && req.query.order.toUpperCase() !== "ASC" ? req.query.order : "ASC"]
            ]
        }).then((data) => {
            let respuesta = {
                status: 200,
                length: data.length,
                data: data,
          
            };
            res.status(200).json(respuesta);
        });
    } catch (error) {
        let errorBD = {
            status: 500,
            msg: "Error Interno del Servidor",
        };
        res.status(500).json(errorBD);
    }
},


  detail: (req, res) => {
    db.Character.findByPk(req.params.id, {
      include: [
        { association: "movies", attributes: ["id", "title", "image"] },
      ],
    })
      .then((data) => {
      
        let respuesta = {
          status: 200,
          url: getURLBase(req) +`${data.id}`,
          length: data.length,
          data: data,
        };
        res.status(200).json(respuesta);
      })
          
      .catch((e) => {
        let errorBD = {
          status: 404,
          msg: "Recurso no encontrado",
        };
        res.status(404).json(errorBD);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //FILTERS
  /* search: async (req, res) => {
    console.log(req.query);
    try {
     let actor= await db.Character.findAll({
      
        where: {
          [Op.or]:[
         {
          age: { [Op.substring]: req.query.age}
         },
         {
          name: { [Op.substring]: req.query.name}
        },
        {
          weight: { [Op.substring]: req.query.weight}
        }
      ]
    },
        attributes: ["id", "name", "image", "age"],
      })
      let respuesta = {
        status: 200,
        length: actor.length,
        data: actor,
      };
      
      return res.status(200).json(respuesta);
    
    } catch (err) {
      
      console.log(err);
        return res.status(500).json(err);
    }
   
        
  }, */

  create: (req, res) => {
     let errores = validationResult(req); 
     if (errores.isEmpty())  {
    const { name, age, weight, history } = req.body; 
    console.log(req.body);

      try {
     db.Character.create({
          name: name, 
          image: req.file ? req.file.filename : null,
        age: +age,
        weight: +weight,
        history: history,
        }).then((actor) => {
        
          let respuesta = {
            status: 201,
            msg: "Personaje creado con ??xito!",
            data:actor

          };
          res.status(201).json(respuesta);
        });
      } catch(err) {
        console.log(err);
        return res.status(500).json(err);
      };
      
    } else {
      if (req.file) {
        //Borro la imagen
        let imgABorrar = path.join(
          __dirname,
          "../images/characters/" + req.file.filename
        );
        fs.unlinkSync(imgABorrar);
      }
      let error = {
        status: 400,
        msg: "Error en uno o m??s campos del formulario",
        errores: errores.mapped(),
      };
      res.status(400).json(error);
    } 
  },
  edit: async (req, res) => {
     try {
      let character = await  db.Character.findByPk(+req.params.id)
   
       .then((character) => {
      let errores = validationResult(req);
      if (errores.isEmpty()) {
        let { name, age, weight, history } = req.body;

        db.Character.update(
          {
            name: name ? name : character.name,
            image: req.file ? req.file.filename : character.image,
            age: age ? age : character.age,
            weight: weight ? weight : character.weight,
            history: history ? history : character.history,

          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then(() => {
          let respuesta = {
            status: 200,
            url: getURLBase(req) + `edit/${req.params.id}`,
            msg: "Recurso actualizado con ??xito",
          };
          res.status(200).json(respuesta);
        });
      } else {
        if (req.file) {
          let imgABorrar = path.join(
            __dirname,
            "../images/characters/" + req.file.filename
          );
          fs.unlinkSync(imgABorrar);
        }
        let error = {
          status: 400,
          msg: "Error en uno o m??s campos del form",
          errores: errores.mapped(),
        };
        res.status(400).json(error);
      }
    })} catch(err) {
        console.log(err);
        return res.status(500).json(err);
      };
  },
  destroy:  async  (req, res) => {
     try {
      let character = await db.Character.findByPk(+req.params.id)
      
        .then((character) => {
          if (character.image!==null) {
            let imgABorrar = path.join(
              __dirname,
              `../images/characters/${character.image}`
            );
            console.log(imgABorrar);
            fs.unlinkSync(imgABorrar);
          }
          character.destroy()
          let respuesta = {
            status: 200,
            msg: "Personaje eliminado con ??xito!",
          };
         return res.status(200).json(respuesta);
        })}
        catch(err){
          console.log(err);
          return res.json(err);
        }
   
    
  },

 
};

