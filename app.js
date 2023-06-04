express = require("express");
const cors = require("cors");
const rotaLivro = require("./rotas/livro");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/livros", rotaLivro);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get('/', (req, res) => {
  try {
    const dados = fs.readFileSync(path.join(__dirname, 'livros.json'));
    const livros = JSON.parse(dados);
    res.json(livros);
  } catch (error) {
    console.error('Erro ao listar os livros:', error);
    res.status(500).send('Erro ao listar os livros');
  }
});

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
