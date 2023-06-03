é: // const express = require("express") // importado o express
// const app = express() // atribuindo o app ao express
// app.use(express.json())
// const rotaLivro = require("./rotas/livro")

// const port = 8000 // definindo a porta da aplicacao

// // ESSA ROTA FOI TRANSFERIDA PARA PASTA ROTAS
// // rota na raiz com meto get exibindo no navegador amsg
// // app.get('/',(req,res)=>{
// //   res.send("Ola, esse é o método GET!")
// // })

// // definindo rota com base num arquivo externo
// app.use('/livros', rotaLivro)


// // modo de escuta da porta especificada
// app.listen(port,()=>{
// })

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