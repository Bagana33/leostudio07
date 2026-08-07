import { motion } from "motion/react";
import { Menu, X, ShoppingBag, Info, Globe } from "lucide-react";
import { useState } from "react";
import { useCart, PageView } from "../context/CartContext";

import logoImage from "@/assets/images/Asset 2@3x.png";

interface HeaderProps {
  onOpenQPay: () => void;
}

export default function Header({ onOpenQPay }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, setIsCartOpen, activePage, setActivePage, currency, toggleCurrency } = useCart();

  const handleNavClick = (page: PageView, hash?: string) => {
    setActivePage(page);
    setIsOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isBlueHeader = activePage === "home";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        isBlueHeader
          ? "bg-[#031525]/65 backdrop-blur-xl border-white/10 text-white shadow-2xl shadow-black/40"
          : "bg-[#04192d]/85 backdrop-blur-xl border-white/10 text-white shadow-2xl"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <button onClick={() => handleNavClick("home")} className="flex items-center gap-2 group">
          <img
            src={logoImage}
            alt="LEO STUDIO"
            className="h-7 md:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
          />
        </button>

        {/* Right Navigation Bar (Icons + Text) */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick("shop")}
            className={`flex items-center gap-2 text-xs tracking-[0.2em] font-sans font-semibold transition-all uppercase ${
              activePage === "shop"
                ? "text-white border-b-2 border-white pb-0.5"
                : "text-white/70 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>SHOP</span>
          </button>

          <button
            onClick={() => handleNavClick("about", "#story")}
            className={`flex items-center gap-2 text-xs tracking-[0.2em] font-sans font-semibold transition-all uppercase ${
              activePage === "about"
                ? "text-white border-b-2 border-white pb-0.5"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>ABOUT</span>
          </button>

          {/* Currency Toggle */}
          <button
            onClick={toggleCurrency}
            className="px-2.5 py-1 text-[10px] font-mono font-bold rounded uppercase transition-colors border border-white/20 text-white bg-white/10 hover:bg-white/20"
          >
            <Globe className="w-3 h-3 inline mr-1" />
            {currency}
          </button>

          {/* Cart Icon Trigger with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full transition-transform hover:scale-105"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-slate-900 text-[9px] font-mono font-bold rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-slate-900 text-[9px] font-mono font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t p-6 space-y-4 text-center bg-[#031525]/95 backdrop-blur-2xl border-white/10 text-white"
        >
          <div className="flex flex-col space-y-4 text-xs font-sans font-bold tracking-widest uppercase">
            <button onClick={() => handleNavClick("shop")} className="py-2 flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> SHOP
            </button>
            <button onClick={() => handleNavClick("about", "#story")} className="py-2 flex items-center justify-center gap-2">
              <Info className="w-4 h-4" /> ABOUT
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
