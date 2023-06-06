const axios = require('axios');

const baseUrl = 'https://jsserver.germanobastos1.repl.co';

async function getTodosLivros() {
  try {
    const response = await axios.get(`${baseUrl}/dados`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao obter todos os livros');
  }
}

async function getLivroPorId(id) {
  try {
    const response = await axios.get(`${baseUrl}/dados/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Erro ao obter o livro com o ID ${id}`);
  }
}

async function insereLivro(livroNovo) {
  try {
    const response = await axios.post(`${baseUrl}/dados`, livroNovo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao inserir o livro');
  }
}

async function atualizaLivro(id, livroAtualizado) {
  try {
    const response = await axios.put(`${baseUrl}/dados/${id}`, livroAtualizado);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Erro ao atualizar o livro com o ID ${id}`);
  }
}

async function removeLivro(id) {
  try {
    await axios.delete(`${baseUrl}/dados/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Erro ao remover o livro com o ID ${id}`);
  }
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  atualizaLivro,
  removeLivro,
};
