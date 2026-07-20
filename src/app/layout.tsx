import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charvi Farm | Shudh Buffalo Ghee - Ghar Tak",
  description: "Charvi Farm Dairy - Pure Desi Buffalo Ghee, hand-churned using the Bilona method. 100% farm fresh, no mixing, no powder. Home delivery in Delhi.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#f5f0e8] text-[#2C1A0E] font-sans flex flex-col min-h-screen`}
      >
        {/* Announcement Bar */}
        <div className="bg-[#5C3A21] text-white py-2.5 px-4 text-xs md:text-sm font-bold tracking-wider z-[60] relative overflow-hidden flex items-center">
          <div className="animate-marquee-scroll">
            <span className="mx-8 flex-inline items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] mb-[1px]"></span>
              100% FARM FRESH • SHUDH BUFFALO GHEE
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] mb-[1px]"></span>
            </span>
            <span className="mx-8 flex-inline items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] mb-[1px]"></span>
              🎉 GET ₹50 OFF ON ONLINE PAYMENT! 🎉
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] mb-[1px]"></span>
            </span>
          </div>
        </div>
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Chatbot />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
