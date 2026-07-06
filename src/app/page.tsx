"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, ShoppingBag, Star, Award, Droplets, Leaf, ChevronDown, Shield, Truck, Clock, Lock, CheckCircle2, Menu, X, Plus, Minus } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const heroTextRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroTextRef,
    offset: ["start end", "end start"],
  });
  const heroTextScale = useTransform(heroProgress, [0, 0.5], [0.75, 1]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.3], [0, 1]);

  const promiseRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: promiseProgress } = useScroll({
    target: promiseRef,
    offset: ["start end", "end start"],
  });
  
  useEffect(() => {
    
    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const t = setTimeout(() => {
      setFadeSplash(true);
      setTimeout(() => setShowSplash(false), 800);
    }, 1200);

    return () => {
      clearTimeout(t);
      lenis.destroy();
    };
  }, []);


  return (
    <main className="min-h-screen bg-[#F4EFE6] text-[#1A2E20] selection:bg-[#D4AF37] selection:text-white overflow-x-hidden">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className={`fixed inset-0 z-[9999] bg-[#1A2E20] flex items-center justify-center transition-all duration-800 ${fadeSplash ? 'opacity-0' : 'opacity-100'}`}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <Image src="/logo.png" alt="Charvi Farm" fill className="object-cover" />
              </div>
              <span className="font-playfair text-[#D4AF37] text-2xl tracking-wider">Charvi Farm</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              className="bg-[#FCFBF8] rounded-[2rem] p-6 md:p-8 max-w-sm md:max-w-md w-full shadow-[0_30px_60px_rgba(26,46,32,0.15)] relative border border-[#D4AF37]/30 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F4EFE6] to-[#FCFBF8] -z-10 border-b border-[#D4AF37]/10"></div>
              
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="absolute top-5 right-5 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white text-[#1A2E20] transition-colors z-10 shadow-sm border border-[#1A2E20]/5"
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 bg-[#F4EFE6]">
                  <Image src="/ghee-pic.png" alt="Premium Buffalo Ghee" fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A2E20] mb-2 tracking-tight">Complete Order</h3>
                <p className="text-[#1A2E20]/60 text-sm font-light max-w-[250px]">How many jars of Premium Buffalo Ghee would you like?</p>
              </div>

              <div className="flex items-center justify-center gap-5 mb-8 bg-white py-4 rounded-2xl shadow-inner border border-[#1A2E20]/5">
                <button 
                  onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                  className="w-10 h-10 rounded-full bg-[#F4EFE6] flex items-center justify-center text-[#1A2E20] shadow-sm hover:scale-105 transition-transform active:scale-95 border border-[#1A2E20]/10"
                >
                  <Minus size={18} strokeWidth={2.5} />
                </button>
                <span className="text-3xl font-bold font-playfair text-[#1A2E20] w-14 text-center">{orderQuantity}</span>
                <button 
                  onClick={() => setOrderQuantity(orderQuantity + 1)}
                  className="w-10 h-10 rounded-full bg-[#1A2E20] flex items-center justify-center text-[#D4AF37] shadow-md hover:scale-105 hover:bg-[#D4AF37] hover:text-[#1A2E20] transition-all active:scale-95"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex justify-between items-center mb-8 px-2">
                <span className="text-[#1A2E20]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl md:text-3xl font-bold text-[#2E4C33]">₹{(1200 * orderQuantity).toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => {
                  const msg = `Hi, I want to order ${orderQuantity} jar${orderQuantity > 1 ? 's' : ''} of Premium Buffalo Ghee. The total amount is ₹${(1200 * orderQuantity).toLocaleString('en-IN')}.`;
                  window.open(`https://wa.me/919871206163?text=${encodeURIComponent(msg)}`, '_blank');
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full py-4 rounded-xl bg-[#1A2E20] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#1A2E20] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(26,46,32,0.2)] text-base uppercase tracking-wider"
              >
                Checkout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: smoothEase, delay: 1.5 }}
        className="fixed top-0 w-full z-50 bg-[#F4EFE6]/85 backdrop-blur-xl border-b border-[#2E4C33]/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-all duration-500 border border-[#D4AF37]/30">
              <Image src="/logo.png" alt="Charvi Farm Logo" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="font-playfair font-bold text-2xl md:text-3xl tracking-tight text-[#1A2E20]">Charvi Farm</span>
          </motion.div>
          
          <div className="hidden md:flex gap-10 text-[15px] font-medium tracking-wide">
            {['Promise', 'Shop', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative overflow-hidden group py-1">
                <span className="group-hover:text-[#D4AF37] transition-colors duration-300">{item === 'Promise' ? 'Our Promise' : item === 'Shop' ? 'Shop Ghee' : item}</span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#D4AF37] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="tel:9871206163" className="hidden sm:flex items-center gap-2 bg-[#2E4C33] text-white px-6 py-3 rounded-full hover:bg-[#D4AF37] transition-all duration-500 font-medium shadow-lg hover:shadow-[#D4AF37]/40">
              <Phone size={18} className="animate-pulse" />
              <span className="tracking-wide">Order Now</span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex items-center justify-center p-2 rounded-full bg-[#1A2E20]/5 text-[#1A2E20] hover:bg-[#1A2E20]/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="absolute top-20 left-0 w-full bg-[#F4EFE6] md:hidden overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex flex-col items-center justify-center gap-8 pt-12 pb-16 px-6">
                {['Promise', 'Shop', 'Contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-playfair font-bold text-[#1A2E20] hover:text-[#D4AF37] transition-colors"
                  >
                    {item === 'Promise' ? 'Our Promise' : item === 'Shop' ? 'Shop Ghee' : item}
                  </motion.a>
                ))}
                
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  href="tel:9871206163" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 w-full flex items-center justify-center gap-3 bg-[#1A2E20] text-white px-8 py-4.5 rounded-full font-bold shadow-xl active:scale-95 transition-transform"
                >
                  <Phone size={20} className="animate-pulse" />
                  Order Now: 9871206163
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero — Split Grid (Text Left, Image Right) with Premium Animations */}
      <section className="relative min-h-screen pt-28 pb-16 lg:pt-44 lg:pb-32 px-6 flex items-center bg-[#F4EFE6]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: smoothEase, delay: 1.8 }}
            className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-semibold tracking-wider text-[10px] md:text-xs mb-6 md:mb-8 border border-[#D4AF37]/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
              </span>
              100% FARM FRESH • HOME DELIVERY
            </div>
            
            <h1 className="text-4xl md:text-7xl font-playfair font-extrabold leading-[1.1] mb-6 md:mb-8 text-[#1A2E20]">
              <span className="block">Shudh Buffalo</span>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 italic text-[#D4AF37] pr-4" style={{
                  background: 'linear-gradient(to right, #a67c00, #d4af37, #8e6216, #c59b27, #a67c00)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: 'shine 5s linear infinite',
                }}>Ghee, Ghar Tak.</span>
                <span className="absolute bottom-2 left-0 w-full h-[30%] bg-[#D4AF37]/10 -z-10 -rotate-2"></span>
              </span>
            </h1>
            
            <p className="text-base md:text-xl text-[#1A2E20]/75 mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
              Experience the authentic taste of pure buffalo ghee. No powder, no mixing. Just pure, traditional goodness delivered straight to your home.
            </p>
            
            <div className="flex flex-row gap-2 md:gap-5 items-center justify-center md:justify-start w-full">
              <motion.a whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} href="#shop" className="flex-1 md:flex-none justify-center bg-[#1A2E20] text-white px-2 sm:px-6 md:px-8 py-3.5 md:py-4.5 rounded-full font-bold tracking-wide flex items-center gap-1.5 md:gap-3 shadow-xl hover:bg-[#D4AF37] hover:text-[#1A2E20] transition-colors duration-500 text-[13px] sm:text-sm md:text-base whitespace-nowrap">
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> Order Now
              </motion.a>
              <motion.a whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} href="tel:9871206163" className="flex-1 md:flex-none justify-center border border-[#1A2E20]/20 text-[#1A2E20] px-2 sm:px-6 md:px-8 py-3.5 md:py-4.5 rounded-full font-semibold tracking-wide flex items-center gap-1.5 md:gap-3 hover:bg-[#1A2E20] hover:text-white transition-colors duration-500 text-[13px] sm:text-sm md:text-base whitespace-nowrap">
                <Phone className="w-4 h-4 md:w-5 md:h-5" /> 9871206163
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: smoothEase, delay: 2 }}
            className="relative lg:h-[650px] h-[300px] md:h-[350px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(26,46,32,0.12)] border border-[#2E4C33]/5 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E20]/30 via-transparent to-transparent z-10 transition-opacity duration-700"></div>
            <Image 
              src="/ghee-pic.png" 
              alt="Premium Buffalo Ghee Jar" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              priority
            />
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 z-20 bg-[#FCFBF8]/90 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#D4AF37]/25"
            >
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[10px] text-[#1A2E20]/60 font-bold uppercase tracking-wider">Quality</p>
                <p className="font-bold text-[#1A2E20] text-sm">Premium Grade</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll-Scale Text Section */}
      <section ref={heroTextRef} className="relative z-10 py-16 md:py-24 flex items-center justify-center bg-gradient-to-b from-[#F4EFE6] to-[#FCFBF8]">
        <motion.div style={{ scale: heroTextScale, opacity: heroTextOpacity }} className="text-center px-6 max-w-4xl">
          <h2 className="text-3xl md:text-6xl font-playfair font-extrabold leading-[1.1] text-[#1A2E20]">
            Experience the <span className="italic text-[#D4AF37]">Authentic</span> Taste
          </h2>
          <p className="text-base text-[#1A2E20]/60 mt-6 max-w-2xl mx-auto font-light tracking-widest uppercase">Crafted with love from our farm in Delhi</p>
        </motion.div>
      </section>

      {/* Scrolling Text Marquee */}
      <div className="bg-[#2E4C33] py-5 overflow-hidden whitespace-nowrap border-y border-[#D4AF37]/30 shadow-sm">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-16 text-lg md:text-xl font-playfair italic text-[#D4AF37]"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 flex-shrink-0">
              <span>Shudh Buffalo Ghee</span>
              <Star size={14} className="fill-[#D4AF37] flex-shrink-0" />
              <span>Ghar Tak</span>
              <Star size={14} className="fill-[#D4AF37] flex-shrink-0" />
              <span>100% Pure</span>
              <Star size={14} className="fill-[#D4AF37] flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust Stats — Cards slide from L/R with rotation */}
      <section id="promise" className="py-16 md:py-28 bg-gradient-to-b from-[#0f1a12] to-[#1A2E20] text-white relative overflow-hidden" ref={promiseRef}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.2 }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-[#D4AF37] font-bold tracking-[0.25em] text-xs uppercase block mb-4"
            >Our Commitment</motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-playfair font-extrabold"
            >Craftsmanship & Quality</motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Left card */}
            <motion.div
              initial={{ x: -120, opacity: 0, rotate: -4 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="group relative flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8 h-[300px] md:h-[350px] rounded-[24px] text-center border border-[#D4AF37]/20 bg-[#FCFBF8]/5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_60px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#aa771c] flex items-center justify-center shadow-lg">
                <Shield size={28} className="text-black" />
              </div>
              <div>
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-2 opacity-80">Premium Quality</span>
                <span className="text-lg font-playfair font-medium">100% Pure Buffalo Ghee</span>
              </div>
            </motion.div>

            {/* Center card */}
            <motion.div
              initial={{ y: -80, opacity: 0, scale: 0.9 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="group relative flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8 h-[300px] md:h-[350px] rounded-[24px] text-center border border-[#D4AF37]/20 bg-[#FCFBF8]/5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_60px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#aa771c] flex items-center justify-center shadow-lg">
                <Leaf size={28} className="text-black" />
              </div>
              <div>
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-2 opacity-80">Traditional</span>
                <span className="text-lg font-playfair font-medium">Bilona Method</span>
              </div>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ x: 120, opacity: 0, rotate: 4 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="group relative flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-8 h-[300px] md:h-[350px] rounded-[24px] text-center border border-[#D4AF37]/20 bg-[#FCFBF8]/5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_60px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700"></div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#aa771c] flex items-center justify-center shadow-lg">
                <Truck size={28} className="text-black" />
              </div>
              <div>
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase block mb-2 opacity-80">Home Delivery</span>
                <span className="text-lg font-playfair font-medium">Fresh to Your Door</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="shop" className="py-16 md:py-28 px-6 bg-[#F4EFE6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-bold tracking-[0.25em] text-xs uppercase block mb-4">Our Product</span>
            <h2 className="text-2xl md:text-5xl font-playfair font-extrabold text-[#1A2E20]">The Collection</h2>
          </motion.div>

          {/* Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            viewport={{ once: false, amount: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 bg-[#FCFBF8] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] group hover:-translate-y-2 transition-all duration-500 border border-[#2E4C33]/5">
              <div className="relative h-[300px] md:h-auto md:h-auto overflow-hidden bg-gradient-to-br from-[#F4EFE6] to-[#EAE5D9]">
                <Image src="/ghee-pic.png" alt="Premium Buffalo Ghee" fill className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out" />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="absolute top-6 left-6 bg-[#D4AF37] text-[#1A2E20] text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg"
                >
                  Best Seller
                </motion.div>
              </div>
              <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold font-playfair text-[#1A2E20] mb-2">Premium Buffalo Ghee</h3>
                  <p className="text-[#1A2E20]/50 font-medium uppercase tracking-[0.15em] text-xs mb-6">1 Kg Glass Jar</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-[#2E4C33]">₹1,200</span>
                    <span className="text-[#1A2E20]/40 line-through text-base font-light">₹1,500</span>
                  </div>
                  <p className="text-[#1A2E20]/75 text-sm md:text-base mb-8 font-light leading-relaxed">
                    Rich, aromatic, and full of natural goodness. Hand-churned using the ancient Bilona method. Delivered fresh from Charvi Farm straight to your home in Delhi.
                  </p>
                  <ul className="space-y-3 mb-8 w-full max-w-sm md:max-w-full mx-auto md:mx-0">
                    {['No powder, no mixing', 'Farm fresh guarantee', 'Home delivery in Delhi'].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="flex items-center justify-center md:justify-start gap-3 text-[#1A2E20]/75 text-sm"
                      >
                        <div className="w-4.5 h-4.5 rounded-full bg-[#2E4C33] flex items-center justify-center flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      setOrderQuantity(1);
                      setIsCheckoutModalOpen(true);
                    }}
                    className="w-full py-4.5 rounded-2xl bg-[#1A2E20] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#1A2E20] transition-colors duration-300 shadow-xl text-base group/btn cursor-pointer"
                  >
                    <ShoppingBag size={18} className="group-hover/btn:animate-bounce" />
                    Buy Now
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Products / Farm Additions */}
      <section className="py-16 md:py-24 px-6 bg-[#F4EFE6] relative overflow-hidden border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: smoothEase }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[#D4AF37] font-bold tracking-[0.25em] text-xs uppercase block mb-4">Farm Expansion</span>
            <h2 className="text-2xl md:text-5xl font-playfair font-extrabold text-[#1A2E20]">Coming Soon</h2>
            <p className="text-[#1A2E20]/60 mt-4 max-w-2xl mx-auto font-light">We are working hard to bring more pure, farm-fresh products to your kitchen. Stay tuned for our upcoming additions.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Buffalo Ghee", status: "Available Now", icon: CheckCircle2, active: true },
              { name: "Sarso Oil", status: "Waiting", icon: Lock, active: false },
              { name: "Farm Milk", status: "Waiting", icon: Lock, active: false },
              { name: "Fresh Paneer", status: "Waiting", icon: Lock, active: false },
              { name: "Pure Khoya", status: "Waiting", icon: Lock, active: false },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
                viewport={{ once: false, amount: 0.2 }}
                className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[20px] border transition-all duration-500 ${
                  item.active 
                    ? "bg-[#FCFBF8] border-[#D4AF37]/50 shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:-translate-y-2" 
                    : "bg-[#1A2E20]/5 border-transparent opacity-70 hover:opacity-100 cursor-not-allowed"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  item.active ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-[#1A2E20]/10 text-[#1A2E20]/40"
                }`}>
                  <item.icon size={24} />
                </div>
                <h3 className={`font-playfair font-bold text-lg mb-2 text-center ${item.active ? "text-[#1A2E20]" : "text-[#1A2E20]/60"}`}>
                  {item.name}
                </h3>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${
                  item.active ? "bg-[#2E4C33] text-white shadow-md" : "bg-[#1A2E20]/10 text-[#1A2E20]/50"
                }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ scale: 0.98, opacity: 0, y: 30 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.15 }}
        className="py-16 md:py-28 bg-[#FCFBF8] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-bold tracking-[0.25em] text-xs uppercase block mb-4">Benefits</span>
            <h2 className="text-2xl md:text-5xl font-playfair font-extrabold text-[#1A2E20]">Why Charvi Farm?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Droplets, title: "Zero Adulteration", desc: "Our ghee is made from pure buffalo milk with absolutely no additives, preservatives, or mixing.", fromLeft: true },
              { icon: Clock, title: "Traditional Process", desc: "We follow the time-tested Bilona method — hand-churned curd to extract the purest form of ghee.", fromLeft: false },
              { icon: Truck, title: "Fresh Delivery", desc: "Every batch is freshly prepared and delivered to your doorstep in Delhi. No warehousing, no stale stock.", fromLeft: true },
              { icon: Shield, title: "Trust & Quality", desc: "Loved by 500+ families in Delhi. Our commitment to quality is unwavering.", fromLeft: false },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  x: item.fromLeft ? -60 : 60,
                  y: 30,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  ease: smoothEase,
                  delay: idx * 0.1,
                }}
                viewport={{ once: false, amount: 0.2 }}
                className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-5 p-6 md:p-8 rounded-2xl hover:bg-[#F4EFE6] transition-all duration-500 group cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(212,175,55,0.06)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2E4C33] text-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:scale-108 group-hover:rotate-3 transition-all duration-500 shadow-md">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-playfair mb-2 text-[#1A2E20] group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                  <p className="text-[#1A2E20]/60 leading-relaxed font-light text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ scale: 0.98, opacity: 0, y: 30 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="relative py-16 md:py-28 px-6 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image src="/ghee-pic.png" alt="Ghee Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#1A2E20]/90 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-playfair font-extrabold mb-6"
          >
            Ready to Taste <span className="italic text-[#D4AF37]">Pure Tradition?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg font-light mb-10 max-w-xl mx-auto"
          >
            Call us or send a message to order your jar of premium buffalo ghee. Home delivery available across Delhi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href="tel:9871206163" className="bg-[#D4AF37] text-[#1A2E20] px-8 py-4.5 rounded-full font-bold tracking-wide flex items-center gap-3 shadow-lg text-base">
              <Phone size={20} /> Call Now
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0a0a0a] text-white pt-20 pb-10 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/10 pb-12">
            <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Image src="/logo.png" alt="Charvi Farm" width={44} height={44} className="rounded-full object-cover" />
                <span className="font-playfair font-bold text-2xl md:text-3xl">Charvi Farm</span>
              </div>
              <p className="text-white/50 text-base max-w-md font-light leading-relaxed">
                Bringing the purest, unadulterated buffalo ghee from our farm directly to your kitchen. Taste the tradition.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-bold mb-6 text-[#D4AF37] tracking-[0.15em] uppercase text-xs">Quick Links</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                {['Promise', 'Shop', 'Contact'].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-[#D4AF37] transition-colors">{l === 'Promise' ? 'Our Promise' : l === 'Shop' ? 'Shop Ghee' : l}</a></li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="font-bold mb-6 text-[#D4AF37] tracking-[0.15em] uppercase text-xs">Contact</h4>
              <ul className="space-y-4 text-white/60 text-sm mb-8">
                <li><a href="tel:9871206163" className="text-lg font-semibold text-white hover:text-[#D4AF37] transition-colors flex items-center justify-center md:justify-start gap-2"><Phone size={16} className="text-[#D4AF37]" /> 9871206163</a></li>
                <li className="font-light leading-relaxed text-sm">B1/ 22 Aman Vihar,<br />Kirari Suleman Nagar,<br />Delhi, India 110086</li>
              </ul>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/charvifarmofficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#1A2E20] hover:scale-110 transition-all duration-300 shadow-sm" title="Follow us on Instagram">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://wa.me/919871206163" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#D4AF37] hover:text-[#1A2E20] hover:scale-110 transition-all duration-300 shadow-sm" title="Chat on WhatsApp">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs font-light">
            <p>&copy; {new Date().getFullYear()} Charvi Farm Dairy. All rights reserved.</p>
            <p>100% Farm Fresh Guarantee</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: smoothEase }}
          className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[15vw] font-playfair font-bold text-white/[0.015] whitespace-nowrap pointer-events-none select-none"
        >
          CHARVI FARM
        </motion.div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919871206163?text=Hi%2C%20I%20am%20interested%20in%20Charvi%20Farm%20Ghee."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-7 h-7 md:w-8 md:h-8 fill-current group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* CSS for shine animation */}
      <style jsx global>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}
