const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
  list: (req, res) => {
    db.User.findAll({ attributes: ["id", "email"] })
      .then((users) => {
        users.forEach((user) => {
          user.dataValues.detail = `${req.protocol}://${req.get(
            "host"
          )}/users/${user.id}`;
        });
        return res.status(200).json({
          status: 200,
          total: users.length,
          data: users,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  detail: (req, res) => {
    db.User.findByPk(req.params.id, { attributes: ["id", "email"] })
      .then((user) => {
        return res.status(200).json({
          status: 200,
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  update: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      
      db.User.findByPk(req.params.id)
        .then((user) => {
          console.log(user);
          db.User.update(
            {
              
              email: req.body.email ? req.body.email : user.email,
              password: req.body.password? bcrypt.hashSync(req.body.password.trim(),10): user.password,
            },
            { where: {id: req.params.id } }
          )
            .then((user) => {
              console.log(user);
              return res.status(201).json({
                status: 200,
                msg: "Usuario actualizado satisfactoriamente!",
                data:user
              });
            })
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json();
        });
    } else {
      return res.status(400).json({
        status: 400,
        msg: "Hubo un error al actualizar los datos del usuario",
        errores: errors.mapped(),
      });
    }
  },

  delete: (req, res) => {
    db.User.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200).json({
          status: 200,
          msg: "Usuario eliminado satisfactoriamente!.",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },
};
