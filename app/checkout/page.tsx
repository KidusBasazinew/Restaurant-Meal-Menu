"use client";
import { ChevronLeft, CreditCard, Apple, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { PaymentMethodId } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getTax,
    getTotal,
    paymentMethod,
    setPaymentMethod,
    placeOrder,
    clearCart,
  } = useCart();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const confirmPayment = () => {
    if (items.length === 0) return;
    placeOrder({ paymentMethod });
    clearCart();
    router.push("/digitalreceipt");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-10">
      {/* Header */}
      <div className="px-6 pt-12 flex items-center justify-between mb-8">
        <Link
          href="/menu"
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100"
        >
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-xl font-black italic tracking-tight">CHECKOUT</h2>
        <div className="w-12" /> {/* Spacer */}
      </div>

      <div className="px-6 space-y-8">
        {/* Payment Methods - Modern Cards */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">
            Payment Method
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                id: "apple",
                name: "Apple Pay",
                icon: <Apple fill="black" />,
                color: "bg-white",
              },
              {
                id: "card",
                name: "Mastercard **** 8821",
                icon: <CreditCard className="text-blue-600" />,
                color: "bg-blue-50",
              },
              {
                id: "cash",
                name: "Pay at Table",
                icon: <Wallet className="text-orange-500" />,
                color: "bg-orange-50",
              },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-5 rounded-[2rem] border-2 border-transparent transition-all cursor-pointer active:scale-[0.98] ${method.color} shadow-sm has-[:checked]:border-black`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                    {method.icon}
                  </div>
                  <span className="font-bold text-[#1A1A1A]">
                    {method.name}
                  </span>
                </div>
                <input
                  type="radio"
                  name="payment"
                  className="w-5 h-5 accent-black"
                  checked={paymentMethod === method.id}
                  onChange={() =>
                    setPaymentMethod(method.id as PaymentMethodId)
                  }
                />
              </label>
            ))}
          </div>
        </section>

        {/* Order Summary - Floating Glass Sheet */}
        <section className="bg-[#1A1A1A] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl" />

          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center text-white/60 font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-white/60 font-medium">
              <span>VAT (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-3xl font-black text-orange-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        <button
          onClick={confirmPayment}
          disabled={items.length === 0}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] active:scale-95 transition-all disabled:opacity-50"
        >
          CONFIRM PAYMENT
        </button>
      </div>
    </div>
  );
}
