var express = require("express");
var router = express.Router();
const upload=require("../middlewares/multerGenresConfig")

//Controllers
const genresController = require("../controllers/genresController");

//Validations
const genresValidator = require("../validations/genresValidator");

//ruta: /genres

router.get("/", genresController.list);

router.get("/:id", genresController.detail);

router.post("/",upload.single("image"),genresValidator,genresController.create);

router.put("/:id",upload.single("image"), genresValidator,genresController.update);

router.delete("/:id", genresController.delete);

module.exports = router;
