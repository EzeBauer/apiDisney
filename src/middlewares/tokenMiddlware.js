const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  try {
    /* Obtiene el valor de la propiedad authorization */
    const authorization = req.get("authorization");
    if (!authorization) {
       return res
         .status(401)
         .json({ error: "Falta token de autenticación o es invalido" });
    }
    //Separa bearer de el token
    let token = authorization.split(" ")[1];
     console.log(token);
    //jwt.verfiy decodificará internamente el token y comparará si el token contiene la palabra secreta.
    //token guardará el nuevo valor que son los datos del usuario y se podrá usar para hacer validaciones.
    token = jwt.verify(token, process.env.SECRETKEY);
    console.log(token);
    //Aca verificamos si los datos que se guardaban en el token contiene la propiedad id del usuario.
    if (!token.id) {
     let respuesta = {
         status: 401,
         error: "Falta token de autenticación o es invalido",
                 
       }
        return res.status(401).json(respuesta);
      }

    //si se cumplen las condiciones anteriores se seguirá con el pedido.
    next();
  } catch {
    //sino un error.
    console.log(error);
  }
};
module.exports={ tokenVerify};
