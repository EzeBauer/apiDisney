const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
 
  body("email").custom((value) => {
    return db.User.findOne({ where: { email: value } })
    .then((user) => {
      if (user) {
        return Promise.reject(
          "El email ingresado ya está en uso. Iniciá sesión!"
        );
      }
    });
  }),
  check("password")
    .notEmpty()
    .withMessage("Debe ingresar una contraseña")
    .isStrongPassword()
    .withMessage(
      "La contraseña debe tener como minimo 8 caracteres, una letra minuscula, una mayuscula, un numero y almenos 1 simbolo"
    ) 
    
  
];
