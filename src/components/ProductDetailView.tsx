import React, { useState } from "react";
import { motion } from "motion/react";
import { Heart, Minus, Plus, Truck, Sparkles, ShieldCheck, ArrowLeft, QrCode } from "lucide-react";
import { useCart, ProductDetail } from "../context/CartContext";

import tank1 from "@/assets/images/tank-tops/tank-wave-study-01-full.png";
import tank2 from "@/assets/images/tank-tops/tank-wave-study-01-front.png";
import tank3 from "@/assets/images/tank-tops/tank-wave-study-02-full.png";
import tank4 from "@/assets/images/tank-tops/tank-wave-study-02-front.png";

const DEFAULT_PRODUCT: ProductDetail = {
  id: "wave-study-01",
  name: "Wave Study 01 Tank Top",
  category: "Tank Top",
  price: 48,
  originalPrice: 65,
  description:
    "Handmade in structured organic ribbed cotton with a classic natural silhouette. A quiet study in solar cyanotype printing, crafted with natural indigo wave elements sun-cured directly into the fabric.",
  images: [tank1, tank2, tank3, tank4],
  editionInfo: "Limited Edition 1/50",
  stockLeft: 4,
};

interface ProductDetailViewProps {
  onOpenQPay: (prodName: string, amountMNT: number) => void;
}

export default function ProductDetailView({ onOpenQPay }: ProductDetailViewProps) {
  const { selectedProduct, addToCart, setActivePage, formatPrice, convertPrice, toggleWishlist, isInWishlist } = useCart();
  const product = selectedProduct || DEFAULT_PRODUCT;

  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);

  const sizes = ["S", "M", "L"];
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      subtitle: `Size ${selectedSize} · ${product.category}`,
      category: product.category,
      price: product.price,
      image: product.images[0] || "",
      size: selectedSize,
    });
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen pt-24 pb-32 px-6 lg:px-12 font-sans">
      <div className="max-w-[1500px] mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs text-slate-400">
          <button
            onClick={() => setActivePage("shop")}
            className="hover:text-slate-900 flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> SHOP / {product.category}
          </button>
        </div>

        {/* 2-Column Vertical Gallery Layout (Matches Screenshot 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Vertical Image Stack */}
          <div className="lg:col-span-7 space-y-6">
            {product.images.map((img, idx) => (
              <div key={idx} className="aspect-[3/4] w-full bg-[#f4f4f4] rounded-2xl overflow-hidden shadow-sm">
                <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Right: Sticky Details Panel (Matches Screenshot 5) */}
          <div className="lg:col-span-5 sticky top-28 space-y-8 pl-0 lg:pl-6">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.4em] font-mono text-slate-400 uppercase block">
                — COLLECTION 01
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 font-light leading-relaxed pt-1">
                {product.description}
              </p>
              <div className="text-2xl font-sans font-bold text-slate-900 pt-2">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3">
              <span className="text-xs font-sans font-semibold text-slate-700 uppercase tracking-wider block">
                Size
              </span>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 border text-xs font-mono font-bold transition-all rounded-xl ${
                      selectedSize === size
                        ? "border-slate-900 bg-slate-900 text-white shadow"
                        : "border-slate-200 text-slate-700 hover:border-slate-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Wishlist */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2 space-x-3 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono font-bold px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border rounded-xl transition-colors ${
                  isWish ? "border-red-500 text-red-500 bg-red-50" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWish ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#0b4d82] hover:bg-slate-900 text-white text-xs font-sans font-bold tracking-[0.25em] uppercase transition-colors rounded-xl shadow-lg"
              >
                ADD TO CART
              </button>

              <button
                onClick={() => onOpenQPay(product.name, convertPrice(product.price))}
                className="w-full py-3.5 bg-slate-900 text-white text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-[#0b4d82] transition-colors rounded-xl flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>BUY NOW (QPay)</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-slate-700" />
                <span>Complimentary express shipping & easy returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>Handmade in Mongolia using traditional cyanotype dyes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                <span>100% Authenticity guarantee by LEO STUDIO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
