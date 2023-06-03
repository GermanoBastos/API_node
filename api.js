const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('/public')); // Configura o diretório 'public' como o diretório de arquivos estáticos

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
