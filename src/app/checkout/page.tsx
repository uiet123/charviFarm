"use client";

import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingBag, CreditCard, Home, Truck, Upload, X, ShieldCheck, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, getTotalPrice } = useCart();
  
  // States
  const [items, setItems] = useState<OrderItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse items from query or cart
  useEffect(() => {
    const buyNowId = searchParams.get("buyNow");
    const quantity = parseInt(searchParams.get("quantity") || "1", 10);

    if (buyNowId === "ghee") {
      setItems([
        {
          id: "ghee",
          name: "Pure Desi Ghee",
          price: 1200,
          image: "/products/ghee/ghee_product.jpeg",
          quantity: quantity,
        },
      ]);
    } else {
      // Use cart items
      const cartItems = Object.values(cart).map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));
      setItems(cartItems);
    }
  }, [cart, searchParams]);

  // Go back if no items in checkout
  useEffect(() => {
    const buyNowId = searchParams.get("buyNow");
    if (!buyNowId && Object.keys(cart).length === 0 && items.length === 0) {
      router.push("/cart");
    }
  }, [cart, items, router, searchParams]);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 100;
  const onlineDiscount = paymentMethod === "online" ? 50 : 0;
  const totalAmount = subtotal + shipping - onlineDiscount;

  const toPayNow = paymentMethod === "online" ? totalAmount : 200;
  const remainingOnDelivery = paymentMethod === "cod" ? totalAmount - 200 : 0;

  // Validation
  const isFormValid = 
    formData.name.trim() !== "" &&
    formData.phone.trim().length >= 10 &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.pincode.trim().length === 6 &&
    screenshot !== null;

  // Handle Form Submission / Redirect to WhatsApp
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !screenshot) return;

    setIsSubmitting(true);
    setUploadStatus("uploading");
    setShowRedirectModal(true);

    try {
      // 1. Upload payment screenshot directly from client using ImgBB
      let screenshotUrl = "";
      
      try {
        const formData = new FormData();
        formData.append("image", screenshot);
        
        const apiKey = "76fd34b14421a8e42e9301c5e6c19189";
        const uploadResponse = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: formData,
        });
        
        if (!uploadResponse.ok) {
           throw new Error("Failed to upload screenshot to server.");
        }
        
        const result = await uploadResponse.json();
        if (result.success && result.data && result.data.url) {
           screenshotUrl = result.data.url;
        } else {
           throw new Error("Failed to get screenshot link.");
        }
      } catch (err) {
        throw new Error("Failed to upload screenshot. Please check your internet connection.");
      }

      setUploadStatus("redirecting");

      // 2. Format WhatsApp Message
      let msg = `🌾 *CHARVI FARM - NEW ORDER* 🌾\n`;
      msg += `---------------------------------\n\n`;
      msg += `*👤 CUSTOMER DETAILS:*\n`;
      msg += `Name: ${formData.name}\n`;
      msg += `Phone: ${formData.phone}\n`;
      msg += `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n`;

      msg += `*📦 ORDER SUMMARY:*\n`;
      items.forEach((item) => {
        msg += `- ${item.name} (${item.quantity} kg) @ ₹${item.price}/kg: ₹${(item.price * item.quantity).toLocaleString("en-IN")}\n`;
      });
      msg += `Subtotal: ₹${subtotal.toLocaleString("en-IN")}\n`;
      msg += `Shipping Charge: ₹${shipping}\n`;
      if (paymentMethod === "online") {
        msg += `Online Pay Discount: -₹50\n`;
      }
      msg += `*Total Order Value: ₹${totalAmount.toLocaleString("en-IN")}*\n\n`;

      msg += `*💳 PAYMENT INFO:*\n`;
      msg += `Method: ${paymentMethod === "online" ? "Online Pre-payment (₹50 discount applied)" : "Cash On Delivery (COD)"}\n`;
      msg += `Paid via UPI: ₹${toPayNow.toLocaleString("en-IN")}\n`;
      msg += `Payment Screenshot Link: ${screenshotUrl}\n`;
      if (paymentMethod === "cod") {
        msg += `Remaining Amount to pay on delivery: ₹${remainingOnDelivery.toLocaleString("en-IN")}\n`;
      }
      msg += `\n_Note: Click the screenshot link above to view payment receipt._`;

      // Delay open to let user read the popup modal instructions
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/919871206163?text=${encodeURIComponent(msg)}`;
        window.location.href = whatsappUrl;
        setIsSubmitting(false);
        // Reset state
        setShowRedirectModal(false);
        setUploadStatus("idle");
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "There was an issue uploading your payment screenshot. Please try again.");
      setUploadStatus("error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-12 px-4 md:px-6 pt-24 font-inter text-[#2C1A0E]">
      {/* Checkout Instructions Modal */}
      <AnimatePresence>
        {showRedirectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#D4AF37]/20 text-center"
            >
              {uploadStatus === "uploading" && (
                <>
                  <div className="w-16 h-16 bg-[#5C3A21]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#5C3A21] flex justify-center items-center">
                    <svg className="animate-spin h-8 w-8 text-[#5C3A21] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-[#2C1A0E]">Uploading Payment Screenshot...</h3>
                  <p className="text-[#2C1A0E]/70 text-sm leading-relaxed mb-6">
                    We are securely uploading your transaction receipt. Please do not close or refresh this page.
                  </p>
                </>
              )}

              {uploadStatus === "redirecting" && (
                <>
                  <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#5C3A21]">
                    <Truck size={32} className="animate-bounce" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-4">Redirecting to WhatsApp...</h3>
                  <p className="text-[#2C1A0E]/70 text-sm leading-relaxed mb-6">
                    Your payment screenshot was uploaded successfully! Once WhatsApp opens:
                  </p>
                  <div className="bg-[#f5f0e8] p-4 rounded-xl text-left space-y-3 mb-6 border border-[#5C3A21]/10">
                    <div className="flex gap-3 items-start text-sm">
                      <span className="flex items-center justify-center bg-[#5C3A21] text-white rounded-full w-5 h-5 text-xs font-bold shrink-0 mt-0.5">1</span>
                      <p>Send the auto-copied text message in the chat.</p>
                    </div>
                    <div className="flex gap-3 items-start text-sm">
                      <span className="flex items-center justify-center bg-[#5C3A21] text-white rounded-full w-5 h-5 text-xs font-bold shrink-0 mt-0.5">2</span>
                      <p>The message contains a **direct link to your payment screenshot** for the admin to verify.</p>
                    </div>
                  </div>
                  <p className="text-xs text-yellow-600 font-medium">Please do not close this window.</p>
                </>
              )}

              {uploadStatus === "error" && (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                    <X size={32} />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold mb-4 text-[#2C1A0E]">Upload Failed</h3>
                  <p className="text-[#2C1A0E]/70 text-sm leading-relaxed mb-6">
                    {errorMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRedirectModal(false)}
                    className="px-6 py-2.5 bg-[#5C3A21] hover:bg-[#D4AF37] hover:text-[#2C1A0E] text-white rounded-xl font-bold text-sm transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#5C3A21] hover:text-[#D4AF37] font-semibold mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#2C1A0E] mb-10 flex items-center gap-3">
          Checkout Details
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Step 1: Shipping Address */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#5C3A21]/10">
                <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-2 text-[#5C3A21]">
                  <Home size={22} />
                  1. Shipping Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="House No, Building Name, Street Name, Area"
                      className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="City"
                        className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="State"
                        className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C1A0E]/60 uppercase tracking-wider mb-2">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        maxLength={6}
                        placeholder="6-digit pincode"
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-3 rounded-xl border border-[#5C3A21]/20 bg-[#fcfaf5] text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#5C3A21]/10">
                <h2 className="font-playfair text-2xl font-bold mb-6 flex items-center gap-2 text-[#5C3A21]">
                  <CreditCard size={22} />
                  2. Payment Method
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Online Payment Option */}
                  <label className={`relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    paymentMethod === "online" 
                      ? "border-[#D4AF37] bg-[#D4AF37]/5" 
                      : "border-[#5C3A21]/15 hover:border-[#5C3A21]/30 bg-white"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Online Pay</span>
                      <span className="bg-green-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">Save ₹50</span>
                    </div>
                    <span className="text-xs text-[#2C1A0E]/60 font-light leading-relaxed">
                      Pay fully online using UPI and get a flat ₹50 discount on your order.
                    </span>
                  </label>

                  {/* COD Option */}
                  <label className={`relative flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    paymentMethod === "cod" 
                      ? "border-[#D4AF37] bg-[#D4AF37]/5" 
                      : "border-[#5C3A21]/15 hover:border-[#5C3A21]/30 bg-white"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Cash On Delivery</span>
                    </div>
                    <span className="text-xs text-[#2C1A0E]/60 font-light leading-relaxed">
                      Pay ₹200 order confirmation advance online. Pay the remaining amount on delivery.
                    </span>
                  </label>
                </div>

                {/* Display Payment instructions and QR */}
                <div className="bg-[#fcfaf5] border border-[#5C3A21]/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-36 h-36 border-2 border-white rounded-xl shadow-md overflow-hidden shrink-0 bg-white">
                    <Image
                      src="/qr_code.jpeg"
                      alt="Charvi Farm UPI QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="flex-grow space-y-3 text-center md:text-left">
                    <h4 className="font-bold font-playfair text-lg text-[#5C3A21]">
                      Scan to Pay: <span className="text-xl text-[#2C1A0E]">₹{toPayNow.toLocaleString("en-IN")}</span>
                    </h4>
                    <p className="text-xs text-[#2C1A0E]/70 leading-relaxed font-light">
                      Please scan this UPI QR code using any app (GPay, PhonePe, Paytm, BHIM) to make the payment of 
                      <strong> ₹{toPayNow}</strong>.
                    </p>
                    {paymentMethod === "cod" && (
                      <div className="inline-flex gap-2 items-center bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-[11px] text-amber-800 font-medium">
                        <Info size={14} />
                        ₹200 advance secures COD. Pay remainder on delivery.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Upload Screenshot */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#5C3A21]/10">
                <h2 className="font-playfair text-2xl font-bold mb-4 flex items-center gap-2 text-[#5C3A21]">
                  <Upload size={22} />
                  3. Upload Payment Screenshot
                </h2>
                <p className="text-xs text-[#2C1A0E]/60 font-light leading-relaxed mb-6">
                  Please upload a screenshot of your successful transaction to confirm your payment.
                </p>

                {screenshotPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-[#5C3A21]/10 aspect-video max-w-sm mx-auto bg-gray-50 flex items-center justify-center p-2 group shadow-inner">
                    <Image
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow"
                      title="Remove Screenshot"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#5C3A21]/20 hover:border-[#D4AF37] bg-[#fcfaf5] hover:bg-[#D4AF37]/5 transition-all rounded-2xl py-10 flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <Upload size={36} className="text-[#5C3A21]/40 group-hover:text-[#5C3A21] group-hover:scale-110 transition-transform mb-3" />
                    <span className="font-bold text-sm text-[#5C3A21] group-hover:text-[#2C1A0E]">Click to Upload Screenshot</span>
                    <span className="text-xs text-[#2C1A0E]/50 mt-1">Supports JPEG, PNG</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Complete Payment Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4.5 rounded-2xl text-white font-bold text-center flex items-center justify-center gap-3 transition-all duration-300 shadow-lg text-lg uppercase tracking-wider ${
                  isFormValid && !isSubmitting
                    ? "bg-[#5C3A21] hover:bg-[#D4AF37] hover:text-[#2C1A0E] hover:-translate-y-1 cursor-pointer"
                    : "bg-[#2C1A0E]/20 text-[#2C1A0E]/30 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? "Processing..." : "Confirm Payment & Place Order"}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(92,58,33,0.06)] border border-[#5C3A21]/10">
              <h3 className="font-playfair text-2xl font-bold text-[#2C1A0E] mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#D4AF37]" />
                Order Summary
              </h3>

              {/* Items Breakdown */}
              <div className="divide-y divide-[#5C3A21]/10 max-h-60 overflow-y-auto mb-6 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#5C3A21]/10 bg-[#f5f0e8]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-playfair font-bold text-[#2C1A0E] text-base leading-tight">{item.name}</h4>
                      <p className="text-xs text-[#2C1A0E]/60 mt-1">₹{item.price.toLocaleString("en-IN")} / kg</p>
                      <p className="text-xs font-bold text-[#5C3A21] mt-0.5">Qty: {item.quantity} kg</p>
                    </div>
                    <span className="font-bold text-[#2C1A0E]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation Summary */}
              <div className="space-y-4 pt-6 border-t border-[#5C3A21]/10">
                <div className="flex justify-between text-[#2C1A0E]/70 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#2C1A0E]/70 text-sm font-medium">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                {paymentMethod === "online" && (
                  <div className="flex justify-between text-green-600 text-sm font-bold">
                    <span>Online Pay Discount</span>
                    <span>-₹{onlineDiscount}</span>
                  </div>
                )}
                
                <div className="border-t border-[#5C3A21]/10 pt-4 flex justify-between items-center font-bold">
                  <span className="text-base text-[#2C1A0E]">Total Order Value</span>
                  <span className="text-2xl text-[#5C3A21]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Payment Allocation Box */}
              <div className="mt-6 p-4.5 rounded-2xl bg-[#fcfaf5] border border-[#D4AF37]/35 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#2C1A0E]/70 font-medium">To Pay Online (Now)</span>
                  <span className="text-lg font-bold text-[#5C3A21]">₹{toPayNow.toLocaleString("en-IN")}</span>
                </div>
                
                {paymentMethod === "cod" && (
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-[#5C3A21]/5 text-amber-800">
                    <span className="font-medium">Remaining on Delivery</span>
                    <span className="text-lg font-bold">₹{remainingOnDelivery.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              {/* Safety Badges */}
              <div className="mt-8 pt-6 border-t border-[#5C3A21]/10 flex items-center justify-center gap-4 text-xs text-[#2C1A0E]/50 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-green-600" />
                  <span>Secure Payments</span>
                </div>
                <span className="w-1 h-1 bg-[#2C1A0E]/20 rounded-full"></span>
                <span>Trusted by 500+ Families</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="text-center font-playfair text-[#2C1A0E] text-2xl animate-pulse">
          Loading checkout details...
        </div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}
