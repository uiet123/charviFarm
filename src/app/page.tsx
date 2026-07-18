"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingBag, Star, Award, Droplets, Leaf, Shield, Truck, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";
import { ProductsSection, AboutSection, ContactSection } from "@/components/HomeSections";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroParallax = useTransform(heroProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className={`fixed inset-0 z-[9999] bg-[#3E2714] flex items-center justify-center transition-all duration-800 ${fadeSplash ? 'opacity-0' : 'opacity-100'}`}
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

      {/* Hero Banner */}
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-gradient-to-br from-[#f5f0e8] via-[#ede6d8] to-[#e8dfd0] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                 <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full z-10 relative pt-12 pb-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: smoothEase, delay: 1.8 }}
            className="max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3A21]/10 text-[#5C3A21] font-bold tracking-wider text-[10px] md:text-xs mb-6 border border-[#5C3A21]/15">
              <Leaf size={14} className="text-[#D4AF37]" />
              SIDHE KISAAN KE GHAR SE • 100% SHUDHTA KE SATH
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-extrabold leading-[1.08] mb-6 text-[#2C1A0E]">
              <span className="block">Experience</span>
              <span className="relative inline-block mt-1">
                <span className="relative z-10 italic" style={{
                  background: 'linear-gradient(to right, #5C3A21, #D4AF37, #5C3A21, #D4AF37)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  animation: 'shine 5s linear infinite',
                }}>Purity</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#2C1A0E]/65 mb-4 font-playfair italic font-semibold">
              Pure Desi Buffalo Ghee
            </p>
            
            <p className="text-sm md:text-base text-[#2C1A0E]/55 mb-8 max-w-md leading-relaxed font-light">
              Hand-churned using the ancient Bilona method. No powder, no mixing — just pure, traditional goodness delivered straight to your home.
            </p>
            
            <div className="flex flex-row gap-3 md:gap-4 items-center justify-center lg:justify-start w-full">
              <Link href="/products">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="bg-[#5C3A21] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-bold tracking-wide flex items-center gap-2.5 shadow-lg hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all duration-400 text-sm md:text-base cursor-pointer">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" /> Shop Now
                </motion.div>
              </Link>
              <motion.a whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} href="tel:9871206163" className="border-2 border-[#5C3A21]/25 text-[#2C1A0E] px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-semibold tracking-wide flex items-center gap-2.5 hover:bg-[#5C3A21] hover:text-white hover:border-[#5C3A21] transition-all duration-400 text-sm md:text-base">
                <Phone className="w-4 h-4 md:w-5 md:h-5" /> Call Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: smoothEase, delay: 2 }}
            className="relative lg:h-[600px] h-[350px] md:h-[450px] w-full group"
          >
            <motion.div style={{ y: heroParallax }} className="relative w-full h-full">
              <Image 
                src="/ghee-pic.png" 
                alt="Charvi Farm Pure Desi Buffalo Ghee" 
                fill 
                className="object-contain drop-shadow-[0_20px_50px_rgba(92,58,33,0.2)] group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out"
                priority
              />
            </motion.div>

            {/* Floating quality badge */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 md:top-10 left-0 md:left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-[#D4AF37]/25"
            >
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <Award size={18} />
              </div>
              <div>
                <p className="text-[9px] text-[#2C1A0E]/50 font-bold uppercase tracking-wider">Quality</p>
                <p className="font-bold text-[#2C1A0E] text-sm">Premium Grade</p>
              </div>
            </motion.div>

            {/* Floating price badge */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 md:bottom-16 right-0 md:right-4 z-20 bg-[#5C3A21] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3"
            >
              <div>
                <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider">Price</p>
                <p className="font-bold text-[#D4AF37] text-xl">₹1,800<span className="text-xs text-white/50 font-normal">/kg</span></p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="bg-[#5C3A21] py-4 overflow-hidden whitespace-nowrap shadow-inner">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-12 text-base md:text-lg font-playfair italic text-[#D4AF37]"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <span>Shudh Buffalo Ghee</span>
              <Star size={12} className="fill-[#D4AF37] flex-shrink-0" />
              <span>Ghar Tak</span>
              <Star size={12} className="fill-[#D4AF37] flex-shrink-0" />
              <span>100% Pure</span>
              <Star size={12} className="fill-[#D4AF37] flex-shrink-0" />
              <span>Bilona Method</span>
              <Star size={12} className="fill-[#D4AF37] flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Why Choose Us — Benefits Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[#2C1A0E] mb-3">Why Charvi Farm?</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Zero Adulteration", desc: "100% pure buffalo ghee with no additives, preservatives, or mixing." },
              { icon: Clock, title: "Traditional Process", desc: "Time-tested Bilona method — hand-churned curd for the purest ghee." },
              { icon: Truck, title: "Fresh Delivery", desc: "Freshly prepared and delivered to your doorstep across Delhi." },
              { icon: Droplets, title: "Trust & Quality", desc: "Loved by 500+ families. Our commitment to quality is unwavering." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_40px_rgba(92,58,33,0.1)] hover:-translate-y-2 transition-all duration-500 group border border-[#5C3A21]/5"
              >
                <div className="w-14 h-14 rounded-full bg-[#5C3A21] text-[#D4AF37] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#2C1A0E] transition-all duration-500 shadow-md">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold font-playfair mb-2 text-[#2C1A0E] group-hover:text-[#5C3A21] transition-colors">{item.title}</h3>
                <p className="text-[#2C1A0E]/55 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductsSection />
      <AboutSection />
      <ContactSection />

      {/* CSS for shine animation */}
      <style jsx global>{`
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}
