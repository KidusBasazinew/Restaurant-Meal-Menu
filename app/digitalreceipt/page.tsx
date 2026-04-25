"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function DigitalReceipt() {
  const { lastReceipt } = useCart();

  const createdAtLabel = useMemo(() => {
    if (!lastReceipt) return "";
    const date = new Date(lastReceipt.createdAt);
    if (Number.isNaN(date.getTime())) return lastReceipt.createdAt;
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [lastReceipt]);

  if (!lastReceipt) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] p-6 flex flex-col justify-center">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-10 text-center">
          <h2 className="text-xl font-black mb-3">No Receipt Found</h2>
          <p className="text-gray-400 text-sm font-medium mb-6">
            Please complete checkout to generate a receipt.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl font-black"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6 flex flex-col justify-center">
      {/* The Receipt Paper */}
      <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden pt-10 px-8 pb-4">
        <div className="flex flex-col items-center border-b border-dashed border-gray-200 pb-8 mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center font-black text-2xl mb-4">
            R
          </div>
          <h2 className="text-xl font-black">RESTAURANT NAME</h2>
          <p className="text-gray-400 text-sm font-medium">{createdAtLabel}</p>
        </div>

        <div className="space-y-4 mb-8">
          {lastReceipt.items.map((item) => (
            <div key={item.meal.id} className="flex justify-between font-bold">
              <span className="text-gray-500">
                {item.quantity}x {item.meal.name}
              </span>
              <span>${(item.meal.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold">
            <span className="text-gray-500">Tax</span>
            <span>${lastReceipt.tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-400 uppercase text-xs tracking-widest">
              Total Paid
            </span>
            <span className="text-3xl font-black">
              ${lastReceipt.total.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em] mb-4">
          Thanks for dining with us!
        </p>
      </div>

      {/* Zig-Zag Bottom Effect */}
      <div className="flex w-full overflow-hidden leading-[0]">
        {[...Array(20)].map((_, i) => (
          <svg key={i} className="w-8 h-4 fill-white" viewBox="0 0 20 10">
            <polygon points="0,0 20,0 10,10" />
          </svg>
        ))}
      </div>

      <button className="mt-10 w-full text-white/50 font-bold text-sm underline decoration-white/20">
        Download PDF Invoice
      </button>
    </div>
  );
}
