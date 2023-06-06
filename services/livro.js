const fs = require("fs");
const path = require("path");

function getTodosLivros() {
  const filePath = path.join(__dirname, "../livros.json");
  const dados = fs.readFileSync(filePath);
  return JSON.parse(dados);
}

function getLivroPorId(id) {
  const filePath = path.join(__dirname, "../livros.json");
  const livros = JSON.parse(fs.readFileSync(filePath));
  const livroFiltrado = livros.find((livro) => livro.id == id);
  return livroFiltrado;
}

function getNextLivroId() {
  const filePath = path.join(__dirname, "../livros.json");
  const livros = JSON.parse(fs.readFileSync(filePath));
  const lastLivro = livros[livros.length - 1];
  return lastLivro ? lastLivro.id + 1 : 1;
}

function insereLivro(livroNovo) {
  const filePath = path.join(__dirname, "../livros.json");
  const livros = JSON.parse(fs.readFileSync(filePath));
  const novoLivro = {
    id: getNextLivroId(),
    nome: livroNovo.nome,
    autor: livroNovo.autor,
    revenda: livroNovo.revenda,
  };
  const novaListaDeLivros = [...livros, novoLivro];

  fs.writeFileSync(filePath, JSON.stringify(novaListaDeLivros));
}

function atualizaLivro(id, livroAtualizado) {
  const filePath = path.join(__dirname, "../livros.json");
  const livros = JSON.parse(fs.readFileSync(filePath));
  const livroIndex = livros.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    livros[livroIndex] = { ...livros[livroIndex], ...livroAtualizado };
    fs.writeFileSync(filePath, JSON.stringify(livros));
  } else {
    throw new Error("Livro não encontrado");
  }
}

function removeLivro(id) {
  const filePath = path.join(__dirname, "../livros.json");
  const livros = JSON.parse(fs.readFileSync(filePath));
  const livroIndex = livros.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    livros.splice(livroIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(livros));
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
