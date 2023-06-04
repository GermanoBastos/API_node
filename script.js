
    document.addEventListener('DOMContentLoaded', function() {
      const livroIdEditarInput = document.getElementById('livroIdEditar');
      const livroNomeEditarInput = document.getElementById('livroNomeEditar');
      const livroAutorEditarInput = document.getElementById('livroAutorEditar');
      const livroRevendaEditarInput = document.getElementById('livroRevendaEditar');

      const livroNomeInput = document.getElementById('livroNome');
      const livroAutorInput = document.getElementById('livroAutor');
      const livroRevendaInput = document.getElementById('livroRevenda');

      const tabelaLivros = document.getElementById('tabelaLivros');

      // Função para carregar os livros na tabela
      function carregarLivros() {
        fetch('livros')
          .then(response => response.json())
          .then(data => {
            let html = '';
            data.forEach(livro => {
              html += `
                <tr>
                  <td>${livro.id}</td>
                  <td>${livro.nome}</td>
                  <td>${livro.autor}</td>
                  <td>${livro.revenda}</td>
                  <td>
                    <button class="btn editar-livro" data-id="${livro.id}" data-nome="${livro.nome}" data-autor="${livro.autor}" data-revenda="${livro.revenda}">Editar</button>
                    <button class="btn red excluir-livro" data-id="${livro.id}">Excluir</button>
                  </td>
                </tr>
              `;
            });
            tabelaLivros.innerHTML = html;
          });
      }

      // Função para limpar os campos de adicionar livro
      function limparCamposAdicionarLivro() {
        livroNomeInput.value = '';
        livroAutorInput.value = '';
        livroRevendaInput.value = '';
      }

      // Função para preencher os campos do modal de editar livro
      function preencherFormEditarLivro(id, nome, autor, revenda) {
        livroIdEditarInput.value = id;
        livroNomeEditarInput.value = nome;
        livroAutorEditarInput.value = autor;
        livroRevendaEditarInput.value = revenda;
      }

      // Função para adicionar um novo livro
      document.getElementById('formAdicionarLivro').addEventListener('submit', function(event) {
        event.preventDefault();

        const livroNome = livroNomeInput.value;
        const livroAutor = livroAutorInput.value;
        const livroRevenda = livroRevendaInput.value;

        fetch('/livros', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: livroNome,
              autor: livroAutor,
              revenda: livroRevenda
            })
          })
          .then(() => {
            carregarLivros();
            limparCamposAdicionarLivro();
          });
      });

      // Função para editar um livro
      document.getElementById('formEditarLivro').addEventListener('submit', function(event) {
        event.preventDefault();

        const id = livroIdEditarInput.value;
        const nome = livroNomeEditarInput.value;
        const autor = livroAutorEditarInput.value;
        const revenda = livroRevendaEditarInput.value;

        fetch(`/livros/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nome: nome,
              autor: autor,
              revenda: revenda
            })
          })
          .then(() => {
            carregarLivros();
            M.Modal.getInstance(document.getElementById('modalEditarLivro')).close();
          });
      });

      // Evento de clique em editar livro
      tabelaLivros.addEventListener('click', function(event) {
        if (event.target.classList.contains('editar-livro')) {
          const id = event.target.getAttribute('data-id');
          const nome = event.target.getAttribute('data-nome');
          const autor = event.target.getAttribute('data-autor');
          const revenda = event.target.getAttribute('data-revenda');

          preencherFormEditarLivro(id, nome, autor, revenda);
          M.Modal.getInstance(document.getElementById('modalEditarLivro')).open();
        }
      });

      // Evento de clique em excluir livro
      tabelaLivros.addEventListener('click', function(event) {
        if (event.target.classList.contains('excluir-livro')) {
          const id = event.target.getAttribute('data-id');

          fetch(`/livros/${id}`, {
              method: 'DELETE'
            })
            .then(() => {
              carregarLivros();
            });
        }
      });

      // Inicializar Materialize Modal
      const modalEditarLivro = document.getElementById('modalEditarLivro');
      M.Modal.init(modalEditarLivro);

      // Carregar os livros iniciais
      carregarLivros();
    });
