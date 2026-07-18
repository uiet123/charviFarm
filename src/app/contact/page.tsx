"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      {/* CTA Section (Adapted for Contact Page) */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 px-6 overflow-hidden flex-shrink-0"
      >
        <div className="absolute inset-0">
          <Image src="/ghee-pic.png" alt="Ghee Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#2C1A0E]/88 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-playfair font-bold mb-6"
          >
            Get In <span className="italic text-[#D4AF37]">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/65 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Ready to taste pure tradition? Call us or send a WhatsApp message to order your jar of premium buffalo ghee. We provide free home delivery across Delhi.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Phone */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

            {/* WhatsApp */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
    </div>
  );
}
