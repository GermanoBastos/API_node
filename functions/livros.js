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

exports.handler = async (event) => {
  const { httpMethod, path, queryStringParameters, body } = event;

  if (httpMethod === "GET") {
    if (path === "/livros") {
      const todosLivros = getTodosLivros();
      return {
        statusCode: 200,
        body: JSON.stringify(todosLivros),
      };
    } else if (path.startsWith("/livros/")) {
      const livroId = path.split("/")[2];
      const livro = getLivroPorId(livroId);
      if (livro) {
        return {
          statusCode: 200,
          body: JSON.stringify(livro),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Livro não encontrado" }),
        };
      }
    }
  } else if (httpMethod === "POST") {
    if (path === "/livros") {
      const novoLivro = JSON.parse(body);
      insereLivro(novoLivro);
      return {
        statusCode: 201,
        body: JSON.stringify({ message: "Livro inserido com sucesso" }),
      };
    }
  } else if (httpMethod === "PUT") {
    if (path.startsWith("/livros/")) {
      const livroId = path.split("/")[2];
      const livroAtualizado = JSON.parse(body);
      atualizaLivro(livroId, livroAtualizado);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Livro atualizado com sucesso" }),
      };
    }
  } else if (httpMethod === "DELETE") {
    if (path.startsWith("/livros/")) {
      const livroId = path.split("/")[2];
      removeLivro(livroId);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Livro removido com sucesso" }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Requisição inválida" }),
  };
};
