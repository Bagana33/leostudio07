import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Sparkles, RefreshCw, ShoppingBag, QrCode, Play, Pause, Layers, CheckCircle2, ShieldAlert } from "lucide-react";
import { useCart } from "../context/CartContext";

const GARMENTS = [
  { id: "tee", name: "Oversized Atelier Tee", priceUSD: 55, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: "tank", name: "Organic Hemp Tank Top", priceUSD: 38, image: "https://images.unsplash.com/photo-1520052205735-30c33a4a5813?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: "hoodie", name: "Heavyweight Solstice Hoodie", priceUSD: 72, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: "tote", name: "Raw Canvas Sun Tote", priceUSD: 28, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: "print", name: "Archival Art Print A2", priceUSD: 34, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600&h=800" },
];

const STENCILS = [
  { id: "knot", name: "Өлзий хээ (Eternal Knot)", icon: "❖", desc: "Мөнхийн аз жаргал, хамгаалалтын бэлгэдэл" },
  { id: "sunmoon", name: "Нар Сар (Sun & Moon)", icon: "☽☀️", desc: "Тэнгэр ба газрын зохицол" },
  { id: "botanical", name: "Ойн Ургамал (Fern Leaf)", icon: "🌿", desc: "Монголын хангай газрын байгалийн сүүдэр" },
  { id: "dragon", name: "Үүлэн хээ (Sky Clouds)", icon: "☁️", desc: "Эрх чөлөө ба тэнгэрийн уудам" },
];

interface CyanotypeStudioProps {
  onOpenQPay: (productName: string, amountMNT: number) => void;
}

