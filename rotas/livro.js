const { Router } = require("express");
const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  removeLivro,
} = require("../services/livro");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const livros = await getTodosLivros();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter todos os livros" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await getLivroPorId(id);
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ error: "Livro não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter o livro" });
  }
});

router.post("/", async (req, res) => {
  const livroNovo = req.body;
  try {
    const novoLivro = await insereLivro(livroNovo);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir o livro" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const livroAtualizado = req.body;
  try {
    await atualizaLivro(id, livroAtualizado);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o livro" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await removeLivro(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover o livro" });
  }
});

module.exports = router;
