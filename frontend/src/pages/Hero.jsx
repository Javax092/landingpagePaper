import React from 'react';
import { useCart } from '../context/CartContext';

const Hero = () => {
  // Exemplo de contador para escassez (pode ser estático ou dinâmico)
  const stockCount = 7; 

  return (
    <section className="hero-container bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge de Autoridade */}
        <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
          Eleito o melhor de 2026 por especialistas
        </span>

        {/* Headline com Gatilho de Autoridade */}
        <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
          Eleve seu setup com a marca líder mundial.
        </h1>

        {/* Subheadline com Gatilho de Escassez */}
        <p className="text-xl mt-4 text-gray-400">
          Últimas unidades da coleção premium. 
          <span className="text-red-500 font-bold ml-2">
             Apenas {stockCount} itens no estoque.
          </span>
        </p>

        {/* CTA (Call to Action) */}
        <div className="mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
            Produtos de alta qualidade!
          </button>
          <p className="text-xs text-gray-500 mt-3 italic">
            *Mais de 12.000 clientes satisfeitos em todo o Brasil.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;