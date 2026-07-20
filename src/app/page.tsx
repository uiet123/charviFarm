"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShoppingBag, Star, Award, Droplets, Leaf, Shield, Truck, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Lenis from "lenis";
import { ProductsSection, AboutSection, ContactSection } from "@/components/HomeSections";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentBanner((prev) => (prev + 1) % 2);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

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

      {/* Banners Carousel */}
      <section className="relative w-full overflow-hidden bg-[#3E2714] h-[85vh] md:h-auto md:aspect-[21/9]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentBanner}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction > 0 ? "-100%" : "100%", zIndex: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-10"
          >
            {/* Desktop Banners */}
            <Image
              src={currentBanner === 0 ? "/banner_1.png" : "/banner_2.png"}
              alt={`Banner ${currentBanner + 1}`}
              fill
              className="hidden md:block object-cover"
              priority
            />
            {/* Mobile Phone Banners */}
            <Image
              src={currentBanner === 0 ? "/phone_banner_1_v3.png" : "/phone_banner_2_new.png"}
              alt={`Banner ${currentBanner + 1}`}
              fill
              className={`block md:hidden object-cover ${currentBanner === 0 ? 'custom-banner-pos' : 'object-center'}`}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            setDirection(-1);
            setCurrentBanner((prev) => (prev - 1 + 2) % 2);
          }}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/10 sm:bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 sm:text-white shadow-sm sm:shadow-lg transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
        <button
          onClick={() => {
            setDirection(1);
            setCurrentBanner((prev) => (prev + 1) % 2);
          }}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/10 sm:bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 sm:text-white shadow-sm sm:shadow-lg transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-400 ease-in-out ${currentBanner === index ? "bg-[#D4AF37] w-8 md:w-10" : "bg-white/60 hover:bg-white w-2.5"
                }`}
            />
          ))}
        </div>
      </section>



      {/* Scrolling Marquee */}
      <div className="bg-[#5C3A21] py-4 overflow-hidden whitespace-nowrap shadow-inner">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-6 md:gap-12 text-sm md:text-lg font-playfair italic text-[#D4AF37]"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-12 flex-shrink-0">
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
            className="text-center mb-10 md:mb-14"
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

      {/* Video Section */}
      <section className="py-10 md:py-12 bg-[#5C3A21] relative overflow-hidden flex items-center min-h-[70vh] md:min-h-[80vh]">
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[#D4AF37] mb-3">Our Story in Motion</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-5"></div>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Experience the pure, traditional process behind Charvi Farm's premium Bilona Ghee. Watch how we bring 100% purity from our farm straight to your home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-[#D4AF37]/30 aspect-video bg-black/50 backdrop-blur-sm group mx-auto max-h-[50vh] md:max-h-[60vh]"
          >
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.02]"
            >
              <source src="/charvi_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-white" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-white)" />
          </svg>
        </div>
      </section>
      <AboutSection />
      <ContactSection />

      {/* CSS for custom object position and shine animation */}
      <style jsx global>{`
        .custom-banner-pos {
          object-position: center 65% !important;
        }
        @keyframes shine {
          to { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}
