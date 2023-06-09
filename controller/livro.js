const {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  removeLivro,
} = require("../services/livro");

function getLivros(req, res) {
  try {
    const livros = getTodosLivros();
    res.send(livros);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function getLivro(req, res) {
  try {
    const id = req.params.id;
    const livro = getLivroPorId(id);
    res.send(livro);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function postLivro(req, res) {
  try {
    const livroNovo = req.body;
    insereLivro(livroNovo);
    res.status(201);
    res.send("Livro inserido");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function updateLivro(req, res) {
  try {
    const id = req.params.id;
    const livroAtualizado = req.body;
    atualizaLivro(id, livroAtualizado);
    res.send("Livro atualizado");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

function deleteLivro(req, res) {
  try {
    const id = req.params.id;
    removeLivro(id);
    res.send("Livro removido");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivro,
  updateLivro,
  deleteLivro,
};
