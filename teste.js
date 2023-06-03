const fs = require("fs");

const dadosAtuais = JSON.parse(fs.readFileSync("livros.json"))
const novoDado = {  id: "6",  nome: "O Senhor dos Anéis 6"}
fs.writeFileSync("livros.json",JSON.stringify([...dadosAtuais, novoDado]))

console.log( JSON.parse(fs.readFileSync("livros.json")))