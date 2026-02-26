const repo = require("../repositories/produtoRepository");
const slugify = require("../utils/slugify");

exports.listar = (query) => repo.listar(query);

exports.buscarPorSlug = (slug) => repo.buscarPorSlug(slug);

exports.criar = async (dados) => {
  dados.slug = slugify(dados.name);
  return repo.criar(dados);
};
