document.addEventListener('DOMContentLoaded', function() {
  // Inicialização do Materialize
  M.AutoInit();

  // Elementos do DOM
  const livrosTableBody = document.getElementById('livrosTableBody');
  const livroNomeInput = document.getElementById('nome');
  const livroAutorInput = document.getElementById('autor');
  const livroRevendaInput = document.getElementById('revenda');
  const livroNomeEditarInput = document.getElementById('livroNomeEditar');
  const livroIdEditarInput = document.getElementById('livroIdEditar');
  const livroAutorEditarInput = document.getElementById('livroAutorEditar');
  const livroRevendaEditarInput = document.getElementById('livroRevendaEditar');

  // Função para exibir os livros na tabela
  function exibirLivros(livros) {
    livrosTableBody.innerHTML = '';

    livros.forEach(livro => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${livro.id}</td>
        <td>${livro.nome}</td>
        <td>${livro.autor}</td>
        <td>${livro.revenda}</td>
        <td>
          <a href="#modalEditarLivro" class="editar-livro modal-trigger" data-id="${livro.id}" data-nome="${livro.nome}" data-autor="${livro.autor}" data-revenda="${livro.revenda}">
            <i class="material-icons">edit</i>
          </a>
          <a href="#!" class="excluir-livro" data-id="${livro.id}">
            <i class="material-icons">delete</i>
          </a>
        </td>
      `;
      livrosTableBody.appendChild(row);
    });

    // Adicionar eventos aos botões de editar e excluir
    const editarLivroButtons = document.getElementsByClassName('editar-livro');
    const excluirLivroButtons = document.getElementsByClassName('excluir-livro');

    Array.from(editarLivroButtons).forEach(button => {
      button.addEventListener('click', function() {
        const id = button.getAttribute('data-id');
        const nome = button.getAttribute('data-nome');
        const autor = button.getAttribute('data-autor');
        const revenda = button.getAttribute('data-revenda');

        livroIdEditarInput.value = id;
        livroNomeEditarInput.value = nome;
        livroAutorEditarInput.value = autor;
        livroRevendaEditarInput.value = revenda;
      });
    });

    Array.from(excluirLivroButtons).forEach(button => {
      button.addEventListener('click', function() {
        const id = button.getAttribute('data-id');
        excluirLivro(id);
      });
    });
  }

  // Função para buscar todos os livros
  function getLivros() {
    fetch('/livros')
      .then(response => response.json())
      .then(data => {
        exibirLivros(data);
      })
      .catch(error => {
        console.error('Erro ao buscar os livros:', error);
      });
  }

  // Função para adicionar um livro
  function adicionarLivro() {
    const nome = livroNomeInput.value;
    const autor = livroAutorInput.value;
    const revenda = livroRevendaInput.value;

    fetch('/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, autor, revenda })
    })
      .then(response => {
        if (response.ok) {
          M.toast({ html: 'Livro adicionado com sucesso!' });
          livroNomeInput.value = '';
          livroAutorInput.value = '';
          livroRevendaInput.value = '';
          getLivros();
        } else {
          throw new Error('Erro ao adicionar livro');
        }
      })
      .catch(error => {
        console.error('Erro ao adicionar livro:', error);
      });
  }

  // Função para atualizar um livro
  function atualizarLivro() {
    const id = livroIdEditarInput.value;
    const nome = livroNomeEditarInput.value;
    const autor = livroAutorEditarInput.value;
    const revenda = livroRevendaEditarInput.value;

    fetch(`/livros/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, autor, revenda })
    })
      .then(response => {
        if (response.ok) {
          M.toast({ html: 'Livro atualizado com sucesso!' });
          getLivros();
        } else {
          throw new Error('Erro ao atualizar livro');
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar livro:', error);
      });
  }

  // Função para excluir um livro
  function excluirLivro(id) {
    fetch(`/livros/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          M.toast({ html: 'Livro excluído com sucesso!' });
          getLivros();
        } else {
          throw new Error('Erro ao excluir livro');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir livro:', error);
      });
  }

  // Event listeners
  document.getElementById('btnSalvarLivro').addEventListener('click', adicionarLivro);
  document.getElementById('btnAtualizarLivro').addEventListener('click', atualizarLivro);

  // Carregar livros ao carregar a página
  getLivros();
});

