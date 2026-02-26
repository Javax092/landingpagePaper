import React, { useState, useEffect } from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PromotionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Oculta o banner após 10 segundos, mas pode ser fechado antes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Banner visível por 10 segundos

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado ou fechado manualmente
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Opcional: Você pode setar um item no localStorage aqui
    // para não mostrar o banner novamente para o mesmo usuário por um tempo.
    // localStorage.setItem('hidePromotionBanner', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 shadow-md overflow-hidden animate-in fade-in slide-in-from-top-full duration-500">
      {/* Detalhe de "Confetes" / Faíscas */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <SparklesIcon className="h-full w-full absolute -top-1/2 -left-1/2 rotate-12" />
        <SparklesIcon className="h-full w-full absolute -bottom-1/2 -right-1/2 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          <SparklesIcon className="h-6 w-6 text-blue-200 animate-pulse-slow" />
          <p className="text-sm md:text-base font-semibold text-center sm:text-left">
            Pagamentos via <span className="font-black text-yellow-300">PIX</span> com <span className="font-black text-yellow-300">10% DE DESCONTO</span> exclusivo!
          </p>
        </div>

        {/* Botão de Fechar */}
        <button 
          onClick={handleClose} 
          className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
          aria-label="Fechar promoção"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PromotionBanner;