"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Lock, Plus, Minus, X, Check, Droplets, Leaf, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, use } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const productsData = {
  ghee: {
    title: "Pure Desi Ghee",
    subtitle: "Made from Pure Buffalo Milk",
    images: ["/products/ghee/ghee1.jpeg", "/products/ghee/ghee2.jpeg"],
    price: 1200,
    unit: "kg",
    status: "available",
    description: "Experience the authentic taste and aroma of our Pure Desi Buffalo Ghee, hand-churned using the traditional Bilona method. Packed with nutrients and crafted without any preservatives or artificial flavors, it brings pure tradition straight to your home."
  },
  curd: {
    title: "Fresh & Thick Curd",
    subtitle: "Made from Pure Buffalo Milk",
    images: ["/products/curd/curd1.jpeg", "/products/curd/curd2.jpeg"],
    price: null,
    unit: "kg",
    status: "coming_soon",
    description: "Savor the rich, creamy texture of our Fresh & Thick Curd, set daily using pure buffalo milk. Perfect for a refreshing lassi, a cool raita, or as a wholesome addition to any meal."
  },
  oil: {
    title: "Pure Sarso Oil",
    subtitle: "Kacchi Ghani Wood Pressed",
    images: ["/products/oil/oil1.jpeg", "/products/oil/oil2.jpeg"],
    price: null,
    unit: "litre",
    status: "coming_soon",
    description: "Our Pure Sarso Oil is extracted using the traditional Kacchi Ghani wood-pressed method, ensuring it retains all its natural nutrients, robust flavor, and pungent aroma. Ideal for authentic Indian cooking."
  },
  paneer: {
    title: "Fresh & Soft Paneer",
    subtitle: "Made from Pure Buffalo Milk",
    images: ["/products/paneer/panner1.jpeg", "/products/paneer/panner2.jpeg"],
    price: null,
    unit: "kg",
    status: "coming_soon",
    description: "Indulge in our beautifully soft, malai-rich paneer. Made fresh daily from pure buffalo milk, it naturally absorbs flavors and adds a melt-in-the-mouth perfection to your favorite curries and snacks."
  }
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id as keyof typeof productsData;
  const product = productsData[id];

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { cart, updateQuantity } = useCart();
  const router = useRouter();
  
  const cartItem = cart[id];
  const currentQuantity = cartItem?.quantity || 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] pt-24 pb-12 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-playfair font-bold text-[#2C1A0E] mb-4">Product Not Found</h1>
        <p className="text-[#2C1A0E]/60 mb-8">The product you are looking for does not exist.</p>
        <Link href="/products" className="bg-[#5C3A21] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all">
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-20 pb-12">
      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutModalOpen && product.status === "available" && (
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
                  <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#2C1A0E] mb-2 tracking-tight">Complete Order</h3>
                <p className="text-[#2C1A0E]/60 text-sm font-light max-w-[250px]">How many {product.unit} of {product.title} would you like?</p>
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

              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-[#2C1A0E]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-lg md:text-xl font-bold text-[#5C3A21]">₹{((product.price || 0) * orderQuantity).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-[#2C1A0E]/50 text-xs md:text-sm font-bold uppercase tracking-widest">Shipping</span>
                <span className="text-lg md:text-xl font-bold text-[#5C3A21]">₹100</span>
              </div>
              <div className="flex justify-between items-center mb-8 px-2 pt-4 border-t border-[#5C3A21]/10">
                <span className="text-[#2C1A0E]/50 text-sm md:text-base font-bold uppercase tracking-widest">Total Amount</span>
                <span className="text-2xl md:text-3xl font-bold text-[#5C3A21]">₹{(((product.price || 0) * orderQuantity) + 100).toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={() => {
                  window.location.href = `/checkout?buyNow=${id}&quantity=${orderQuantity}`;
                  setIsCheckoutModalOpen(false);
                }}
                className="w-full py-4 rounded-xl bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(92,58,33,0.25)] text-base uppercase tracking-wider"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-[#5C3A21] hover:text-[#D4AF37] transition-colors mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#5C3A21]/10 relative h-[400px] md:h-[600px] bg-white flex flex-col items-center justify-center p-4 group"
          >
             <div className="relative w-full h-full">
               <Image src={product.images[currentImageIndex]} alt={product.title} fill className="object-contain p-4 transition-opacity duration-500" />
             </div>
             
             {product.images.length > 1 && (
               <>
                 {/* Arrows */}
                 <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                   <button
                     onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                     className="p-2 rounded-full bg-white/80 text-[#5C3A21] shadow-md hover:bg-white hover:scale-110 transition-all backdrop-blur-sm pointer-events-auto"
                   >
                     <ChevronLeft size={24} />
                   </button>
                   <button
                     onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                     className="p-2 rounded-full bg-white/80 text-[#5C3A21] shadow-md hover:bg-white hover:scale-110 transition-all backdrop-blur-sm pointer-events-auto"
                   >
                     <ChevronRight size={24} />
                   </button>
                 </div>

                 {/* Dots */}
                 <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
                   {product.images.map((_, idx) => (
                     <button
                       key={idx}
                       onClick={() => setCurrentImageIndex(idx)}
                       className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${currentImageIndex === idx ? 'bg-[#5C3A21] scale-125' : 'bg-[#5C3A21]/30 hover:bg-[#5C3A21]/60'}`}
                     />
                   ))}
                 </div>
               </>
             )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-[#5C3A21]/70 font-bold uppercase tracking-[0.2em] mb-2">{product.subtitle}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-extrabold text-[#2C1A0E] mb-6 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
               {product.status === "available" ? (
                 <>
                   <span className="text-4xl md:text-5xl font-bold text-[#5C3A21]">₹{product.price?.toLocaleString('en-IN')}</span>
                   <span className="text-xl text-[#2C1A0E]/50 font-medium">/{product.unit}</span>
                 </>
               ) : (
                 <span className="text-2xl font-medium text-[#2C1A0E]/40 italic">Price coming soon</span>
               )}
            </div>

            <p className="text-lg text-[#2C1A0E]/70 leading-relaxed mb-10">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
               {product.status === "available" ? (
                 <div className="flex w-full gap-4">
                   {currentQuantity === 0 ? (
                     <button
                        onClick={() => {
                          updateQuantity({
                            id: id,
                            name: product.title,
                            price: product.price || 0,
                            image: product.images[0],
                          }, 1);
                        }}
                        className="flex-1 px-4 py-4 rounded-xl bg-white text-[#5C3A21] font-bold text-center flex items-center justify-center gap-2 hover:bg-[#f5f0e8] transition-all duration-300 shadow-md border-2 border-[#5C3A21] text-lg cursor-pointer"
                      >
                        <ShoppingBag size={20} />
                        Add to Cart
                      </button>
                   ) : (
                      <div className="flex-1 flex items-center justify-between bg-[#f5f0e8] py-2 px-4 rounded-xl shadow-inner border border-[#5C3A21]/20">
                        <button 
                          onClick={() => updateQuantity(cartItem, currentQuantity - 1)}
                          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2C1A0E] shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                          <Minus size={18} strokeWidth={2.5} />
                        </button>
                        <span className="text-2xl font-bold font-playfair text-[#2C1A0E] w-10 text-center">{currentQuantity}</span>
                        <button 
                          onClick={() => updateQuantity(cartItem, currentQuantity + 1)}
                          className="w-10 h-10 rounded-full bg-[#5C3A21] flex items-center justify-center text-white shadow-sm hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:scale-105 active:scale-95 transition-all"
                        >
                          <Plus size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                   )}
                   
                   <button
                      onClick={() => {
                        if (currentQuantity === 0) {
                          updateQuantity({
                            id: id,
                            name: product.title,
                            price: product.price || 0,
                            image: product.images[0],
                          }, 1);
                        }
                        router.push("/cart");
                      }}
                      className="flex-1 px-4 py-4 rounded-xl bg-[#5C3A21] text-white font-bold text-center flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#2C1A0E] transition-all duration-300 shadow-lg text-lg cursor-pointer"
                    >
                      Buy Now
                    </button>
                 </div>
               ) : (
                  <div className="flex-1 px-8 py-4 rounded-xl bg-[#5C3A21]/15 text-[#2C1A0E]/40 font-bold text-center flex items-center justify-center gap-2 text-lg cursor-not-allowed border border-[#5C3A21]/10">
                    <Lock size={18} />
                    Coming Soon
                  </div>
               )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#5C3A21]/5">
                 <div className="w-10 h-10 rounded-full bg-[#5C3A21]/10 flex items-center justify-center text-[#5C3A21]">
                   <Check size={18} />
                 </div>
                 <span className="font-medium text-[#2C1A0E] text-sm">100% Pure</span>
               </div>
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#5C3A21]/5">
                 <div className="w-10 h-10 rounded-full bg-[#5C3A21]/10 flex items-center justify-center text-[#5C3A21]">
                   <Shield size={18} />
                 </div>
                 <span className="font-medium text-[#2C1A0E] text-sm">No Preservatives</span>
               </div>
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#5C3A21]/5">
                 <div className="w-10 h-10 rounded-full bg-[#5C3A21]/10 flex items-center justify-center text-[#5C3A21]">
                   <Droplets size={18} />
                 </div>
                 <span className="font-medium text-[#2C1A0E] text-sm">Freshly Made</span>
               </div>
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#5C3A21]/5">
                 <div className="w-10 h-10 rounded-full bg-[#5C3A21]/10 flex items-center justify-center text-[#5C3A21]">
                   <Leaf size={18} />
                 </div>
                 <span className="font-medium text-[#2C1A0E] text-sm">Natural Ingredients</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
