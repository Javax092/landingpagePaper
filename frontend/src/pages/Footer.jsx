import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrunaPaperrAirplaneIcon, 
  ChatBubbleBottomCenterTextIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Prontinho! Seu cupom e o brinde chegarão no e-mail.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* --- SEÇÃO DE CAPTAÇÃO (O "Pulo do Gato") --- */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="bg-blue-600 p-1.5 rounded-lg">🎁</span>
              Ganhe um Planner Semanal!
            </h3>
            <p className="mt-2 text-gray-400">
              Deixe seu melhor e-mail para receber um **kit de organização digital** e um cupom de **10% OFF** na sua primeira compra.
            </p>
          </div>
          
          <div className="md:w-1/3">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Seu e-mail favorito..."
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border-transparent focus:border-blue-500 focus:ring-0 text-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <BrunaBrunaPaperrrAirplaneIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Quero!</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- LINKS E INFORMAÇÕES --- */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Marca */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-xl font-black tracking-tighter text-white">
            BW<span className="text-blue-500">PAPELARIA</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Sua dose diária de criatividade. Entregamos em todo o Brasil com aquele carinho que você já conhece.
          </p>
          <div className="mt-6 flex gap-4">
            {/* Ícones Sociais (Exemplo) */}
            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">IG</a>
            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">TT</a>
          </div>
        </div>

        {/* Menu Rápido */}
        <div>
          <h4 className="text-white font-bold mb-6">Navegação</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/loja" className="hover:text-blue-400 transition">Todos os Produtos</Link></li>
            <li><Link to="/loja" className="hover:text-blue-400 transition">Mais Vendidos</Link></li>
            <li><Link to="/contato" className="hover:text-blue-400 transition">Rastrear Pedido</Link></li>
          </ul>
        </div>

        {/* Atendimento / Orçamento */}
        <div className="md:col-span-2 bg-gray-800/50 p-6 rounded-2xl border border-gray-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-blue-500" />
            Pedido Especial ou Atacado?
          </h4>
          <p className="text-xs mb-4">Precisa de um orçamento para sua empresa ou evento? Nossa equipe responde em até 2h.</p>
          <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all">
            Solicitar Orçamento Rápido
          </button>
          
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <EnvelopeIcon className="h-4 w-4" /> contato@bwpapelaria.com.br
            </span>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 BrunaPaper. Feito para mentes criativas.
          </p>
          
          {/* Bandeiras de Pagamento */}
          <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" alt="Pix" className="h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;