export default function CyanotypeStudio({ onOpenQPay }: CyanotypeStudioProps) {
  const { addToCart, formatPrice, convertPrice } = useCart();

  const [selectedGarment, setSelectedGarment] = useState(GARMENTS[0]);
  const [selectedStencil, setSelectedStencil] = useState(STENCILS[0]);
  const [customText, setCustomText] = useState("LEO ATELIER");
  const [exposureSec, setExposureSec] = useState(0);
  const [isExposing, setIsExposing] = useState(false);

  // Auto exposure simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isExposing) {
      timer = setInterval(() => {
        setExposureSec((prev) => {
          if (prev >= 60) {
            setIsExposing(false);
            return 60;
          }
          return prev + 2;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isExposing]);

  // Compute chemical background color & blend based on exposure time (0 to 60)
  const getChemicalColor = () => {
    if (exposureSec === 0) return "#C5D4A2"; // Pale sensitizer green
    if (exposureSec < 15) return "#759B8E"; // Transition teal
    if (exposureSec < 35) return "#1A497A"; // Deep Prussian Blue onset
    return "#0A2A66"; // Full Prussian Blue oxidation
  };

  const getOxidationLabel = () => {
    if (exposureSec === 0) return "1. Гэрэлд мэдрэмтгий уусмал (Unexposed Emulsion)";
    if (exposureSec < 20) return "2. Нарны УВ тусгалтай урвалд орж байна... (UV Reaction)";
    if (exposureSec < 45) return "3. Цэвэр усаар угааж оксидаци явагдаж байна (Oxidation)";
    return "4. Прусс Хөх (Prussian Blue) Гүн Өнгө Тодорлоо! (Final Art)";
  };

  const handleOrderCustom = () => {
    const customPriceUSD = selectedGarment.priceUSD + 10;
    addToCart({
      id: `custom-${selectedGarment.id}-${selectedStencil.id}-${Date.now().toString().slice(-4)}`,
      name: `Bespoke Cyanotype — ${selectedGarment.name}`,
      subtitle: `Stencil: ${selectedStencil.name} | Text: "${customText}"`,
      category: "Custom Studio Order",
      price: customPriceUSD,
      image: selectedGarment.image,
    });
  };

  return (
    <div id="studio" className="bg-brand-cream text-brand-black min-h-screen pt-28 pb-24 px-6 lg:px-12 bg-paper">
      <div className="max-w-[1500px] mx-auto space-y-12">
        {/* Header Title Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-brand-black/10 pb-8 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.6em] text-brand-gold font-sans font-bold uppercase block mb-2">
              — INTERACTIVE DIGITAL ATELIER
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-black">
              Cyanotype Sun Art Studio
            </h1>
            <p className="text-sm font-sans text-brand-black/70 mt-2 max-w-2xl leading-relaxed">
              Нарны гэрэл, хээ болон цианотипийн химийн оксидацийн урвалыг дижитал студид туршиж, өөрийн цор ганц захиалгат хувцсаа бүтээгээрэй.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-brand-prussian text-brand-cream px-5 py-3 rounded-lg shadow-md shrink-0">
            <Sun className="w-6 h-6 text-brand-gold animate-spin-slow" />
            <div>
              <span className="text-[10px] tracking-widest text-brand-gold font-bold uppercase block">
                MONGOLIAN UV SUNLIGHT
              </span>
              <span className="text-xs font-mono font-bold text-brand-cyan">UV Index: 8.5 (High)</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Canvas Preview & Exposure Controller */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 border border-brand-black/10 rounded-xl shadow-xl space-y-8 relative overflow-hidden">
            {/* Visual Canvas Simulator */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-black/10 shadow-inner flex items-center justify-center transition-colors duration-1000"
              style={{ backgroundColor: getChemicalColor() }}
            >
              {/* Overlay Pattern Texture */}
              <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />

              {/* Garment Silhouette Shadow */}
              <div className="relative w-72 h-80 flex flex-col items-center justify-center p-6 border-2 border-white/20 rounded-lg shadow-2xl bg-white/5 backdrop-blur-[1px] transition-all">
                <img
                  src={selectedGarment.image}
                  alt={selectedGarment.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay rounded-lg"
                />

                {/* Stencil Motif Preview */}
                <motion.div
                  key={`${selectedStencil.id}-${exposureSec}`}
                  animate={{ scale: [0.98, 1, 0.98] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="z-10 text-center space-y-2"
                >
                  <span className="text-6xl md:text-7xl block drop-shadow-md select-none" style={{
                    color: exposureSec > 25 ? "#FDFCF5" : "#4A5D3F",
                    opacity: exposureSec === 0 ? 0.3 : Math.min(1, 0.4 + exposureSec / 40)
                  }}>
                    {selectedStencil.icon}
                  </span>
                  <span className="text-xs font-serif font-bold tracking-[0.3em] uppercase block drop-shadow" style={{
                    color: exposureSec > 25 ? "#BFA46A" : "#2E3D25"
                  }}>
                    {customText}
                  </span>
                </motion.div>
              </div>

              {/* Live UV Exposure Watermark */}
              <div className="absolute top-4 left-4 bg-brand-prussian/90 text-brand-gold px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 shadow">
                <Sun className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
                <span>EXPOSURE: {exposureSec}s / 60s</span>
              </div>
            </div>

            {/* Exposure Control Slider & Play Buttons */}
            <div className="space-y-4 bg-brand-cream/60 p-6 border border-brand-black/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-sans font-bold uppercase text-brand-black block">
                    {getOxidationLabel()}
                  </span>
                  <span className="text-[11px] text-brand-black/60 font-sans">
                    Слайдер чирэх эсвэл нарны тусгалыг эхлүүлж химийн хувиралтыг ажиглана уу.
                  </span>
                </div>

                <button
                  onClick={() => setIsExposing(!isExposing)}
                  className="px-5 py-2.5 bg-brand-prussian text-brand-gold hover:bg-brand-gold hover:text-brand-prussian text-xs font-bold font-sans uppercase tracking-wider transition-colors rounded flex items-center gap-2 shadow shrink-0"
                >
                  {isExposing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isExposing ? "Зогсоох" : "Нарны тусгал эхлүүлэх ☀️"}</span>
                </button>
              </div>

              {/* Progress Slider */}
              <input
                type="range"
                min="0"
                max="60"
                value={exposureSec}
                onChange={(e) => {
                  setIsExposing(false);
                  setExposureSec(Number(e.target.value));
                }}
                className="w-full h-2 bg-brand-grey rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />

              <div className="flex justify-between text-[10px] font-mono text-brand-black/50">
                <span>0s (Ногоон уусмал)</span>
                <span>30s (Прусс оксидаци)</span>
                <span>60s (Гүн Цэнхэр & Алтан хээ)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Garment Options & Bespoke Order */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 border border-brand-black/10 rounded-xl shadow-xl space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.5em] text-brand-gold font-bold font-sans uppercase block mb-1">
                STEP 1: SELECT CANVAS
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-black">Бүтээгдэхүүн сонгох</h3>
            </div>

            {/* Garment Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {GARMENTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGarment(g)}
                  className={`p-3 border rounded text-left transition-all flex flex-col justify-between ${
                    selectedGarment.id === g.id
                      ? "border-brand-gold bg-brand-gold/10 ring-1 ring-brand-gold shadow"
                      : "border-brand-black/10 hover:border-brand-black/30"
                  }`}
                >
                  <span className="text-xs font-serif font-bold text-brand-black block truncate">{g.name}</span>
                  <span className="text-[11px] font-sans font-bold text-brand-cyan mt-2">{formatPrice(g.priceUSD)}</span>
                </button>
              ))}
            </div>

            {/* Stencil Selector */}
            <div className="space-y-2 pt-2 border-t border-brand-black/10">
              <span className="text-[10px] tracking-[0.5em] text-brand-gold font-bold font-sans uppercase block">
                STEP 2: SELECT STENCIL MOTIF
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-black">Сүүдэр хээ сонгох</h3>

              <div className="grid grid-cols-2 gap-2.5">
                {STENCILS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStencil(s)}
                    className={`p-3 border rounded text-left transition-all ${
                      selectedStencil.id === s.id
                        ? "border-brand-prussian bg-brand-prussian text-brand-cream shadow"
                        : "border-brand-black/10 text-brand-black hover:bg-brand-black/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-xs font-serif font-bold truncate">{s.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Text Input */}
            <div className="space-y-2 pt-2 border-t border-brand-black/10">
              <span className="text-[10px] tracking-[0.5em] text-brand-gold font-bold font-sans uppercase block">
                STEP 3: CUSTOM EMBLEM TEXT
              </span>
              <label className="block text-xs font-sans font-bold uppercase text-brand-black/70">
                Бичвэр / Тэмдэглэгээ (Макс 15 үсэг):
              </label>
              <input
                type="text"
                maxLength={15}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full p-3 border border-brand-black/20 text-xs font-mono uppercase focus:outline-none focus:border-brand-gold rounded bg-brand-cream/30"
              />
            </div>

            {/* Summary & Custom Order Actions */}
            <div className="pt-4 border-t border-brand-black/10 space-y-4">
              <div className="bg-brand-prussian/5 p-4 rounded border border-brand-black/10 space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-brand-black/60 uppercase">Сонгосон загвар:</span>
                  <span className="font-bold text-brand-black">{selectedGarment.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="text-brand-black/60 uppercase">Сүүдэр хээ:</span>
                  <span className="font-bold text-brand-cyan">{selectedStencil.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-serif font-bold text-brand-black pt-2 border-t border-brand-black/10">
                  <span>Захиалгат Нийт Дүн:</span>
                  <span className="text-brand-cyan font-sans text-lg">{formatPrice(selectedGarment.priceUSD + 10)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleOrderCustom}
                  className="w-full py-4 bg-brand-black text-brand-cream text-xs font-sans font-bold tracking-[0.3em] uppercase hover:bg-brand-cyan hover:text-brand-prussian transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ЭНЭ ЗАХИАЛГАТ БҮТЭЭЛИЙГ САГСАНД НЭМЭХ</span>
                </button>

                <button
                  onClick={() => onOpenQPay(`Bespoke Cyanotype — ${selectedGarment.name}`, convertPrice(selectedGarment.priceUSD + 10))}
                  className="w-full py-3.5 bg-brand-prussian text-brand-gold text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-brand-prussian transition-all flex items-center justify-center gap-2 shadow"
                >
                  <QrCode className="w-4 h-4" />
                  <span>QPay-ээр шууд захиалга өгөх</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
