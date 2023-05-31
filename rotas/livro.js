const { Router } = require("express");
const { getLivros,getLivro, postLivro } = require("../controller/livro");
const router = Router();

router.get("/", getLivros);

router.get("/:id", getLivro);

router.post("/", postLivro);
router.delete("/", (req, res) => {
  res.send("Ola, esse é o método DELETE!");
});

module.exports = router;
