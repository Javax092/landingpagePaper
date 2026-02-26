import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Navbar = ({ onCartClick }) => {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Link para o WhatsApp com encodeURIComponent para segurança
  const whatsappUrl = `https://wa.me/5592981544634?text=${encodeURIComponent("Olá! Preciso de ajuda com um pedido na BW Papelaria.")}`;

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Barra de Promoção - Agora em Rosa Forte */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest">
          ✨ Use o cupom <span className="underline">BW10</span> para 10% OFF no
          PIX ✨
        </p>
      </div>

      {/* Navbar com efeito Backdrop Blur (vidro) */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-rosa-claro/20 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo - Com degradê rosa */}
            <Link to="/" className="group flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tighter text-rosa-claro group-hover:text-pink-600 transition-colors">
                BW<span className="text-gray-900">PAPELARIA</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                Creative Studio
              </span>
            </Link>

            {/* Links Centrais - Estilizados com Rosa */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link
                to="/"
                className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-pink-600 ${isActive("/") ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500"}`}
              >
                Início
              </Link>
              <Link
                to="/loja"
                className={`text-sm font-bold uppercase tracking-wider transition-all hover:text-pink-600 ${isActive("/loja") ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-500"}`}
              >
                Loja
              </Link>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Botão de Suporte - Rosa Suave */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-rosa-claro/10 text-pink-600 rounded-full text-xs font-bold hover:bg-rosa-claro/20 transition-all border border-rosa-claro/20"
              >
                <ChatBubbleLeftRightIcon className="h-4 w-4" />
                Dúvidas?
              </a>

              <div className="h-6 w-px bg-rosa-claro/20 hidden sm:block" />

              {/* Botão do Carrinho - Agora Rosa e com animação no badge */}
              <button
                onClick={onCartClick}
                className="group relative p-2.5 bg-rosa-claro rounded-2xl transition-all active:scale-95 hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-200"
                aria-label="Ver Carrinho"
              >
                <ShoppingBagIcon className="h-6 w-6 text-white" />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center ring-2 ring-white animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
