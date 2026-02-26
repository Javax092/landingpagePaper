import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; 
import { useCart } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import { Toaster } from 'react-hot-toast';
import PromotionBanner from './components/PromotionBanner';
import { ShoppingBagIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

// Lazy loading para otimização de performance
const Home = lazy(() => import('./pages/Home'));
const Loja = lazy(() => import('./pages/Loja'));
const Admin = lazy(() => import('./pages/Admin'));

function Navbar({ onCartClick }) {
  const { totalItems } = useCart();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const whatsappUrl = "https://wa.me/5592981544634?text=" + encodeURIComponent("Olá! Preciso de ajuda com um pedido na BW Papelaria.");

  return (
    <nav className="sticky top-0 z-50 bg-branco-neve/90 backdrop-blur-md border-b border-rosa-claro/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo - Agora em Rosa */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black tracking-tighter text-rosa-claro hover:scale-105 transition-transform inline-block">
              BW<span className="text-gray-700">PAPELARIA</span>
            </Link>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive('/') ? 'text-rosa-claro' : 'text-gray-500 hover:text-rosa-claro'}`}>
              Início
            </Link>
            <Link to="/loja" className={`text-sm font-bold uppercase tracking-wider transition-colors ${isActive('/loja') ? 'text-rosa-claro' : 'text-gray-500 hover:text-rosa-claro'}`}>
              Produtos
            </Link>
            <Link to="/admin" className="bg-rosa-claro/10 text-rosa-claro px-3 py-1 rounded-md text-xs font-bold hover:bg-rosa-claro/20 transition uppercase">
              Painel
            </Link>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-rosa-claro rounded-full text-xs font-bold hover:bg-rosa-claro hover:text-white transition-all border border-rosa-claro"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              Dúvidas?
            </a>

            {/* Botão do Carrinho - Agora Rosa */}
            <button 
              onClick={onCartClick} 
              className="relative p-2.5 bg-rosa-claro rounded-2xl text-white hover:bg-pink-400 transition-all active:scale-95 shadow-md shadow-pink-100"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-rosa-claro ring-2 ring-rosa-claro">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
   <div className="flex flex-col min-h-screen bg-branco-neve"> 
      <Toaster position="top-right" reverseOrder={false} />
      <PromotionBanner />
      
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow">
        <Suspense fallback={
          <div className="h-[60vh] w-full flex flex-col items-center justify-center gap-4">
            {/* Spinner Rosa */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rosa-claro"></div>
            <p className="text-rosa-claro font-medium animate-pulse uppercase tracking-widest text-xs">Preparando sua mesa...</p>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<div className="py-20 text-center text-gray-400">Página não encontrada.</div>} />
          </Routes>
        </Suspense>
      </main>

      <footer className="bg-white border-t border-rosa-claro/20 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tighter text-xl">BW<span className="text-rosa-claro">PAPELARIA</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Sua dose diária de criatividade e organização.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-900 mb-4">Navegação</h3>
            <nav className="flex flex-col space-y-3 text-sm font-medium text-gray-500">
              <Link to="/" className="hover:text-rosa-claro transition">Início</Link>
              <Link to="/loja" className="hover:text-rosa-claro transition">Coleção de Produtos</Link>
            </nav>
          </div>

          <div className="text-center md:text-right flex flex-col justify-between">
            <div className="text-sm text-gray-400">
              <p className="font-bold text-gray-700 mb-1">© 2026 PapelariaBW</p>
              <div className="mt-4 flex justify-center md:justify-end gap-3 opacity-60">
                <span className="text-xs border border-rosa-claro/30 text-rosa-claro px-2 py-0.5 rounded">PIX</span>
                <span className="text-xs border border-rosa-claro/30 text-rosa-claro px-2 py-0.5 rounded">CARTÃO</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;