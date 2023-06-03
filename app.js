 express = require('express');
const rotaLivro = require('./rotas/livro');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/livros', rotaLivro);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

});

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});