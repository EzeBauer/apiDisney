const db = require('../database/models');
const sgMail = require("@sendgrid/mail");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




module.exports = {
  register: async (req, res) => {
    const errors = validationResult(req);
    try {
      if (errors.isEmpty()) {
        const user = await db.User.create({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password)
        });
        console.log(user);

       

        //Generar token
        //datos de usuario
        const userToken={
          id:user.id,
          email:user.email,
        }
        //Firma digital
        const token = jwt.sign(userToken, process.env.SECRETKEY, { //PALABRA SECRETA GUARDAD EN VARIABLE DE ENTORNO
          expiresIn: "10h",
        });
        //Fin generar token

        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: user.email, // Change to your recipient
          from: "bauereze@gmail.com", // Change to your verified sender
          subject: "Bienvenido a la apiDIsney",
          text: "",
          html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });

        return res.status(201).json({
          status: 201,
          msg: 'Usuario creado satisfactoriamente!. Verifique su email :)',
          token
        });
      } else {
        return res.status(400).json({
          status: 400,
          msg: 'Hubo un error al crear el usuario',
          errores: errors.mapped()
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const user = await db.User.findOne({
          where: { email: req.body.email }
        });

        const userForToken = {
          id: user.id,
          email: user.email
        };

        const token = jwt.sign(userForToken, process.env.SECRETKEY, {
          expiresIn: '10h'
        });

        res.status(200).json({
          status: 200,
          msg: `Inserte este token en la pestaña Authorization > Bearer Token`,
          token
        });
      } catch (error) {
        console.log(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(400).json({
        status: 400,
        errors: errors.mapped(),
        msg: 'credenciales invalidas'
      });
    }
  }
};
