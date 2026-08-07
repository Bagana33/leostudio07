/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CollectionGrid from "./components/CollectionGrid";
import FeaturedCollection from "./components/FeaturedCollection";
import ProductDetailView from "./components/ProductDetailView";
import CheckoutView from "./components/CheckoutView";
import Process from "./components/Process";
import Story from "./components/Story";
import CareGuide from "./components/CareGuide";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CartDrawer from "./components/CartDrawer";
import QPayModal from "./components/QPayModal";
import { CartProvider, useCart } from "./context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";

function MainAppContent() {
  const { activePage, toast, hideToast, setActivePage } = useCart();

  const [qpayModalData, setQpayModalData] = useState<{
    isOpen: boolean;
    productName: string;
    amount: number;
  }>({
    isOpen: false,
    productName: "LEO STUDIO — Ателье Захиалга",
    amount: 189000,
  });

  const handleOpenQPay = (productName = "LEO STUDIO — Ателье Захиалга", amount = 189000) => {
    setQpayModalData({
      isOpen: true,
      productName,
      amount,
    });
  };

  return (
    <div className="min-h-screen selection:bg-brand-cyan/20 selection:text-brand-cyan bg-brand-cream relative overflow-x-hidden">
      <ScrollProgress />

      {/* Atmospheric Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Top Fixed Header */}
      <Header onOpenQPay={() => handleOpenQPay()} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onOpenQPay={() => handleOpenQPay()} />

      {/* Dynamic View Switcher */}
      <main className={`relative z-10 ${activePage === "home" ? "" : "pt-16 md:pt-20"}`}>
        {activePage === "home" && (
          <>
            <Hero />
            <CollectionGrid />
            <Story />
            <Process />
            <CareGuide />
            <Contact />
          </>
        )}

        {activePage === "shop" && (
          <CollectionGrid />
        )}

        {activePage === "product" && (
          <ProductDetailView onOpenQPay={handleOpenQPay} />
        )}

        {activePage === "about" && (
          <>
            <Story />
            <CareGuide />
            <Contact />
          </>
        )}



        {activePage === "checkout" && (
          <CheckoutView onOpenQPay={(amountMNT) => handleOpenQPay("LEO STUDIO Order", amountMNT)} />
        )}
      </main>

      <Footer />

      {/* QPay Payment Modal */}
      <QPayModal
        isOpen={qpayModalData.isOpen}
        onClose={() => setQpayModalData((prev) => ({ ...prev, isOpen: false }))}
        productName={qpayModalData.productName}
        amount={qpayModalData.amount}
      />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-brand-prussian text-brand-cream border border-brand-gold/40 p-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-md"
          >
            {toast.image ? (
              <img src={toast.image} alt="Product" className="w-12 h-14 object-cover rounded border border-brand-cream/20 shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}

            <div className="flex-1 space-y-0.5 font-sans">
              <h4 className="text-xs font-serif font-bold text-brand-gold">{toast.title}</h4>
              {toast.message && <p className="text-[11px] text-brand-cream/80 line-clamp-1">{toast.message}</p>}
            </div>

            <button onClick={hideToast} className="p-1 text-brand-cream/50 hover:text-brand-cream transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
