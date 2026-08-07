import React, { useState } from "react";
import { motion } from "motion/react";
import { Sun, Sparkles, Eye, ArrowUpRight, ShieldCheck } from "lucide-react";
import process1 from "@/assets/images/process-1.png";
import product1 from "@/assets/images/product-4.png";

const STEPS = [
  {
    id: "01",
    title: "1. Даавуу бэлтгэх & Уусмал түрхэх",
    desc: "Гэрэлд мэдрэмтгий тусгай химийн уусмалыг байгалийн цэвэр даавуун дээр гар аргаар жигд түрхэж харанхуй өрөөнд хатаана.",
    image: "https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: "02",
    title: "2. Нарны гэрэлд тусгах (Exposure)",
    desc: "Монголын нарны хэт ягаан туяан дор ургамал болон сүүдрийн хээг даавуун дээр байрлуулж 15-20 минут тусгана.",
    image: process1,
  },
  {
    id: "03",
    title: "3. Усаар угааж бэхжүүлэх (Fixing)",
    desc: "Цэвэр усаар угааснаар уусмал химийн урвалд орж, Прусс хөх (Prussian Blue) гүн цэнхэр өнгө тодрон мөнхөрнө.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600&h=800",
  },
];

const GALLERY_PHOTOS = [
  {
    title: "Cyanotype Fern Canvas",
    category: "Art Print",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    title: "The Prussian Tote",
    category: "Tote Bag",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    title: "Atelier Draped Coat",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=1000",
  },
  {
    title: "Botanical Shadow Tee",
    category: "T-Shirt",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800&h=1000",
  },
];

export default function GalleryView() {
  const [exposureProgress, setExposureProgress] = useState(20);

  return (
    <div className="bg-brand-cream text-brand-black min-h-screen pt-28 pb-24 px-6 lg:px-12">
      <div className="max-w-[1500px] mx-auto space-y-20">
        {/* Section 1: Process Story */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-black/10 pb-8">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.6em] text-brand-gold font-sans font-bold uppercase block">
                — PROCESS STORY
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-black">Цианотипийн үйл явц</h1>
              <p className="text-sm font-sans text-brand-black/70 max-w-xl leading-relaxed">
                Гэрлээр зурсан хээ. Доош гүйлгэхэд цэнхэр дүрсүүд аажмаар тодорно.
              </p>
            </div>

            {/* Exposure Progress Indicator Bar */}
            <div className="bg-brand-prussian text-brand-cream p-5 rounded-lg w-full md:w-80 shadow-md space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-brand-gold font-bold">НАРНЫ ТУСГАЛ:</span>
                <span className="font-bold text-brand-cyan">{exposureProgress}% ХӨГЖСӨН</span>
              </div>
              <div className="w-full h-2 bg-brand-cream/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-cyan transition-all duration-300"
                  style={{ width: `${exposureProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center pt-1 text-[10px] font-sans text-brand-cream/60">
                <span>0% Эхлэл</span>
                <button
                  onClick={() => setExposureProgress((prev) => (prev >= 100 ? 20 : prev + 20))}
                  className="text-brand-gold font-bold underline hover:text-white"
                >
                  Нарны гэрэл нэмэх ☀️
                </button>
                <span>100% Прусс хөх</span>
              </div>
            </div>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className="bg-white border border-brand-black/10 p-6 rounded-lg shadow-sm space-y-4 hover:border-brand-gold transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded relative">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-prussian text-brand-gold text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    № {step.id}
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-black">{step.title}</h3>
                <p className="text-xs font-sans text-brand-black/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Studio Cyanotype Canvas Art (Image 1 Style) */}
        <div className="bg-brand-prussian text-brand-cream p-8 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-[10px] tracking-[0.5em] text-brand-gold font-bold font-sans uppercase block">
              — COLLECTION 01
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream leading-tight">
              ART IS WEARABLE
            </h2>
            <p className="text-sm font-sans text-brand-cream/80 leading-relaxed">
              Handmade culture reimagined. Each piece is a cyanotype canvas — art you can wear, crafted by hand in the
              LEO STUDIO atelier.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[10px] bg-brand-cream/10 text-brand-gold px-3 py-1 rounded font-bold uppercase tracking-wider">
                ART IS WEARABLE
              </span>
              <span className="text-[10px] bg-brand-cream/10 text-brand-cyan px-3 py-1 rounded font-bold uppercase tracking-wider">
                HANDMADE CULTURE
              </span>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 relative z-10">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="bg-brand-cream/5 border border-brand-cream/15 p-3 rounded-lg space-y-3 group hover:border-brand-gold transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden rounded relative">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-brand-prussian/90 text-brand-cream text-[9px] font-sans px-2 py-0.5 rounded">
                    {photo.category}
                  </div>
                </div>
                <h4 className="text-sm font-serif font-bold text-brand-cream">{photo.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
