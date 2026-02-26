import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Certifique-se que o caminho está correto

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("http://localhost:5000/produtos/listar");
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-pink-600 font-bold text-xl">
        Carregando mimos...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-black text-gray-800 mb-8 text-center">
        Nossa Coleção <span className="text-pink-600">Flashshop</span>
      </h2>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum produto encontrado. Adicione pelo Postman! 😉
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {produtos.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
