const fs = require("fs");

function getTodosLivros() {
  return JSON.parse(fs.readFileSync("livros.json"));
}

function getLivroPorId(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroFiltrado = livros.find((livro) => livro.id == id);
  return livroFiltrado;
}

function getNextLivroId() {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const lastLivro = livros[livros.length - 1];
  return lastLivro ? lastLivro.id + 1 : 1;
}

function insereLivro(livroNovo) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const novoLivro = {
    id: getNextLivroId(),
    nome: livroNovo.nome,
    autor: livroNovo.autor,
    revenda: livroNovo.revenda,
  };
  const novaListaDeLivros = [...livros, novoLivro];

  fs.writeFileSync("livros.json", JSON.stringify(novaListaDeLivros));
}

function atualizaLivro(id, livroAtualizado) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroIndex = livros.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    livros[livroIndex] = { ...livros[livroIndex], ...livroAtualizado };
    fs.writeFileSync("livros.json", JSON.stringify(livros));
  } else {
    throw new Error("Livro não encontrado");
  }
}

function removeLivro(id) {
  const livros = JSON.parse(fs.readFileSync("livros.json"));
  const livroIndex = livros.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    livros.splice(livroIndex, 1);
    fs.writeFileSync("livros.json", JSON.stringify(livros));
  } else {
    throw new Error("Livro não encontrado");
  }
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  removeLivro,
};
