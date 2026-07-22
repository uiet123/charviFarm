"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Lock, Plus, Minus, X } from "lucide-react";
import { useState } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProductsPage() {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-10">
      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 max-w-sm md:max-w-md w-full shadow-[0_30px_60px_rgba(44,26,14,0.2)] relative border border-[#D4AF37]/20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f5f0e8] to-white -z-10"></div>
              
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-[#f5f0e8] rounded-full hover:bg-[#5C3A21] hover:text-white text-[#2C1A0E] transition-colors z-10 shadow-sm"
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-[#f5f0e8]">
                  <Image src="/products/ghee/ghee_product.jpeg" alt="Premium Buffalo Ghee" fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#2C1A0E] mb-2 tracking-tight">Complete Order</h3>
                <p className="text-[#2C1A0E]/60 text-sm font-light max-w-[250px]">How many kg of Pure Desi Ghee would you like?</p>
              </div>

              <div className="flex items-center justify-center gap-5 mb-8 bg-[#f5f0e8] py-4 rounded-2xl shadow-inner border border-[#5C3A21]/10">
                <button 
                  onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2C1A0E] shadow-sm hover:scale-105 transition-transform active:scale-95 border border-[#5C3A21]/15"
                >
                  <Minus size={18} strokeWidth={2.5} />
                </button>
                <span className="text-3xl font-bold font-playfair text-[#2C1A0E] w-14 text-center">{orderQuantity}</span>
                <button 
                  onClick={() => setOrderQuantity(orderQuantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#5C3A21] flex items-center justify-center text-white shadow-md hover:scale-105 hover:bg-[#D4AF37] transition-all active:scale-95"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-[#2C1A0E]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-lg md:text-xl font-bold text-[#5C3A21]">₹{(1200 * orderQuantity).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-[#2C1A0E]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Shipping</span>
                <span className="text-lg md:text-xl font-bold text-[#5C3A21]">₹100</span>
              </div>
              <div className="flex justify-between items-center mb-8 px-2 pt-4 border-t border-[#5C3A21]/10">
                <span className="text-[#2C1A0E]/50 text-sm md:text-base font-bold uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl md:text-3xl font-bold text-[#5C3A21]">₹{(1200 * orderQuantity + 100).toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => {
                  window.location.href = `/checkout?buyNow=ghee&quantity=${orderQuantity}`;
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full py-4 rounded-xl bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(92,58,33,0.25)] text-base uppercase tracking-wider"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-12 md:py-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#2C1A0E] mb-4">Our Farm Products</h1>
            <p className="text-[#2C1A0E]/60 text-lg max-w-2xl mx-auto mb-6">Discover our range of 100% pure, farm-fresh dairy products made with tradition and love.</p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Ghee — Available */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.1 }}
              className="group"
            >
              <Link href="/product/ghee" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-white">
                  <Image src="/products/ghee/ghee_product.jpeg" alt="Pure Desi Buffalo Ghee" fill className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                  <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#2C1A0E] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md">
                    Best Seller
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow text-center">
                  <p className="text-[#5C3A21]/60 text-xs font-medium mb-1">Made from Pure Buffalo Milk</p>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#2C1A0E] mb-3">Pure Desi Ghee</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-5">
                    <span className="text-2xl font-bold text-[#5C3A21]">₹1,200</span>
                    <span className="text-[#2C1A0E]/35 text-sm font-medium">/kg</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOrderQuantity(1);
                      setIsCheckoutModalOpen(true);
                    }}
                    className="mt-auto w-fit mx-auto px-8 py-3 rounded-lg bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all duration-300 shadow-md text-sm cursor-pointer"
                  >
                    <ShoppingBag size={15} />
                    Shop Now
                  </button>
                </div>
              </Link>
            </motion.div>

            {/* Curd — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.2 }}
              className="group"
            >
              <Link href="/product/curd" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-white">
                  <Image src="/products/curd/curd1.jpeg" alt="Fresh & Thick Curd" fill className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow text-center">
                  <p className="text-[#5C3A21]/60 text-xs font-medium mb-1">Made from Pure Buffalo Milk</p>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#2C1A0E] mb-3">Fresh & Thick Curd</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-5">
                    <span className="text-lg font-medium text-[#2C1A0E]/40 italic">Price coming soon</span>
                  </div>
                  <div className="mt-auto w-fit mx-auto px-8 py-3 rounded-lg bg-[#5C3A21]/15 text-[#2C1A0E]/40 font-bold text-center flex items-center justify-center gap-2 text-sm cursor-not-allowed">
                    <Lock size={14} />
                    Coming Soon
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Sarso Oil — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.3 }}
              className="group"
            >
              <Link href="/product/oil" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-white">
                  <Image src="/products/oil/oil1.jpeg" alt="Pure Sarso Oil" fill className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow text-center">
                  <p className="text-[#5C3A21]/60 text-xs font-medium mb-1">Kacchi Ghani Wood Pressed</p>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#2C1A0E] mb-3">Pure Sarso Oil</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-5">
                    <span className="text-lg font-medium text-[#2C1A0E]/40 italic">Price coming soon</span>
                  </div>
                  <div className="mt-auto w-fit mx-auto px-8 py-3 rounded-lg bg-[#5C3A21]/15 text-[#2C1A0E]/40 font-bold text-center flex items-center justify-center gap-2 text-sm cursor-not-allowed">
                    <Lock size={14} />
                    Coming Soon
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Paneer — Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.4 }}
              className="group"
            >
              <Link href="/product/paneer" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-white">
                  <Image src="/products/paneer/panner1.jpeg" alt="Fresh & Soft Paneer" fill className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow text-center">
                  <p className="text-[#5C3A21]/60 text-xs font-medium mb-1">Made from Pure Buffalo Milk</p>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#2C1A0E] mb-3">Fresh & Soft Paneer</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-5">
                    <span className="text-lg font-medium text-[#2C1A0E]/40 italic">Price coming soon</span>
                  </div>
                  <div className="mt-auto w-fit mx-auto px-8 py-3 rounded-lg bg-[#5C3A21]/15 text-[#2C1A0E]/40 font-bold text-center flex items-center justify-center gap-2 text-sm cursor-not-allowed">
                    <Lock size={14} />
                    Coming Soon
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
