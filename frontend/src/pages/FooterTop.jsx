import React from 'react';
import { 
  TruckIcon, 
  ArrowPathIcon, 
  ChatBubbleLeftRightIcon, 
  GiftIcon 
} from '@heroicons/react/24/outline';

const FooterTop = () => {
  // Configurações do WhatsApp
  const phoneNumber = "559298154-4634"; // COLOQUE SEU NÚMERO AQUI (com DDD)
  const message = encodeURIComponent("Olá! Gostaria de um orçamento personalizado ou tirar dúvidas sobre os produtos da BRUPAPER. 📝");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <section className="relative z-10 -mb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* --- GRID DE DIFERENCIAIS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard 
            icon={<TruckIcon className="h-6 w-6" />} 
            title="Entrega Rápida" 
            desc="Envio em até 24h úteis"
          />
          <FeatureCard 
            icon={<ArrowPathIcon className="h-6 w-6" />} 
            title="Troca Fácil" 
            desc="Até 30 dias para devolver"
          />
          <FeatureCard 
            icon={<GiftIcon className="h-6 w-6" />} 
            title="Brinde Especial" 
            desc="Compras acima de R$100"
          />
          {/* O Card de Dúvidas agora também é um link para o Zap */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <FeatureCard 
              icon={<ChatBubbleLeftRightIcon className="h-6 w-6" />} 
              title="Dúvidas?" 
              desc="Chame no nosso WhatsApp"
              isHighlight
            />
          </a>
        </div>

        {/* --- BANNER DE CONTATO RÁPIDO --- */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Não achou o que procurava? 📝
            </h2>
            <p className="text-blue-100 mt-2 text-lg">
              Fazemos encomendas personalizadas e kits para empresas. 
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Botão WhatsApp Principal */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg text-center flex items-center justify-center gap-2 group"
            >
              <span>Falar com Especialista</span>
              <span className="group-hover:rotate-12 transition-transform text-xl">💬</span>
            </a>

            {/* Link para Catálogo (Pode ser um link para o seu Google Drive ou arquivo público) */}
            <a 
              href="/catalogo-bw-2026.pdf" 
              download
              className="px-8 py-4 bg-blue-500/30 text-white border border-white/20 font-bold rounded-2xl hover:bg-blue-500/50 transition-all backdrop-blur-sm text-center"
            >
              Ver Catálogo PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Componente Interno de Card Refatorado */
const FeatureCard = ({ icon, title, desc, isHighlight = false }) => (
  <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all hover:scale-105 cursor-pointer h-full ${
    isHighlight 
      ? 'bg-blue-50 border-2 border-blue-200 ring-4 ring-blue-600/5' 
      : 'bg-white border border-gray-100 shadow-sm'
  }`}>
    <div className={`p-3 rounded-xl flex-shrink-0 ${isHighlight ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm leading-tight">{title}</h4>
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">{desc}</p>
    </div>
  </div>
);

export default FooterTop;