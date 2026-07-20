"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    question: "What is Bilona Method?",
    answer: "The Bilona method is the traditional Indian way of making pure ghee. Instead of extracting fat directly from milk, the milk is first cultured into curd (dahi). This curd is then hand-churned in two directions using a wooden churner (Bilona) to separate the makkhan (butter). This butter is then slowly heated over a gentle flame to create 100% pure, nutrient-rich A2 ghee."
  },
  {
    question: "Is your ghee 100% pure and adulteration-free?",
    answer: "Absolutely. At Charvi Farm, purity is our highest priority. We use 100% pure buffalo milk from our own healthy, grass-fed cattle. There are no preservatives, artificial colors, or cheap oils mixed in. Just pure, thick, and fresh ghee."
  },
  {
    question: "How long does the ghee stay fresh?",
    answer: "Pure Bilona ghee has an excellent shelf life. When stored in a cool, dry place away from direct sunlight, it easily lasts up to 9-12 months. Since it contains no moisture, it doesn't spoil quickly. Always use a clean, dry spoon!"
  },
  {
    question: "Do you deliver all over Delhi?",
    answer: "Yes! We proudly deliver our fresh, farm-made ghee, wood-pressed oil, and curd directly from our farm to homes all across Delhi (with a ₹100 shipping charge). We ensure fast and safe packaging so the products reach you in perfect condition."
  },
  {
    question: "What makes your Wood-Pressed Sarso Oil special?",
    answer: "Our Mustard (Sarso) Oil is Kacchi Ghani, meaning it is wood-pressed at a very low temperature without any chemicals or refining processes. This retains its natural pungency, dark rich color, and essential nutrients that are otherwise destroyed in regular refined oils."
  },
  {
    question: "How can I place a bulk order for a special occasion?",
    answer: "We would love to serve you! For bulk orders, simply call us at 9871206163 or drop us an email. We offer special packaging and rates for weddings, festivals, and large events."
  }
];

function FAQItem({ faq, isOpen, onClick }: { faq: any; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border ${isOpen ? 'border-[#D4AF37]/50 shadow-md' : 'border-[#5C3A21]/10'} rounded-2xl bg-white overflow-hidden transition-all duration-300`}
    >
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
      >
        <span className={`font-playfair font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-[#2C1A0E] hover:text-[#5C3A21]'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: smoothEase }}
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#5C3A21]/5 text-[#5C3A21]'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
          >
            <div className="px-6 pb-6 text-[#2C1A0E]/70 leading-relaxed font-light">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5C3A21]/10 to-transparent mb-4"></div>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#fcfaf5] pt-12 pb-24 px-6 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#2C1A0E" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-pattern)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-6 shadow-sm border border-[#D4AF37]/20">
            <HelpCircle size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1A0E] mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
          <p className="text-[#2C1A0E]/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Everything you need to know about our traditional farm processes, product purity, and delivery.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Still Have Questions Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-[#5C3A21] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-[#D4AF37] mb-4 relative z-10">
            Still have questions?
          </h3>
          <p className="text-white/80 font-light mb-8 relative z-10">
            We are always here to help you out with any doubts about our 100% pure products.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3.5 bg-[#D4AF37] text-[#2C1A0E] font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative z-10"
          >
            Contact Us Today
          </a>
        </motion.div>
      </div>
    </main>
  );
}
