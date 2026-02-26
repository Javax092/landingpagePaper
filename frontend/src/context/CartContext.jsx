import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Inicialização segura do localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('bw-cart'); // Namespace para evitar conflitos
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Erro ao ler localStorage:', error);
      return [];
    }
  });

  // 2. Persistência
  useEffect(() => {
    localStorage.setItem('bw-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { 
        ...product, 
        price: Number(product.price) || 0, 
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  // 3. Cálculos Otimizados
  const totalItems = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0), 
  [cart]);

  // Usei totalAmount para bater com o que o CartDrawer está esperando
  const totalAmount = useMemo(() => 
    cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0), 
  [cart]);

  const value = {
    cartItems: cart, // Mapeando 'cart' para 'cartItems' para resolver o erro do Drawer
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount, // Nome padronizado conforme usamos no componente
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};