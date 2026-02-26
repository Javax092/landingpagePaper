import React, { useState } from "react";
import {
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, totalAmount = 0, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");

  const handleCheckoutWhatsApp = () => {
    const phoneNumber = "5592981544634";

    const saudacao = customerName
      ? `✨ *NOVA SOLICITAÇÃO DE PEDIDO* ✨\n\nOlá, equipe BrunaPaper! Me chamo *${customerName}* e preparei meu carrinho no site.`
      : `✨ *NOVA SOLICITAÇÃO DE PEDIDO* ✨\n\nOlá! Acabei de escolher alguns itens no site e gostaria de finalizar com vocês.`;

    const itemsList = cartItems
      .map((item) => `📍 ${item.quantity}x _${item.name}_`)
      .join("\n");

    const corpoMensagem = [
      saudacao,
      `---`,
      `📝 *MEUS ITENS:*`,
      itemsList,
      `---`,
      `💰 *VALOR TOTAL:* R$ ${totalAmount.toFixed(2)}`,
      `---`,
      `💬 *PRÓXIMO PASSO:*`,
      `Poderiam me passar os dados para o pagamento via PIX?`,
      `\n_Aguardo o retorno de vocês!_`,
    ].join("\n");

    const message = encodeURIComponent(corpoMensagem);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Overlay Escuro com Blur */}
      <div
        className="absolute inset-0 bg-pink-900/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header - Agora em Rosa Suave */}
          <div className="px-6 py-6 border-b border-rosa-claro/10 flex items-center justify-between bg-branco-neve">
            <div className="flex items-center gap-3">
              <div className="bg-rosa-claro/20 p-2 rounded-xl">
                <ShoppingBagIcon className="h-6 w-6 text-pink-600" />
              </div>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
                Minha Sacola
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-rosa-claro/10 rounded-full transition-colors text-gray-400"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Lista de Produtos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-6xl animate-bounce">🎨</div>
                <p className="text-gray-400 font-medium text-lg">
                  Sua sacola está vazia.
                  <br />
                  Que tal enchê-la de mimos?
                </p>
                <button
                  onClick={onClose}
                  className="text-pink-600 font-bold hover:text-pink-700 transition-colors"
                >
                  Voltar para a loja
                </button>
              </div>
            ) : (
              <>
                {/* Campo de Nome do Cliente */}
                <div className="mb-8 p-4 bg-rosa-claro/5 rounded-2xl border border-rosa-claro/20">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-pink-600 mb-2">
                    Como podemos te chamar?
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full bg-white border border-rosa-claro/20 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                  />
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 group animate-fade-in"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-rosa-claro/10 bg-branco-neve">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between text-base font-bold text-gray-800">
                        <h3 className="truncate max-w-[150px]">{item.name}</h3>
                        <p className="text-pink-600">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md font-bold text-gray-500 uppercase">
                          Qtd: {item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-pink-600 transition-colors p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Otimizado */}
          {cartItems.length > 0 && (
            <div className="border-t border-rosa-claro/10 p-8 space-y-6 bg-branco-neve">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-medium text-sm">
                  Total do seu pedido
                </p>
                <p className="font-black text-3xl text-gray-800 tracking-tighter">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalAmount)}
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-dashed border-rosa-claro/40">
                <p className="text-[10px] text-pink-600 text-center uppercase font-black tracking-widest">
                  ✨ Atendimento personalizado via WhatsApp
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-3 bg-pink-600 text-white px-6 py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-pink-700 transition-all transform active:scale-95 shadow-xl shadow-pink-100"
                >
                  Finalizar Pedido
                  <span className="text-xl">💖</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-xs text-gray-400 font-bold hover:text-pink-600 uppercase tracking-widest transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
