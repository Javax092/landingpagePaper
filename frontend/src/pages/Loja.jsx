import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/produtos/listar");

        const dadosVindosDoBanco = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        setProdutos(dadosVindosDoBanco || []);
      } catch (err) {
        console.error("Erro ao carregar produtos", err);
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-branco-neve">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rosa-claro mb-4"></div>
        <p className="text-gray-500 animate-pulse font-medium">
          Buscando mimos exclusivos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-branco-neve min-h-screen">
        <p className="text-pink-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-rosa-claro underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-branco-neve min-h-screen">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">
            Catálogo <span className="text-rosa-claro">Exclusivo</span>
          </h2>
          <p className="text-gray-400 font-medium">
            {/* Usamos o Optional Chaining ?. para segurança total */}
            Mostrando {produtos?.length || 0} itens selecionados
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => (
            <ProductCard
              // NO MONGODB O ID É _id E NÃO id. Isso resolve o aviso de "unique key"
              key={produto._id}
              product={{
                ...produto,

                name: produto.nome,
                price: produto.preco,

                image: produto.imagem || "/BrunaPaper.png",
                category:
                  produto.type === "digital" ? "Arte Digital" : "Papelaria",
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-rosa-claro/20">
            <p className="text-gray-400 text-lg">
              Nenhum produto encontrado no estoque.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
