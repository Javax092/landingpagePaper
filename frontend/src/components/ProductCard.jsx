import React, { memo } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // URL base do seu servidor backend para buscar as imagens
  const API_URL = "http://localhost:5000";

  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);

  const handleAddToCart = () => {
    // Adaptando para o addToCart entender os nomes do banco
    addToCart({
      ...product,
      name: product.nome, // Mapeia nome para name caso o contexto use inglês
      price: product.preco,
    });

    toast.success(`${product.nome} no carrinho! 💖`, {
      position: "bottom-center",
      style: {
        borderRadius: "15px",
        background: "#FFF",
        color: "#DB2777",
        border: "1px solid #FFB7C5",
      },
    });
  };

  return (
    <article className="group relative bg-white rounded-[2.5rem] p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-100 hover:-translate-y-2 border border-pink-100">
      <div className="relative h-64 overflow-hidden rounded-[2rem] bg-gray-50">
        <img
          src={`${API_URL}${product.imagem}`} // Concatena http://localhost:5000 + /uploads/nome.jpg
          alt={product.nome}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <div className="mb-3">
          <span className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em]">
            Exclusivo
          </span>
          <h3 className="text-gray-800 font-bold text-lg truncate group-hover:text-pink-600 transition-colors">
            {product.nome}
          </h3>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-black text-pink-600 tracking-tighter">
            {formatCurrency(product.preco)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2 group/btn"
          >
            <span className="max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase">
              Eu quero
            </span>
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);
