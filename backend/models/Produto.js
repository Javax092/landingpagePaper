const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: { type: String },
  imagem: { type: String }, // Aqui vamos salvar o caminho da imagem (ex: /uploads/123.jpg)
});

module.exports = mongoose.model("Produto", produtoSchema);
