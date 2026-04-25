"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, increment, decrement, removeFromCart, getTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[85%] max-w-md bg-white z-[70] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">My Cart</h2>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              {items.length === 0 ? (
                <p className="text-gray-400 font-medium text-sm">
                  Your cart is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.meal.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                      <Image
                        src={item.meal.image}
                        fill
                        className="object-cover"
                        alt={item.meal.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold">{item.meal.name}</h4>
                      <p className="text-gray-400 text-sm">
                        ${item.meal.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => decrement(item.meal.id)}
                          className="w-6 h-6 border rounded flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.meal.id)}
                          className="w-6 h-6 border rounded flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.meal.id)}
                      className="text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold flex justify-center items-center"
              >
                Go to Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
