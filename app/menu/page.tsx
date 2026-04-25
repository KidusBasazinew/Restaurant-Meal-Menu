"use client";

import { useState } from "react";
import { Search, Filter, Plus, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CATEGORIES, MEALS } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function MenusPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* Dynamic Header */}
      <div className="px-6 pt-14 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm font-medium">Table #12</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A]">
              Special Menu
            </h1>
          </div>
          <div className="w-12 h-12 bg-white shadow-md rounded-2xl flex items-center justify-center border border-gray-50">
            <Filter size={20} className="text-gray-800" />
          </div>
        </div>

        {/* Search Bar - Sleeker Design */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search
              className="text-gray-400 group-focus-within:text-black transition-colors"
              size={18}
            />
          </div>
          <input
            type="text"
            placeholder="Search your cravings..."
            className="w-full bg-gray-100/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-black/5 transition-all outline-none"
          />
        </div>
      </div>

      {/* Categories - Pill Design */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.name)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              activeTab === cat.name
                ? "bg-[#1A1A1A] text-white shadow-xl scale-105"
                : "bg-white text-gray-400 border border-gray-100"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="px-6 space-y-6">
        {MEALS.filter(
          (m) => activeTab === "All" || m.category === activeTab,
        ).map((meal) => (
          <div key={meal.id} className="relative group">
            <Link href={`/food/${meal.id}`}>
              <div className="bg-white rounded-[2.5rem] p-4 flex items-center gap-5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-50 active:scale-[0.97] transition-all">
                {/* Food Image with Shadow */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <div className="absolute inset-2 bg-black/20 rounded-full blur-xl translate-y-2"></div>
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover rounded-full border-2 border-white relative z-10"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-[10px] font-bold text-gray-400">
                      {meal.rating} • 120 kcal
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#1A1A1A] text-lg leading-tight mb-1">
                    {meal.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-1 mb-3 font-medium">
                    {meal.description}
                  </p>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-black text-[#1A1A1A]">
                      ${meal.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Floating Plus Button */}
            <button
              onClick={() => addToCart(meal, 1)}
              className="absolute bottom-4 right-4 w-11 h-11 bg-[#1A1A1A] text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-black active:scale-90 transition-all z-20"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>
        ))}
      </div>

      {/* "New Collection" Banner (Visual Creativity) */}
      <div className="px-6 mt-10">
        <div className="w-full bg-gradient-to-br from-red-500 to-orange-600 rounded-[2.5rem] p-6 text-white flex justify-between items-center overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="font-bold text-lg">Chef&apos;s Choice</h4>
            <p className="text-white/80 text-xs mb-4">
              Get 20% off on your first wine
            </p>
            <button className="bg-white text-red-600 px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
              Explore Now
            </button>
          </div>
          <ChevronRight className="relative z-10 text-white/50" size={40} />
          {/* Abstract Circle for design */}
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
