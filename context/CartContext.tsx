"use client";
import React, { createContext, useContext, useState } from "react";
import { MenuItem, TAX_RATE } from "@/lib/data";

interface CartItem {
  meal: MenuItem;
  quantity: number;
}

export type PaymentMethodId = "apple" | "card" | "cash";

export interface OrderReceipt {
  id: string;
  createdAt: string;
  tableNumber: string;
  paymentMethod: PaymentMethodId;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (meal: MenuItem, quantity: number) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;

  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;

  paymentMethod: PaymentMethodId;
  setPaymentMethod: (method: PaymentMethodId) => void;

  lastReceipt: OrderReceipt | null;
  placeOrder: (args?: {
    tableNumber?: string;
    paymentMethod?: PaymentMethodId;
  }) => OrderReceipt;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("apple");
  const [lastReceipt, setLastReceipt] = useState<OrderReceipt | null>(null);

  const addToCart = (meal: MenuItem, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { meal, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.meal.id !== id));
  };

  const setQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.meal.id === id
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const increment = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.meal.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrement = (id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.meal.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  const getSubtotal = () =>
    items.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
  const getTax = () => getSubtotal() * TAX_RATE;
  const getTotal = () => getSubtotal() + getTax();

  const placeOrder = (args?: {
    tableNumber?: string;
    paymentMethod?: PaymentMethodId;
  }) => {
    const now = new Date();
    const subtotal = getSubtotal();
    const tax = getTax();
    const total = subtotal + tax;
    const receipt: OrderReceipt = {
      id: String(Math.floor(1000 + Math.random() * 9000)),
      createdAt: now.toISOString(),
      tableNumber: args?.tableNumber ?? "12",
      paymentMethod: args?.paymentMethod ?? paymentMethod,
      items: items.map((i) => ({ ...i })),
      subtotal,
      tax,
      total,
    };

    setLastReceipt(receipt);
    return receipt;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        setQuantity,
        increment,
        decrement,
        clearCart,
        getSubtotal,
        getTax,
        getTotal,
        paymentMethod,
        setPaymentMethod,
        lastReceipt,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
