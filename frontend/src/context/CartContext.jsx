
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    // Check if course already in cart
    const exists = cartItems.find(item => item.id === course.id);
    if (exists) {
      return { success: false, message: 'Course already in cart' };
    }

    setCartItems([...cartItems, course]);
    setIsOpen(true);
    return { success: true, message: 'Course added to cart' };
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const value = {
    cartItems,
    isOpen,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    getItemCount,
    toggleCart,
    setIsOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;