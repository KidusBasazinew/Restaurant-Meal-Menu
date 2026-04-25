"use client";

import { ArrowLeft, ShoppingBag, Star, Plus, Minus } from "lucide-react";

import Link from "next/link";

import Image from "next/image";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MEALS } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function FoodDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const meal = useMemo(() => {
    const id = params?.id;
    const mealId = Array.isArray(id) ? id[0] : (id as string | undefined);
    if (!mealId) return undefined;
    return MEALS.find((m) => m.id === mealId);
  }, [params]);

  if (!meal) {
    return null;
  }

  const handleAddToCartOnly = () => {
    addToCart(meal, quantity);
  };

  const handleOrderNow = () => {
    addToCart(meal, quantity);
    router.push("/checkout");
  };

  return (
    <div className="h-screen flex flex-col bg-[#F7F8FA] text-[#1A1A1A] relative overflow-hidden">
      {/* Header */}

      <div className="flex justify-between items-center px-6 pt-12 pb-8 z-10">
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center cursor-pointer -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </Link>

        <Link
          href="/checkout"
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer -mr-2"
        >
          <ShoppingBag className="w-6 h-6 text-[#1A1A1A]" />

          <div className="absolute top-2 right-1 w-2.5 h-2.5 bg-[#FF6363] rounded-full border border-white"></div>
        </Link>
      </div>

      {/* Hero Section */}

      <div className="px-6 relative flex-1 pt-6">
        <div className="w-[55%] relative z-10">
          <h1 className="text-[2.2rem] font-bold leading-tight mb-8">
            {meal.name}
          </h1>

          <div className="mb-2">
            <p className="text-[#A0A0A0] text-sm mb-1">Price</p>

            <p className="text-2xl font-bold">${meal.price.toFixed(2)}</p>
          </div>

          <div className="mt-8">
            <p className="text-[#A0A0A0] text-[0.9rem] mb-3">Choice quantity</p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <Minus className="w-4 h-4 text-[#1A1A1A]" />
              </button>

              <span className="font-bold text-lg">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#1A1A1A]" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Image Overflowing */}

        <div className="absolute top-4 -right-24 w-80 h-80 z-0">
          <div className="w-full h-full rounded-full relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <Image
              src={meal.image}
              alt={meal.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}

      <div className="bg-white rounded-t-[2.5rem] p-8 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20 relative mt-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Description</h2>

          <div className="flex items-center gap-1.5 font-bold text-[#FFA000]">
            <Star className="w-5 h-5 fill-current" />

            <span className="text-[1.1rem]">{meal.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-[#1A1A1A]/70 text-[0.95rem] leading-[1.8] mb-8 font-medium">
          {meal.description}
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleOrderNow}
            className="flex-1 bg-[#1e1e1e] text-white py-4 rounded-[1.2rem] font-semibold text-[0.95rem] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
          >
            Order Now
          </button>

          <button
            onClick={handleAddToCartOnly}
            className="flex-1 bg-white border border-[#1e1e1e] text-[#1e1e1e] py-4 rounded-[1.2rem] font-semibold text-[0.95rem]"
          >
            Add Chart
          </button>
        </div>
      </div>
    </div>
  );
}
