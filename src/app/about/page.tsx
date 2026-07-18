"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* About / Story Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#2C1A0E] mb-4">Our Heritage</h1>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
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

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
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
    </div>
  );
}
