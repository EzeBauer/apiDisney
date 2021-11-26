const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  try {
    /* Obtiene el valor de la propiedad authorization */
    const authorization = req.get("authorization");
    if (!authorization) {
      console.log(error);
    }
    //Separa bearer de el token
    let token = authorization.split(" ")[1];

    //jwt.verfiy decodificará internamente el token y comparará si el token contiene la palabra secreta.
    //token guardará el nuevo valor que son los datos del usuario y se podrá usar para hacer validaciones.
    token = jwt.verify(token, process.env.SECRET);

    //Aca verificamos si los datos que se guardaban en el token contiene la propiedad id del usuario.
    if (!token.id) {
      return res
        .status(401)
        .json({ error: "Falta token de autenticación o es invalido" });
    }

    //si se cumplen las condiciones anteriores se seguirá con el pedido.
    next();
  } catch {
    //sino un error.
    console.log(error);
  }
};
module.exports = { tokenVerify };
