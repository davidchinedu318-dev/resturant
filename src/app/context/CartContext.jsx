"use client"
import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // load cart from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('eateny-cart')
    if (saved) {
      setCartItems(JSON.parse(saved))
    }
  }, [])

  // save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('eateny-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (food) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === food.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...food, quantity: 1 }];
      }
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext);
}