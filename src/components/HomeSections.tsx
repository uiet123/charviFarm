"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Lock, Plus, Minus, X, ChevronRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProductsSection() {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  return (
    <>
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
                  <Image src="/products/ghee/ghee1.jpeg" alt="Premium Buffalo Ghee" fill className="object-cover" />
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

              <div className="flex justify-between items-center mb-8 px-2">
                <span className="text-[#2C1A0E]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl md:text-3xl font-bold text-[#5C3A21]">₹{(1800 * orderQuantity).toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => {
                  const msg = `Hi, I want to order ${orderQuantity} kg of Pure Desi Buffalo Ghee. The total amount is ₹${(1800 * orderQuantity).toLocaleString('en-IN')}.`;
                  window.open(`https://wa.me/919871206163?text=${encodeURIComponent(msg)}`, '_blank');
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full py-4 rounded-xl bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(92,58,33,0.25)] text-base uppercase tracking-wider"
              >
                Checkout via WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="products" className="py-12 md:py-20 px-6 relative overflow-hidden bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1A0E] mb-4">Our Farm Products</h2>
            <p className="text-[#2C1A0E]/60 text-lg max-w-2xl mx-auto mb-6">Discover our range of 100% pure, farm-fresh dairy products made with tradition and love.</p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Ghee */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.1 }}
              className="group"
            >
              <Link href="/product/ghee" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-gradient-to-b from-[#faf7f2] to-[#f0ebe2]">
                  <Image src="/products/ghee/ghee1.jpeg" alt="Pure Desi Buffalo Ghee" fill className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                  <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#2C1A0E] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md">
                    Best Seller
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-grow text-center">
                  <p className="text-[#5C3A21]/60 text-xs font-medium mb-1">Made from Pure Buffalo Milk</p>
                  <h3 className="text-xl md:text-2xl font-bold font-playfair text-[#2C1A0E] mb-3">Pure Desi Ghee</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-5">
                    <span className="text-2xl font-bold text-[#5C3A21]">₹1,800</span>
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

            {/* Curd */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.2 }}
              className="group"
            >
              <Link href="/product/curd" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-gradient-to-b from-[#faf7f2] to-[#f0ebe2]">
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

            {/* Oil */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.3 }}
              className="group"
            >
              <Link href="/product/oil" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-gradient-to-b from-[#faf7f2] to-[#f0ebe2]">
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

            {/* Paneer */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.4 }}
              className="group"
            >
              <Link href="/product/paneer" className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full border border-[#5C3A21]/8 block cursor-pointer">
                <div className="relative h-[300px] sm:h-[320px] overflow-hidden bg-gradient-to-b from-[#faf7f2] to-[#f0ebe2]">
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
    </>
  );
}

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1A0E] mb-4">Our Heritage</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(92,58,33,0.1)] border border-[#5C3A21]/8"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
              poster="/ghee-pic.png"
            >
              <source src="/charvi_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#2C1A0E] mb-6 leading-tight">
              The Story of<br/><span className="italic text-[#5C3A21]">Charvi Farm</span>
            </h2>
            <p className="text-[#2C1A0E]/65 text-base md:text-lg leading-relaxed mb-6">
              Charvi Farm Dairy was built with a vision of bringing the purest, unadulterated dairy products directly from our farm to your kitchen. Based in Delhi, we follow the time-tested <strong className="text-[#5C3A21]">Bilona method</strong> — hand-churning curd to extract the finest buffalo ghee.
            </p>
            <p className="text-[#2C1A0E]/55 text-sm md:text-base leading-relaxed mb-8">
              Every batch is freshly prepared with love. No powder, no mixing, no preservatives. Just pure tradition, delivered to your doorstep. Trusted by 500+ families across Delhi.
            </p>
            <Link href="/products">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 bg-[#5C3A21] text-white px-7 py-3.5 rounded-lg font-bold shadow-md hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all duration-400 text-sm cursor-pointer">
                View Our Products <ChevronRight size={16} />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="relative py-24 md:py-32 px-6 overflow-hidden flex-shrink-0"
    >
      <div className="absolute inset-0">
        <Image src="/ghee-pic.png" alt="Ghee Background" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#2C1A0E]/88 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl font-playfair font-bold mb-6"
        >
          Get In <span className="italic text-[#D4AF37]">Touch</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/65 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Ready to taste pure tradition? Call us or send a WhatsApp message to order your jar of premium buffalo ghee. We provide free home delivery across Delhi.
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -5 }}
            href="tel:9871206163"
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col items-center hover:bg-white hover:text-[#2C1A0E] group transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#2C1A0E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Phone size={24} />
            </div>
            <h3 className="font-playfair font-bold text-xl mb-2">Call Us</h3>
            <p className="text-white/70 group-hover:text-[#2C1A0E]/70 text-sm">9871206163</p>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03, y: -5 }}
            href="https://wa.me/919871206163?text=Hi%2C%20I%20am%20interested%20in%20Charvi%20Farm%20Ghee."
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col items-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] group transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
          >
            <div className="w-14 h-14 rounded-full bg-white text-[#2C1A0E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </div>
          <h3 className="font-playfair font-bold text-xl mb-2">WhatsApp Us</h3>
          <p className="text-white/70 group-hover:text-white/90 text-sm">Tap to chat instantly</p>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.03, y: -5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl flex flex-col items-center hover:bg-white hover:text-[#2C1A0E] group transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#2C1A0E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <MapPin size={24} />
          </div>
          <h3 className="font-playfair font-bold text-xl mb-2">Visit Us</h3>
          <p className="text-white/70 group-hover:text-[#2C1A0E]/70 text-sm leading-relaxed text-center">
            B1/22 Aman Vihar,<br/>Kirari Suleman Nagar,<br/>Delhi, India 110086
          </p>
        </motion.div>
      </div>
    </div>
  </motion.section>
  );
}
