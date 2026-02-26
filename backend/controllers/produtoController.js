const repository = require("../repositories/produtoRepository");

// GET /produtos
exports.listar = async (req, res) => {
  try {
    const produtos = await repository.listar();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
};

// GET /produtos/:id
exports.buscar = async (req, res) => {
  try {
    const produto = await repository.buscarPorId(req.params.id);
    if (!produto)
      return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
};

// POST /produtos (Cria produto e salva imagens)
exports.criar = async (req, res) => {
  try {
    // 1. Cria o produto no banco
    const produto = await repository.criar(req.body);

    // 2. Se houver imagens, salva cada uma delas
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = `/uploads/${file.filename}`;
        await repository.salvarImagem(produto.id, url);
      }
    }

    res.status(201).json({
      mensagem: "Produto criado com sucesso!",
      produto,
    });
  } catch (error) {
    console.error("DETALHE DO ERRO NO TERMINAL:", error);
    res.status(500).json({
      erro: "Erro ao salvar o produto",
      mensagemReal: error.message,
    });
  }
};

// PUT /produtos/:id
exports.atualizar = async (req, res) => {
  try {
    const atualizado = await repository.atualizar(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};

// DELETE /produtos/:id
exports.deletar = async (req, res) => {
  try {
    await repository.deletar(req.params.id);
    res.json({ mensagem: "Produto removido" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};
