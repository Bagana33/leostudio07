import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { useCart } from "../context/CartContext";

import tank1 from "@/assets/images/tank-tops/tank-wave-study-01-full.png";
import tank2 from "@/assets/images/tank-tops/tank-wave-study-02-full.png";
import tank3 from "@/assets/images/tank-tops/tank-wave-study-03-full.png";
import tank4 from "@/assets/images/tank-tops/tank-wave-study-04-full.png";
import tank5 from "@/assets/images/tank-tops/tank-wave-study-05-full.png";
import tank6 from "@/assets/images/tank-tops/tank-wave-study-06-full.png";
import tank7 from "@/assets/images/tank-tops/tank-wave-study-07-full.png";
import tank8 from "@/assets/images/tank-tops/tank-wave-study-08-full.png";
import tank9 from "@/assets/images/tank-tops/tank-wave-study-09-full.png";
import tankAtelier1 from "@/assets/images/tank-tops/tank-atelier-01.png";

const COLLECTION_ITEMS = [
  {
    id: "wave-study-01",
    name: "Wave Study 01 Tank",
    category: "Tank Top",
    price: 48,
    image: tank1,
    description: "100% Organic Ribbed Cotton with hand-exposed Prussian Cyanotype wave print.",
  },
  {
    id: "wave-study-02",
    name: "Wave Study 02 Tank",
    category: "Tank Top",
    price: 48,
    image: tank2,
    description: "Atmospheric solar wave print wrapping from front hem around to back.",
  },
  {
    id: "wave-study-03",
    name: "Wave Study 03 Tank",
    category: "Tank Top",
    price: 52,
    image: tank3,
    description: "Deep indigo Prussian wave placement on soft organic hemp-cotton blend.",
  },
  {
    id: "wave-study-04",
    name: "Wave Study 04 Tank",
    category: "Tank Top",
    price: 48,
    image: tank4,
    description: "Hand-developed cyanotype sun print with unique natural indigo gradient.",
  },
  {
    id: "wave-study-05",
    name: "Wave Study 05 Tank",
    category: "Tank Top",
    price: 52,
    image: tank5,
    description: "Mongolian solar exposure wave artwork on raw unbleached ribbed tank.",
  },
  {
    id: "wave-study-06",
    name: "Wave Study 06 Tank",
    category: "Tank Top",
    price: 48,
    image: tank6,
    description: "Monochromatic Prussian cyanotype print crafted in the LEO STUDIO atelier.",
  },
  {
    id: "wave-study-07",
    name: "Wave Study 07 Tank",
    category: "Tank Top",
    price: 50,
    image: tank7,
    description: "Limited edition sun-cured wave design on organic ribbed cotton canvas.",
  },
  {
    id: "wave-study-08",
    name: "Wave Study 08 Tank",
    category: "Tank Top",
    price: 54,
    image: tank8,
    description: "Handmade botanical and ocean wave exposure with subtle edge fading.",
  },
  {
    id: "atelier-tank-01",
    name: "Atelier Classical Relief Tank",
    category: "Tank Top",
    price: 58,
    image: tankAtelier1,
    description: "Technical view white tank top featuring LEO STUDIO classical cyanotype portrait.",
  },
];

const CATEGORIES = ["All", "Tank Top"];

export default function CollectionGrid() {
  const { openProductDetail, formatPrice } = useCart();
  const [selectedCat, setSelectedCat] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredItems = selectedCat === "All"
    ? COLLECTION_ITEMS
    : COLLECTION_ITEMS.filter((item) => item.category === selectedCat);

  return (
    <section id="collection" className="bg-white text-slate-900 py-20 px-6 lg:px-12">
      <div className="max-w-[1500px] mx-auto">
        {/* Collection Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-slate-100 pb-8 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">Collection</h2>
            <p className="text-sm font-sans text-slate-500 mt-2">
              All · Wearable art by LEO STUDIO
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-sans font-bold tracking-widest uppercase border border-slate-200 hover:border-slate-800 transition-all rounded-full"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTER {showFilter ? "−" : "+"}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-10 flex flex-wrap gap-2"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-5 py-2 text-xs font-sans font-medium rounded-full transition-all ${
                    selectedCat === cat
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3-Column Product Grid (Matches Screenshot 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openProductDetail({
                id: item.id,
                name: item.name,
                category: item.category,
                price: item.price,
                originalPrice: Math.round(item.price * 1.2),
                description: item.description,
                images: [item.image]
              })}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Product Image Card with Rounded Corners */}
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-slate-100 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Title & Price Row */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-medium text-slate-900 group-hover:text-[#0b4d82] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-sm font-sans font-semibold text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-xs font-sans text-slate-400">
                  {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
