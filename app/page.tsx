"use client";

import { Search, Heart } from "lucide-react";

import { useMemo } from "react";

import Image from "next/image";

import Link from "next/link";

import { MEALS } from "@/lib/data";

export default function HomePage() {
  const featuredMeals = useMemo(() => MEALS.slice(0, 2), []);
  const firstMeal = featuredMeals[0];
  const secondMeal = featuredMeals[1];

  return (
    <div className="pb-24 pt-12 text-[#1A1A1A] h-full overflow-y-auto relative">
      {/* Top Background Image */}

      <div className="absolute top-0 left-0 right-0 h-[340px] z-0 rounded-b-[2.5rem] overflow-hidden shadow-sm pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop"
          alt="Top Background"
          fill
          className="object-cover opacity-15"
        />

        {/* Optional overlay gradient if needed for text readability */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FA]/60 via-[#F7F8FA]/80 to-[#F7F8FA]"></div>
      </div>

      <div className="relative z-10 px-6">
        {/* Top Bar */}

        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-1.5 cursor-pointer">
            <div className="w-6 h-0.5 bg-[#1A1A1A] rounded-full"></div>

            <div className="w-4 h-0.5 bg-[#1A1A1A] rounded-full"></div>

            <div className="w-6 h-0.5 bg-[#1A1A1A] rounded-full"></div>
          </div>

          <div className="w-12 h-12 rounded-full p-[2px] bg-red-100 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden relative border border-transparent">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                alt="User profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Header */}

        <h1 className="text-4xl font-bold mb-8 leading-[1.15]">
          Enjoy your favourite <br /> food delicous
        </h1>

        {/* Search */}

        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 mb-8 shadow-sm">
          <Search className="text-[#1A1A1A] w-5 h-5 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-[#1A1A1A] w-full placeholder:text-gray-300 font-medium pb-0.5"
          />
        </div>
      </div>

      <div className="relative z-10 px-6">
        {/* Categories */}

        <div className="flex gap-6 overflow-x-auto no-scrollbar mb-8 -mx-6 px-6">
          {["All", "Healthy food", "Junk food", "Dessert"].map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap font-medium text-[1.1rem] ${
                i === 1 ? "text-[#1A1A1A] font-semibold" : "text-[#A0A0A0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Cards */}

        <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-6 px-6 pb-8">
          {firstMeal && (
            <Link
              href={`/food/${firstMeal.id}`}
              className="bg-white rounded-[2rem] p-5 pt-5 min-w-[220px] shadow-sm relative flex flex-col items-center cursor-pointer transition-transform active:scale-95"
            >
              <button className="absolute top-5 right-5 text-[#FF6363] z-10 w-8 h-8 flex justify-center items-center">
                <Heart className="w-[22px] h-[22px] fill-current" />
              </button>

              <div className="w-36 h-36 relative mt-2 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-[3px] border-[#F7F8FA]">
                  <Image
                    src={firstMeal.image}
                    alt={firstMeal.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full text-left">
                <h3 className="font-bold text-[1.1rem] mb-1">
                  {firstMeal.name}
                </h3>

                <p className="text-[#A0A0A0] text-[0.8rem] mb-4 truncate w-full">
                  {firstMeal.description}
                </p>

                <p className="font-bold text-xl">
                  ${firstMeal.price.toFixed(2)}
                </p>
              </div>
            </Link>
          )}

          {secondMeal && (
            <Link
              href={`/food/${secondMeal.id}`}
              className="bg-white rounded-[2rem] p-5 pt-5 min-w-[220px] shadow-sm relative flex flex-col items-center cursor-pointer transition-transform active:scale-95"
            >
              <button className="absolute top-5 right-5 text-gray-200 z-10 w-8 h-8 flex justify-center items-center">
                <Heart className="w-[22px] h-[22px] fill-current" />
              </button>

              <div className="w-36 h-36 relative mt-2 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg border-[3px] border-[#F7F8FA]">
                  <Image
                    src={secondMeal.image}
                    alt={secondMeal.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full text-left">
                <h3 className="font-bold text-[1.1rem] mb-1">
                  {secondMeal.name}
                </h3>

                <p className="text-[#A0A0A0] text-[0.8rem] mb-4 truncate w-full">
                  {secondMeal.description}
                </p>

                <p className="font-bold text-xl">
                  ${secondMeal.price.toFixed(2)}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
