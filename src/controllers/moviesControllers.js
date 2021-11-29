const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const getURLBase = (req) => `${req.protocol}://${req.get("host")}/movies`;
const fs = require("fs");

module.exports = {
   //MOVIES LIST
  list: (req, res) => {
  
    try {
      db.Movie.findAll({
        attributes: ["id", "title", "image", "releaseDate"],
        include: [
          { association: "genre", attributes: ["id", "name", "image"] },
        ]
        }).then((data) => {
        console.log(data);
        let respuesta = {
          status: 200,
          length: data.length,
          url: getURLBase(req),
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
 

  //SEARCH MOVIES BY PARAMETERS
  search: (req, res) => {
    let movies = db.Movie.findAll({
      include: [{ association: "genre", attributes: ["id", "name", "image"] }],

      where: {
        title: { [Op.substring]: req.query.title },
      },
      /*  order: [["title", req.query.order ? req.query.order : "ASC"]], */
      attributes: ["id", "title", "image", "createdAt", "genreId"],
    });
       let genres = db.Genre.findAll({
      include: [{ association: "movies" }],
      where: {
        name: { [Op.substring]: req.query.genre },
      },
    });
 
   
    Promise.all([movies, genres])
      .then(([movies, genres]) => {
              
        return res.status(200).json({
          status: 200,
          total:
            movies.length || genres.length
              ? movies.length || genres.length
              : "No hay peliculas que mostrar",
            
          movies,
          genres,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(500);
      });
  },

  //MOVIE DETAIL
  detail: (req, res) => {
    try {
      db.Movie.findByPk(req.params.id, {
        include: [
          { association: "characters", attributes: ["id", "image", "name"] },
          { association: "genre", attributes: ["id", "name", "image"] },
        ],
      })
        .then((movie) => {
          let respuesta = {
            status: 200,
            url: getURLBase(req) + `/${movie.id}`,
            data: movie,
          };
          res.status(200).json(respuesta);
        })
        .catch((e) => {
          let errorBD = {
            status: 404,
            msg: "Recurso no encontrado",
          };
          res.status(404).json(errorBD);
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //CRUD

  //CREATE
  create: (req, res) => {
    const { title, releaseDate, rating, genreId } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        db.Movie.create({
          title,
          image: req.file.filename,
          releaseDate,
          rating,
          genreId,
        }).then(() => {
          let respuesta = {
            status: 201,
            msg: "Recurso creado con éxito",
          };
          res.status(201).json(respuesta);
        });
      } catch (error) {
        console.log(err);
        return res.status(500).json(err);
      }
    } else {
      if (req.file) {
        let imgABorrar = path.join(
          __dirname,
          "../images/movies/" + req.file.filename
        );
        console.log(imgABorrar);
        fs.unlinkSync(imgABorrar);
      }
      let error = {
        status: 400,
        msg: "Error en uno o más campos del form",
        errores: errores.mapped(),
      };
      res.status(400).json(error);
    }
  },

  //UPDATE
  update: async (req, res) => {
    try {
      console.log("llego aqui try");

      let movie = await db.Movie.findByPk(+req.params.id).then(
        (movie) => movie.dataValues
      );
      console.log(movie);
      let errores = validationResult(req);
      if (errores.isEmpty()) {
        if (req.file) {
          let imgABorrar = path.join(
            __dirname,
            "../images/movies/" + movie.image
          );
          fs.unlinkSync(imgABorrar);
        }
        let { title, rating, releaseDate } = req.body;

        db.Movie.update(
          {
            title: title ? title : movie.title,
            image: req.file ? req.file.filename : movie.image,
            rating: rating ? rating : movie.rating,
            releaseDate: releaseDate ? releaseDate : movie.releaseDate,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        )
          .then(() => {
            let respuesta = {
              status: 200,
              url: getURLBase(req) + `edit/${req.params.id}`,
              msg: "Recurso actualizado con éxito",
            };
            res.status(200).json(respuesta);
          })
          .catch((e) => {
            let respuesta = {
              status: 404,
              msg: "Recurso no encontrado",
            };
            res.status(404).json(respuesta);
          });
      } else {
        if (req.file) {
          let imgABorrar = path.join(
            __dirname,
            "../images/movies/" + req.file.filename
          );
          fs.unlinkSync(imgABorrar);
        }
        let error = {
          status: 400,
          msg: "Error en uno o más campos del form",
          errores: errores.mapped(),
        };
        res.status(400).json(error);
      }
    } catch (err) {
      let error = {
        status: 500,
        msg: "Recurso no encontrado",
      };
      res.status(500).json(error);
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
      let movie= await db.Movie.findByPk(+req.params.id)
      .then((movie) => {
        console.log(movie.image);
          /*  if (movie.image!== null) {
             let imgABorrar = path.join(
               __dirname,
               `../images/movies/${movie.image}`
             );
             
             fs.unlinkSync(imgABorrar);
           } */
          
           movie.destroy();
    
          let respuesta = {
            status: 200,
            msg: "Pelicula eliminada con éxito",
          };
          return res.status(200).json(respuesta);
        })
        .catch((e) => {
          let error = {
            status: 404,
            msg: "Pelicula no encontrado",
          };
          res.status(500).json(error);
        });
    } catch (err) {
      let error = {
        status: 500,
        msg: "Error interno del servidor",
      };
      res.status(500).json(error);
    }
  },
    
  //CRUD FINISH

  //ASSOCIATE MOVIES OR CHARACTERS
  associate: (req, res) => {
    const { characterId, movieId } = req.body;
    db.characterMovie
      .create({
        characterId: +characterId,
        movieId: +movieId,
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({
          status: 200,
          msg: "Pelicula y personaje asociados!",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
