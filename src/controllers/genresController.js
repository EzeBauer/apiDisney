const db = require("../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  list: (req, res) => {
    db.Genre.findAll()
      .then((genres) => {
        res.status(200).json({
          status: 200,
          total: genres.length,
          data: genres,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  detail: (req, res) => {
      try {
        db.Genre.findByPk(+req.params.id, {
          include: [{ association: "movies" }],
          attributes: ["id", "name", "image"],
        })
          .then((data) => {
            let respuesta = {
              status: 200,
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
          });
      } catch (error) {
        let errorBD = {
          status: 500,
          msg: "Problema interno del servidor",
        };
        res.status(404).json(errorBD);
      }

  },
  create: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Genre.create({
        name: req.body.name,
        image: req.file ? req.file.filename : null,
      })
        .then(() => {
          res.status(201).json({
            status: 201,
            msg: "Genero creado satisfactoriamente!.",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear el genero",
        errores: errors.mapped(),
      });
    }
  },

  update:  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Genre.findByPk(req.params.id)
        .then((genre) => {
          db.Genre.update(
            {
              name: req.body ? req.body.name : genre.name,
              image: req.file ? req.file.filename : genre.image,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(201).json({
                status: 201,
                msg: "Genero actualizado satisfactoriamente!.",
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al crear el genero",
        errores: errors.mapped(),
      });
    }
  },
  delete: (req, res) => {
    db.Genre.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(201).json({
          status: 201,
          msg: "Genero eliminado satisfactoriamente!.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
