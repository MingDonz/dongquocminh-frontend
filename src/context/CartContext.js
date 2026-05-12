"use client";
import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart từ localStorage sau khi mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing saved cart:", e);
      }
    }
  }, []);

  // Save cart vào localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === product.product_id);
      if (exist) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product_id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  const updateQuantity = (product_id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product_id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: parseInt(quantity) || 1 }
          : item,
      ),
    );
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
