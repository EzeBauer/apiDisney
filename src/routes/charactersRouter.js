const express = require("express");
const router = express.Router();

const {
  list,
  detail,
  search,
  create,
  edit,
  destroy,
} = require("../controllers/characterController");
const upload = require("../middlewares/multerCharacters");
 const validCharacters = require("../validations/CharacterValidator");


/* /characters */
router
.get("/", list)
.get("/search", search)
.get("/:id", detail)


.post("/create", upload.single("image"), validCharacters, create)
.put("/:id", upload.single("image"), validCharacters, edit)
.delete("/delete/:id", destroy);

module.exports = router;
