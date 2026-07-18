"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Send, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Namaste! 🙏 Welcome to Charvi Farm. How can I help you today?", sender: "bot" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setChatInput("");

    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let botResponse = "I'm sorry, I didn't quite catch that. You can contact us directly at 9871206163 or via WhatsApp.";
      
      const isPriceQuery = lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("rate") || lowerInput.includes("kitne ka");

      if (lowerInput.includes("paneer")) {
        if (isPriceQuery) botResponse = "The price for Fresh & Soft Paneer will be announced soon! It's currently marked as 'Coming Soon'.";
        else botResponse = "We will be launching our Fresh & Soft Paneer very soon! Stay tuned.";
      } else if (lowerInput.includes("curd") || lowerInput.includes("dahi")) {
        if (isPriceQuery) botResponse = "The price for Fresh & Thick Curd will be announced soon! It's currently marked as 'Coming Soon'.";
        else botResponse = "Our Fresh & Thick Curd made from Pure Buffalo Milk is launching soon!";
      } else if (lowerInput.includes("oil") || lowerInput.includes("sarso") || lowerInput.includes("tel")) {
        if (isPriceQuery) botResponse = "The price for Pure Sarso Oil will be announced soon! It's currently marked as 'Coming Soon'.";
        else botResponse = "Our Kacchi Ghani Wood Pressed Sarso Oil is coming soon!";
      } else if (isPriceQuery || lowerInput.includes("ghee kitne")) {
        botResponse = "Our Pure Desi Buffalo Ghee is priced at ₹1,800 per kg. We offer free delivery in Delhi.";
      } else if (lowerInput.includes("delivery") || lowerInput.includes("shipping")) {
        botResponse = "We provide FREE home delivery across Delhi! Orders are typically delivered within 24-48 hours.";
      } else if (lowerInput.includes("pure") || lowerInput.includes("quality") || lowerInput.includes("bilona")) {
        botResponse = "Our ghee is 100% pure and unadulterated. We use the traditional Bilona method, hand-churning curd from buffalo milk without any additives.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("call") || lowerInput.includes("number")) {
        botResponse = "You can reach us at 9871206163 or visit us at B1/22 Aman Vihar, Kirari Suleman Nagar, Delhi.";
      } else if (lowerInput.includes("product") || lowerInput.includes("item") || lowerInput.includes("kya hai") || lowerInput.includes("sell")) {
        botResponse = "We currently sell Pure Desi Buffalo Ghee. Soon we will also be offering Fresh Curd, Sarso Oil, and Fresh Paneer!";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey") || lowerInput.includes("namaste")) {
        botResponse = "Hello! How can I assist you with your order today?";
      }

      setChatMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white w-[320px] sm:w-[350px] rounded-2xl shadow-[0_15px_40px_rgba(44,26,14,0.15)] overflow-hidden mb-4 border border-[#5C3A21]/10 flex flex-col h-[400px]"
          >
            {/* Header */}
            <div className="bg-[#5C3A21] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Bot" width={32} height={32} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Charvi Farm Assistant</h4>
                  <p className="text-[10px] text-white/70">Usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f5f0e8]/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-[#5C3A21] text-white rounded-br-sm' 
                        : 'bg-white text-[#2C1A0E] border border-[#5C3A21]/10 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#5C3A21]/10 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#f5f0e8] text-[#2C1A0E] text-sm rounded-xl px-4 py-2.5 outline-none border border-transparent focus:border-[#D4AF37]/50 transition-colors"
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim()}
                className="bg-[#D4AF37] text-[#2C1A0E] p-2.5 rounded-xl disabled:opacity-50 hover:bg-[#5C3A21] hover:text-white transition-all shadow-sm"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="bg-[#D4AF37] text-[#2C1A0E] p-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center justify-center relative border border-[#5C3A21]/10"
        title="Chat with us"
      >
        {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isChatOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5C3A21] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#5C3A21] border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}
