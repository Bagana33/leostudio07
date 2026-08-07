import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Plus, Minus, ArrowRight, ShieldCheck, Gift, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

const RECOMMENDATIONS = [
  {
    id: "cyanotype-poster",
    name: "Cyanotype Poster",
    price: 52,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "studio-tote-bag",
    name: "Studio Tote Bag",
    price: 38,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

interface CartDrawerProps {
  onOpenQPay: () => void;
}

export default function CartDrawer({ onOpenQPay }: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    giftWrap,
    setGiftWrap,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    addToCart,
    setActivePage,
    formatPrice,
    toggleWishlist,
    isInWishlist,
  } = useCart();

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setActivePage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over Drawer (Clean light theme matching Screenshot 1) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[440px] bg-white z-50 flex flex-col shadow-2xl text-slate-900"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-serif font-bold text-slate-900">Shopping Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Items List */}
              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <p className="text-sm text-slate-500 font-sans">Сагс одоогоор хоосон байна.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage("shop");
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold font-sans uppercase tracking-widest rounded-full"
                  >
                    Дэлгүүр хэсэх
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => {
                    const isWish = isInWishlist(item.id);
                    return (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl shrink-0 bg-slate-100"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-serif font-semibold text-slate-900">{item.name}</h3>
                            <button
                              onClick={() => toggleWishlist(item.id)}
                              className="text-slate-400 hover:text-red-500 p-0.5 transition-colors"
                            >
                              <Heart className={`w-4 h-4 ${isWish ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-slate-400 font-sans">{item.subtitle}</p>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-slate-200 rounded-lg px-2 py-0.5 space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-slate-500 hover:text-slate-900"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-medium px-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-slate-500 hover:text-slate-900"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-sans font-bold text-slate-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Gift Wrap Toggle Card (Matches Screenshot 1) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-[#0b4d82]" />
                  <span className="text-xs font-sans font-medium text-slate-800">Бэлгийн баглаа нэмэх</span>
                </div>
                <button
                  onClick={() => setGiftWrap(!giftWrap)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    giftWrap ? "bg-[#0b4d82]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      giftWrap ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Recommendations (Matches Screenshot 1) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-slate-800">
                  <Sparkles className="w-4 h-4 text-[#0b4d82]" />
                  <span>You might also like</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {RECOMMENDATIONS.map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() =>
                        addToCart({
                          id: rec.id,
                          name: rec.name,
                          subtitle: "Atelier Special",
                          price: rec.price,
                          image: rec.image,
                        })
                      }
                      className="cursor-pointer group flex flex-col space-y-2"
                    >
                      <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-medium text-slate-900">{rec.name}</h4>
                        <span className="text-xs font-sans font-bold text-slate-900">{formatPrice(rec.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Order Summary (Matches Screenshot 1) */}
            <div className="p-6 border-t border-slate-100 bg-white space-y-4">
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-slate-500">
                  <span>Дэд дүн</span>
                  <span className="font-sans font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Хүргэлт</span>
                  <span className="font-sans font-semibold text-slate-900">Үнэгүй</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-slate-900 border-t border-slate-100 pt-3">
                  <span>Нийт дүн</span>
                  <span className="font-sans font-bold text-[#0b4d82]">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={handleGoToCheckout}
                disabled={cart.length === 0}
                className="w-full py-4 bg-[#0b4d82] text-white text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 rounded-xl shadow-lg disabled:opacity-40"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-sans">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Аюулгүй төлбөр тооцоо</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
