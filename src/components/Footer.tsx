"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3E2714] text-white pt-16 pb-8 px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-white/10 pb-12">
          {/* About */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
              <Image src="/logo.png" alt="Charvi Farm" width={44} height={44} className="rounded-full object-cover border-2 border-[#D4AF37]/40" />
              <span className="font-playfair font-bold text-2xl">Charvi Farm</span>
            </div>
            <p className="text-white/50 text-sm max-w-md leading-relaxed mb-6">
              Bringing the purest, unadulterated buffalo ghee from our farm directly to your kitchen. Every jar is a promise of tradition, purity, and love.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/charvifarmofficial/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:scale-110 transition-all duration-300" title="Instagram">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://wa.me/919871206163" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:scale-110 transition-all duration-300" title="WhatsApp">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-5 text-[#D4AF37] tracking-[0.1em] uppercase text-xs">Shop By Category</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li><Link href="/products" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"><ChevronRight size={12} />Buffalo Ghee</Link></li>
              <li><span className="text-white/30 flex items-center gap-2"><ChevronRight size={12} />Fresh Curd</span></li>
              <li><span className="text-white/30 flex items-center gap-2"><ChevronRight size={12} />Sarso Oil</span></li>
              <li><span className="text-white/30 flex items-center gap-2"><ChevronRight size={12} />Fresh Paneer</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold mb-5 text-[#D4AF37] tracking-[0.1em] uppercase text-xs">Contact Us</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>
                <a href="tel:9871206163" className="text-base font-semibold text-white hover:text-[#D4AF37] transition-colors flex items-center justify-center md:justify-start gap-2">
                  <Phone size={15} className="text-[#D4AF37]" /> 9871206163
                </a>
              </li>
              <li className="leading-relaxed flex items-start justify-center md:justify-start gap-2">
                <MapPin size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>B1/22 Aman Vihar,<br/>Kirari Suleman Nagar,<br/>Delhi, India 110086</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/25 text-xs">
          <p>&copy; {new Date().getFullYear()} Charvi Farm Dairy. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>100% Farm Fresh Guarantee</p>
            <span className="hidden md:inline text-white/10">|</span>
            <p>Powered by <span className="font-bold tracking-wider text-white/40">Pricodex Technologies</span></p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
