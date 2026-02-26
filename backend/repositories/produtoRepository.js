const pool = require("../config/database");

exports.listar = async () => {
  const result = await pool.query(`
    SELECT p.*, c.nome AS categoria
    FROM produtos p
    LEFT JOIN categorias c ON c.id = p.categoria_id
    ORDER BY p.id DESC
  `);

  return result.rows;
};

exports.buscarPorId = async (id) => {
  const result = await pool.query(`SELECT * FROM produtos WHERE id = $1`, [id]);

  return result.rows[0];
};

exports.criar = async (produto) => {
  const result = await pool.query(
    `INSERT INTO produtos
    (nome, slug, descricao, preco, quantidade_estoque, categoria_id)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [
      produto.nome,
      produto.slug,
      produto.descricao,
      produto.preco,
      produto.quantidade_estoque || 0,
      produto.categoria_id || null,
    ],
  );

  return result.rows[0];
};

exports.atualizar = async (id, produto) => {
  const result = await pool.query(
    `UPDATE produtos SET
      nome=$1,
      slug=$2,
      descricao=$3,
      preco=$4,
      quantidade_estoque=$5,
      categoria_id=$6
     WHERE id=$7
     RETURNING *`,
    [
      produto.nome,
      produto.slug,
      produto.descricao,
      produto.preco,
      produto.quantidade_estoque,
      produto.categoria_id,
      id,
    ],
  );

  return result.rows[0];
};

exports.deletar = async (id) => {
  await pool.query(`DELETE FROM produtos WHERE id=$1`, [id]);
};

exports.criarProduto = async (produto) => {
  const result = await pool.query(
    `INSERT INTO produtos
     (nome, descricao, preco, estoque, categoria_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.estoque,
      produto.categoria_id,
    ],
  );

  return result.rows[0];
};
exports.salvarImagem = async (produtoId, url) => {
  await pool.query(
    `INSERT INTO imagens_produto (produto_id, url)
     VALUES ($1,$2)`,
    [produtoId, url],
  );
};
