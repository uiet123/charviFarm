"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
      className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-[#5C3A21]/8 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-18 md:h-20 flex items-center justify-between">
        <Link href="/">
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-11 h-11 md:w-12 md:h-12 overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-all duration-500 border-2 border-[#D4AF37]/40">
              <Image src="/logo.png" alt="Charvi Farm Logo" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="font-playfair font-bold text-xl md:text-2xl tracking-tight text-[#2C1A0E]">Charvi Farm</span>
          </motion.div>
        </Link>
        
        <div className="hidden md:flex gap-8 text-[14px] font-semibold tracking-wide uppercase">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="relative overflow-hidden group py-1 text-[#2C1A0E]/80 hover:text-[#5C3A21] transition-colors duration-300">
              {item.label}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#5C3A21] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5 md:gap-6">
          <Link 
            href="/cart"
            className="relative p-2 rounded-full bg-[#f5f0e8] hover:bg-[#5C3A21] hover:text-white text-[#2C1A0E] transition-colors flex items-center justify-center shadow-sm border border-[#5C3A21]/10"
          >
            <ShoppingCart size={22} />
            {getTotalItems() > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#2C1A0E] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
              >
                {getTotalItems()}
              </motion.span>
            )}
          </Link>

          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="tel:9871206163" className="hidden sm:flex items-center gap-2 bg-[#5C3A21] text-white px-5 py-2.5 rounded-lg hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all duration-400 font-semibold shadow-md text-sm">
            <Phone size={16} />
            <span>Call Us</span>
          </motion.a>

          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#f5f0e8] text-[#2C1A0E] hover:bg-[#5C3A21] hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="absolute top-18 left-0 w-full bg-white md:hidden overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center gap-8 pt-12 pb-16 px-6">
              {navLinks.map((item, i) => (
                <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-playfair font-bold text-[#2C1A0E] hover:text-[#5C3A21] transition-colors">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
