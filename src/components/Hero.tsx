import React from "react";
import { motion } from "motion/react";
import processImage from "@/assets/images/process-1.png";
import heroBg from "@/assets/images/hero-bg.jpg";
import { useCart } from "../context/CartContext";
import { ArrowUpRight, Compass } from "lucide-react";

export default function Hero() {
  const { setActivePage } = useCart();

  const handleShopClick = () => {
    setActivePage("shop");
    setTimeout(() => {
      const el = document.querySelector("#collection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section id="hero" className="relative min-h-screen bg-[#0b4d82] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Image Container with Model */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt="Art is Wearable Cyanotype"
          className="w-full h-full object-cover object-center opacity-90 brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07365c]/90 via-[#07365c]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#052946] via-transparent to-[#07365c]/30"></div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-12 pt-28 pb-12 flex-1 flex flex-col justify-between">
        <div className="max-w-2xl space-y-6 pt-8">
          {/* Collection Tag */}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-white/70"></span>
            <span className="text-[11px] tracking-[0.4em] font-mono uppercase text-white/90 font-medium">
              COLLECTION 01
            </span>
          </div>

          {/* Huge Serif Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-serif font-normal tracking-tight leading-[0.95] text-white">
            ART IS <br /> WEARABLE
          </h1>

          {/* Paragraph */}
          <p className="text-sm md:text-base font-sans font-light leading-relaxed text-white/80 max-w-lg pt-2">
            Handmade culture reimagined. Each piece is a cyanotype canvas — art you can wear, crafted by hand in the LEO STUDIO atelier.
          </p>

          {/* Sub-tags */}
          <div className="flex items-center gap-8 pt-4 text-[10px] tracking-[0.3em] font-sans font-semibold uppercase text-white/70">
            <span>ART IS WEARABLE</span>
            <span>HANDMADE CULTURE</span>
          </div>
        </div>

        {/* Bottom Bar Controls */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pt-12 border-t border-white/10 mt-12">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-sans font-semibold uppercase text-white/70">
            <Compass className="w-4 h-4 text-white/80" />
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Small Cyanotype Fabric Thumbnail */}
            <div className="w-16 h-20 rounded-lg overflow-hidden border border-white/20 shadow-lg hidden sm:block">
              <img src={processImage} alt="Cyanotype Fabric" className="w-full h-full object-cover" />
            </div>

            {/* Shop Collection Button */}
            <button
              onClick={handleShopClick}
              className="px-8 py-4 border border-white/80 hover:bg-white hover:text-[#0b4d82] transition-all duration-300 text-xs font-sans font-bold tracking-[0.25em] uppercase flex items-center gap-3 backdrop-blur-sm"
            >
              <span>SHOP COLLECTION 01</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
