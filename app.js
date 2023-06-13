express = require("express");
const cors = require("cors");
const rotaLivro = require("./rotas/livro");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/livros", rotaLivro);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/documentacao", (req, res) => {
  res.sendFile(__dirname + "/document.html");
});



app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
