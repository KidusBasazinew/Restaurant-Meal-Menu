import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import BottomNavBar from "@/components/BottomNavBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Food Delivery App",
  description: "Enjoy your favourite delicious food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans bg-[#F7F8FA] antialiased text-[#1A1A1A]`}
      >
        <CartProvider>
          <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#F7F8FA] overflow-hidden">
            {children}

            {/* Bottom Nav */}

            <BottomNavBar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
