"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, Home, ShoppingBag, User } from "lucide-react";

const TABS = [
  { id: "home", icon: Home, href: "/" },
  { id: "menu", icon: UtensilsCrossed, href: "/menu" },
  { id: "cart", icon: ShoppingBag, href: "/checkout" },
  { id: "profile", icon: User, href: "/profile" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-36 pointer-events-none z-40 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/80 to-transparent backdrop-blur-[2px]" />
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[400px] bg-[#1e1e1e] rounded-[2.5rem] px-4 py-3 flex justify-around items-center shadow-2xl z-50 border border-white/5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.href === pathname;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-300"
            >
              {/* Background Glow/Circle for Active Item */}
              <div
                className={`absolute transition-all duration-500 ease-out rounded-full ${
                  isActive
                    ? "w-16 h-16  bg-white -top-8 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] opacity-100"
                    : "w-0 h-0 bg-transparent top-0 opacity-0"
                }`}
              />

              <Icon
                className={`relative z-10 transition-all duration-300 ${
                  isActive
                    ? "w-7 h-7 text-black scale-125 -translate-y-6 stroke-[2.5px]"
                    : "w-6 h-6 text-[#A0A0A0] stroke-[1.5px]"
                }`}
              />

              {/* Active Dot under icon */}
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
