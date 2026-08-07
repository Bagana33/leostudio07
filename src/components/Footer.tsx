import { motion } from "motion/react";
import { Sun } from "lucide-react";
import { useCart, PageView } from "../context/CartContext";
import logoImage from "@/assets/images/Asset 2@3x.png";

const QUICK_LINKS: { name: string; page: PageView; hash?: string }[] = [
  { name: "Нүүр (Home)", page: "home", hash: "#hero" },
  { name: "Бидний тухай (About)", page: "about", hash: "#story" },
  { name: "Дэлгүүр (Shop)", page: "shop", hash: "#collection" },
  { name: "Арчилгаа (Care Guide)", page: "about", hash: "#care" },
  { name: "Түгээмэл асуултууд (FAQ)", page: "about", hash: "#contact" },
  { name: "Буцаалтын нөхцөл (Return Policy)", page: "about", hash: "#contact" },
];

const SOCIAL_MEDIA = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Pinterest", href: "https://pinterest.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "Behance", href: "https://behance.net" },
  { name: "Threads", href: "https://threads.net" },
];

export default function Footer() {
  const { setActivePage } = useCart();

  const handleLinkClick = (page: PageView, hash?: string) => {
    setActivePage(page);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-brand-prussian text-brand-cream relative overflow-hidden">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start"
        >
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
             <img src={logoImage} alt="LEO STUDIO" className="h-10 sm:h-12 w-auto object-contain" />
             <p className="text-xs text-brand-cream/60 font-sans italic">
               Wearable Art from Mongolia
             </p>
             <div className="pt-4 space-y-1 text-xs text-brand-cream/70 font-sans">
               <p className="font-semibold text-brand-gold">hello@leostudio.com</p>
               <p>Ulaanbaatar, Mongolia</p>
             </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
             <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold">Цэснүүд (Quick Links)</h3>
             <ul className="space-y-2 text-xs font-sans text-brand-cream/70">
               {QUICK_LINKS.map((link) => (
                 <li key={link.name}>
                   <button 
                     onClick={() => handleLinkClick(link.page, link.hash)} 
                     className="hover:text-brand-cyan transition-colors text-left font-sans"
                   >
                     {link.name}
                   </button>
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="space-y-3">
             <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gold">Сошиал сувгууд</h3>
             <ul className="space-y-2 text-xs font-sans text-brand-cream/70">
               {SOCIAL_MEDIA.map((s) => (
                 <li key={s.name}>
                   <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-brand-cyan transition-colors">
                     {s.name}
                   </a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 4: Emblem & Tagline */}
          <div className="flex flex-col items-start md:items-end space-y-6">
             <div className="w-24 h-24 rounded-full border border-brand-cream/10 flex items-center justify-center relative">
                <Sun className="w-10 h-10 text-brand-gold animate-spin-slow" strokeWidth={1} style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 border-[0.5px] border-dashed border-brand-cream/20 rounded-full scale-110"></div>
             </div>
             <div className="text-left md:text-right space-y-1">
               <p className="text-sm font-serif italic text-brand-cyan">Art First. Story First.</p>
               <p className="text-[10px] tracking-[0.3em] font-sans text-brand-cream/50 uppercase">Cyanotype Wearable Art</p>
             </div>
          </div>
        </motion.div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row items-center justify-between text-xs font-sans text-brand-cream/40 gap-4">
          <p>© 2026 LEO STUDIO. All rights reserved.</p>
          <p className="text-[10px] tracking-widest uppercase">Ulaanbaatar, Mongolia • Slow Fashion & Handmade Art</p>
        </div>
      </div>
      
      {/* Decorative large logo bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-brand-cream/5 py-8 flex justify-center">
        <span className="text-[10vw] font-serif font-bold tracking-[0.4em] text-brand-cream/[0.03] select-none pointer-events-none whitespace-nowrap">
          LEO STUDIO
        </span>
      </div>
    </footer>
  );
}
