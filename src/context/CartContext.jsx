import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('myCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existsInCart = cart.some((item) => item.id === product.id);

    if (existsInCart) {
      console.log('Товар уже в корзине');
      return;
    }

    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity: 1 }
    ]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 
  return (
    <CartContext.Provider value={{
         cart,
          addToCart,
           removeFromCart, 
           clearCart, 
           totalItems, totalPrice
            }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);