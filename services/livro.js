const fetch = require("node-fetch");

async function getTodosLivros() {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  return data;
}

async function getLivroPorId(id) {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  const livroFiltrado = data.find((livro) => livro.id == id);
  return livroFiltrado;
}

async function getNextLivroId() {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  const lastLivro = data[data.length - 1];
  return lastLivro ? lastLivro.id + 1 : 1;
}

async function insereLivro(livroNovo) {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  const novoLivro = {
    id: await getNextLivroId(),
    nome: livroNovo.nome,
    autor: livroNovo.autor,
    revenda: livroNovo.revenda,
  };
  const novaListaDeLivros = [...data, novoLivro];

  await fetch("https://lucky-cassata-576e99.netlify.app/livros.json", {
    method: "PUT",
    body: JSON.stringify(novaListaDeLivros),
  });
}

async function atualizaLivro(id, livroAtualizado) {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  const livroIndex = data.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    data[livroIndex] = { ...data[livroIndex], ...livroAtualizado };
    await fetch("https://lucky-cassata-576e99.netlify.app/livros.json", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } else {
    throw new Error("Livro não encontrado");
  }
}

async function removeLivro(id) {
  const response = await fetch("https://lucky-cassata-576e99.netlify.app/livros.json");
  const data = await response.json();
  const livroIndex = data.findIndex((livro) => livro.id == id);

  if (livroIndex !== -1) {
    data.splice(livroIndex, 1);
    await fetch("https://lucky-cassata-576e99.netlify.app/livros.json", {
      method: "PUT",
      body: JSON.stringify(data),
    });
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
