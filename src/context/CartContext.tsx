"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: { [id: string]: CartItem };
  updateQuantity: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<{ [id: string]: CartItem }>({});

  const updateQuantity = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) {
        delete newCart[product.id];
      } else {
        newCart[product.id] = { ...product, quantity };
      }
      return newCart;
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, updateQuantity, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
