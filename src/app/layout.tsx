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
        <div className="bg-[#5C3A21] text-white text-center py-2.5 px-4 text-xs md:text-sm font-medium tracking-wider z-[60] relative">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
            </span>
            <span>100% FARM FRESH • SHUDH BUFFALO GHEE</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
            </span>
          </div>
        </div>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
