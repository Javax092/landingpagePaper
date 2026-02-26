const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploads"); // Verifique se é 'upload' ou 'uploads' (conforme o arquivo real)
const Produto = require("../models/Produto");

// 1. Rota para VER os produtos (Abre no navegador)
// URL: http://localhost:5000/produtos
router.get("/listar", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos); // Retorna a lista de produtos salvos
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// 2. Rota para CRIAR o produto (Usa no Postman/Frontend)
// URL: http://localhost:5000/produtos/criar
router.post("/criar", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;
    const caminhoImagem = req.file ? `/uploads/${req.file.filename}` : null;

    const novoProduto = new Produto({
      nome,
      preco,
      descricao,
      imagem: caminhoImagem,
    });

    await novoProduto.save();
    res.status(201).json({ mensagem: "Produto criado!", produto: novoProduto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao salvar o produto" });
  }
});
//editar produtos existentes
router.put("/editar/:id", async (req, res) => {
  try {
    const { nome, preco, descricao } = req.body;

    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, preco, descricao },
      { new: true }, // Retorna o produto já com as mudanças
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    res.json({
      mensagem: "Produto atualizado com sucesso!",
      produto: produtoAtualizado,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});

module.exports = router;
