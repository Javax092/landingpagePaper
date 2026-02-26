import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Admin = () => {
  // Estado para o formulário
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    categoria: '',
    imagem: '',
    descricao: ''
  });

  // Estados de controle
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  // 1. Validação de campos
  const validar = () => {
    let novosErros = {};
    if (!produto.nome.trim()) novosErros.nome = "O nome é obrigatório";
    if (!produto.preco || produto.preco <= 0) novosErros.preco = "Insira um preço válido";
    if (!produto.categoria) novosErros.categoria = "Selecione uma categoria";
    if (!produto.imagem.trim()) novosErros.imagem = "A URL da imagem é obrigatória";
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // 2. Atualiza o estado enquanto o usuário digita (Simples e direto)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
    
    // Limpa o erro específico quando o usuário começa a corrigir o campo
    if (erros[name]) {
      setErros({ ...erros, [name]: null });
    }
  };

  // 3. Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validar()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      // Simulando o tempo de resposta de um servidor (2 segundos)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Produto Cadastrado:", produto);
      toast.success("Produto cadastrado com sucesso!");
      
      // Limpa o formulário após o sucesso
      setProduto({ nome: '', preco: '', categoria: '', imagem: '', descricao: '' });
      setErros({});
    } catch (error) {
      toast.error("Erro ao cadastrar produto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
      <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <span className="h-8 w-2 bg-blue-600 rounded-full"></span>
        Novo Produto
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nome do Produto */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nome do Produto</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            placeholder="Ex: Caderno Inteligente"
            className={`w-full p-3 rounded-xl border ${erros.nome ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none transition`}
          />
          {erros.nome && <span className="text-red-500 text-xs mt-1 font-medium">{erros.nome}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preço */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Preço (R$)</label>
            <input
              type="number"
              name="preco"
              step="0.01"
              value={produto.preco}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${erros.preco ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {erros.preco && <span className="text-red-500 text-xs mt-1 font-medium">{erros.preco}</span>}
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Categoria</label>
            <select
              name="categoria"
              value={produto.categoria}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border ${erros.categoria ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
            >
              <option value="">Selecione...</option>
              <option value="papelaria">Papelaria</option>
              <option value="escrita">Escrita</option>
              <option value="organizacao">Organização</option>
            </select>
            {erros.categoria && <span className="text-red-500 text-xs mt-1 font-medium">{erros.categoria}</span>}
          </div>
        </div>

        {/* URL da Imagem */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="text"
            name="imagem"
            value={produto.imagem}
            onChange={handleChange}
            placeholder="https://exemplo.com/foto.jpg"
            className={`w-full p-3 rounded-xl border ${erros.imagem ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {erros.imagem && <span className="text-red-500 text-xs mt-1 font-medium">{erros.imagem}</span>}
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            rows="3"
            placeholder="Conte mais sobre o produto..."
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-4 rounded-xl font-black text-lg transition shadow-lg active:scale-95 ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              CADASTRANDO...
            </div>
          ) : (
            "CADASTRAR PRODUTO"
          )}
        </button>
      </form>
    </div>
  );
};

export default Admin;