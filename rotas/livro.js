const { Router } = require("express");
const {
  getLivros,
  getLivro,
  postLivro,
  updateLivro,
  deleteLivro,
} = require("../controller/livro");
const router = Router();

router.get("/", getLivros);
router.get("/:id", getLivro);
router.post("/", postLivro);
router.put("/:id", updateLivro); // Rota para atualizar um livro
router.delete("/:id", deleteLivro); // Rota para excluir um livro

module.exports = router;
