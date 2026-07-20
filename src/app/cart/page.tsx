"use client";

import { useCart } from "@/context/CartContext";
import { Plus, Minus, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const cartItems = Object.values(cart);

  return (
    <div className="min-h-[70vh] py-12 md:py-20 px-6 bg-[#f5f0e8]">
      <div className="max-w-5xl mx-auto">
        <Link href="/#products" className="inline-flex items-center gap-2 text-[#5C3A21] hover:text-[#D4AF37] font-semibold mb-8 transition-colors">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
        
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag size={32} className="text-[#D4AF37]" />
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1A0E]">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center shadow-md border border-[#5C3A21]/5"
          >
            <div className="w-24 h-24 bg-[#f5f0e8] rounded-full flex items-center justify-center mx-auto mb-6 text-[#5C3A21]/40">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#2C1A0E] mb-3">Your cart is empty</h2>
            <p className="text-[#2C1A0E]/60 mb-8 max-w-md mx-auto">Looks like you haven't added any of our pure dairy products to your cart yet.</p>
            <Link href="/#products" className="inline-block bg-[#5C3A21] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all hover:-translate-y-1">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.id} 
                  className="bg-white p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 shadow-sm border border-[#5C3A21]/10"
                >
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-[#f5f0e8] shrink-0 border border-[#5C3A21]/10">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-playfair font-bold text-xl md:text-2xl text-[#2C1A0E] mb-1">{item.name}</h3>
                    <p className="text-[#5C3A21] font-bold text-lg mb-4">₹{item.price.toLocaleString('en-IN')}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-[#f5f0e8] py-1.5 px-2 rounded-xl shadow-inner border border-[#5C3A21]/10 w-fit">
                        <button 
                          onClick={() => updateQuantity(item, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2C1A0E] shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                          <Minus size={16} strokeWidth={2.5} />
                        </button>
                        <span className="text-xl font-bold font-playfair text-[#2C1A0E] w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#5C3A21] flex items-center justify-center text-white shadow-sm hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:scale-105 active:scale-95 transition-all"
                        >
                          <Plus size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                      <button 
                        onClick={() => updateQuantity(item, 0)}
                        className="text-red-500/70 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block font-bold text-[#2C1A0E] text-xl">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-[0_20px_40px_rgba(92,58,33,0.08)] border border-[#D4AF37]/20 sticky top-28"
            >
              <h3 className="font-playfair text-2xl font-bold text-[#2C1A0E] mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#2C1A0E]/70 font-medium">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#2C1A0E]/70 font-medium">
                  <span>Shipping</span>
                  <span className="text-[#5C3A21]">₹100</span>
                </div>
              </div>
              <div className="border-t border-[#5C3A21]/10 pt-6 mb-8 flex justify-between items-center">
                <span className="text-lg font-bold text-[#2C1A0E]">Total</span>
                <span className="text-3xl font-bold text-[#5C3A21]">₹{(getTotalPrice() + 100).toLocaleString('en-IN')}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(92,58,33,0.25)] text-lg uppercase tracking-wider block"
              >
                Proceed to Checkout
              </Link>
              <p className="text-center text-xs text-[#2C1A0E]/50 mt-4">
                You will be redirected to WhatsApp to complete your purchase securely.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
