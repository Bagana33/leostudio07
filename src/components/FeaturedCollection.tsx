import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X, Info, ShieldCheck, Sparkles, QrCode, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import product4 from "@/assets/images/product-4.png";
import QPayModal from "./QPayModal";
import { useCart } from "../context/CartContext";

import tank1 from "@/assets/images/tank-tops/tank-wave-study-01-full.png";
import tank2 from "@/assets/images/tank-tops/tank-wave-study-02-full.png";
import tank3 from "@/assets/images/tank-tops/tank-wave-study-03-full.png";
import tank5 from "@/assets/images/tank-tops/tank-wave-study-05-full.png";

const product1 = tank1;
const product2 = tank2;
const product3 = tank3;
const product5 = tank5;

const CATEGORIES = [
  "Бүгд",
  "Oversized T-Shirt",
  "Tank Top",
  "Hoodie",
  "Tote Bag",
  "Poster & Art Print"
];

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  priceUSD: number;
  story: string;
  material: string;
  feature: string;
  warning: string;
}

const PRODUCTS: Product[] = [
  {
    id: "001",
    name: "МОНГОЛ ДҮРСЭЛ — OVERSIZED T-SHIRT",
    category: "Oversized T-Shirt",
    image: product1,
    priceUSD: 55,
    story: "Монгол домог, хүн ба байгалийн шүтэлцээг цианотип нарын гэрлээр буулгасан тусгай бүтээл.",
    material: "100% Хөвөн даавуу / Байгалийн материал (Organic Cotton)",
    feature: "Гар аргаар хэвлэсэн Cyanotype бүтээл тул хувцас бүрийн уусалт, хэвлэлт дахин давтагдашгүй.",
    warning: "Цаг хугацааны эрхээр болон угаалтын явцад өнгө бага зэрэг хувирах нь гар аргаар бүтээгдсэн амьд урлагийн байгалийн жам юм."
  },
  {
    id: "002",
    name: "НАРНЫ СҮҮДЭР — TANK TOP",
    category: "Tank Top",
    image: product2,
    priceUSD: 38,
    story: "Амьдрал ба үхэл, оршихуйн гүн ухааныг сүүдэр зан үйлээр илэрхийлсэн цэвэр маалинган загвар.",
    material: "100% Хөвөн даавуу & Organic Hemp",
    feature: "Гар аргаар хэвлэсэн Cyanotype бүтээл тул хувцас бүрийн уусалт, хэвлэлт дахин давтагдашгүй.",
    warning: "Цаг хугацааны эрхээр өнгө бага зэрэг хувирах нь амьд урлагийн байгалийн жам юм."
  },
  {
    id: "003",
    name: "ЭРХ ЧӨЛӨӨНИЙ ДОМОГ — HOODIE",
    category: "Hoodie",
    image: product3,
    priceUSD: 72,
    story: "Эрх чөлөө ба Монгол туульсын далд сүнсийг гүн Прусс хөх өнгөөр сийлсэн зөөлөн хөвөн хүрэм.",
    material: "100% Хөвөн даавуу / Байгалийн Bamboo & Cotton mix",
    feature: "Гар аргаар хэвлэсэн Cyanotype бүтээл тул хувцас бүрийн уусалт, хэвлэлт дахин давтагдашгүй.",
    warning: "Цаг хугацааны эрхээр өнгө бага зэрэг хувирах нь амьд урлагийн байгалийн жам юм."
  },
  {
    id: "004",
    name: "БАЙГАЛИЙН МӨР — TOTE BAG",
    category: "Tote Bag",
    image: product4,
    priceUSD: 26,
    story: "Өдөр тутмын хэрэглээнд тохиромжтой, нарны тусгалаар амилсан ургамлын зураглалтай цүнх.",
    material: "100% Байгалийн боловсруулаагүй канвас даавуу",
    feature: "Гар аргаар хэвлэсэн Cyanotype бүтээл тул хувцас бүрийн уусалт, хэвлэлт дахин давтагдашгүй.",
    warning: "Цаг хугацааны эрхээр өнгө бага зэрэг хувирах нь амьд урлагийн байгалийн жам юм."
  },
  {
    id: "005",
    name: "НАРНЫ ИЛРЭЛ — POSTER & ART PRINT",
    category: "Poster & Art Print",
    image: product5,
    priceUSD: 34,
    story: "Монголын визуал соёлыг хананы урлаг болгон мөнхөлсөн цианотип зургийн жаазтай арт принт.",
    material: "Хөвөн бүтэцтэй тусгай музейн чанартай цаас",
    feature: "Гар аргаар хэвлэсэн Cyanotype бүтээл тул хувцас бүрийн уусалт, хэвлэлт дахин давтагдашгүй.",
    warning: "Цаг хугацааны эрхээр өнгө бага зэрэг хувирах нь амьд урлагийн байгалийн жам юм."
  }
];

export default function FeaturedCollection() {
  const { addToCart, formatPrice, convertPrice, toggleWishlist, isInWishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Бүгд");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qpayProduct, setQpayProduct] = useState<{ name: string; amount: number; id: string } | null>(null);

  const filteredProducts = selectedCategory === "Бүгд"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="collection" className="bg-brand-cream py-32 border-t border-brand-grey/20 relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] tracking-[0.6em] text-brand-gold font-sans font-bold uppercase block">ДЭЛГҮҮР / COLLECTIONS</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-black lowercase">Collection 01 — Нарны Дурсамж</h2>
            <p className="text-[14px] md:text-[15px] text-brand-black/70 font-sans font-light leading-relaxed pt-2">
              Дизайн бүр нэгэн түүхийг өгүүлнэ. Бидний бүтээлүүд Монгол домог, хүн ба байгаль, оршихуй, амьдрал ба үхэл, эрх чөлөөний гүн ухааныг агуулдаг.
            </p>
          </div>
          
          <a href="#contact" className="flex items-center gap-3 group border-b border-brand-black/20 pb-1 shrink-0">
            <span className="text-[10px] tracking-[0.4em] font-sans font-bold">ЗАХИАЛГА ӨГӨХ</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-16 pb-6 border-b border-brand-black/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-[11px] tracking-[0.2em] font-sans transition-all duration-300 uppercase ${
                selectedCategory === cat
                  ? "bg-brand-black text-brand-cream font-semibold shadow-md"
                  : "bg-brand-cream/80 text-brand-black/60 hover:text-brand-black hover:bg-brand-black/5 border border-brand-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredProducts.map((product, idx) => {
            const isWish = isInWishlist(product.id);

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="group flex flex-col justify-between h-full bg-brand-cream p-4 border border-brand-black/5 hover:border-brand-gold/40 transition-all duration-500 hover:shadow-xl"
              >
                <div>
                  <div className="relative overflow-hidden mb-6 bg-brand-grey/10 group/img">
                    <div className="aspect-[3/4] overflow-hidden relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <motion.img 
                        src={product.image} 
                        alt={product.name}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover/img:grayscale-0"
                      />
                      
                      {/* Category Overlay Tag */}
                      <div className="absolute top-4 left-4 bg-brand-prussian/90 text-brand-cream px-3 py-1 text-[9px] font-sans tracking-widest uppercase">
                        {product.category}
                      </div>

                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full shadow hover:bg-white transition-all text-brand-black"
                      >
                        <Heart className={`w-4 h-4 ${isWish ? "fill-red-500 text-red-500" : "text-brand-black/60"}`} />
                      </button>

                      {/* Quick View Button */}
                      <div className="absolute inset-0 bg-brand-prussian/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex items-center justify-center p-6">
                        <span className="bg-brand-cream text-brand-black px-6 py-3 text-[10px] tracking-[0.3em] font-bold uppercase shadow-lg">
                          ДЭЛГЭРЭНГҮЙ ҮЗЭХ
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 px-1">
                    <span className="text-[10px] font-mono text-brand-gold tracking-widest block">№ {product.id}</span>
                    <h3 onClick={() => setSelectedProduct(product)} className="text-base font-serif tracking-wider text-brand-black uppercase font-medium cursor-pointer hover:text-brand-cyan transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-brand-black/60 font-sans line-clamp-2 leading-relaxed pt-1">
                      {product.story}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-black/10 flex items-center justify-between px-1">
                  <span className="text-base font-sans font-bold text-brand-black tracking-wider">
                    {formatPrice(product.priceUSD)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          subtitle: product.category,
                          category: product.category,
                          price: product.priceUSD,
                          image: product.image,
                        })
                      }
                      className="px-3.5 py-2 bg-brand-black text-brand-cream hover:bg-brand-cyan hover:text-brand-prussian text-[10px] font-sans font-bold tracking-wider uppercase transition-colors rounded flex items-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>САГСАНД</span>
                    </button>

                    <button
                      onClick={() => setQpayProduct({ name: product.name, amount: convertPrice(product.priceUSD), id: product.id })}
                      className="p-2 bg-brand-prussian text-brand-gold hover:bg-brand-gold hover:text-brand-prussian transition-colors rounded shadow"
                      title="QPay-ээр төлөх"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-cream max-w-4xl w-full border border-brand-gold/30 p-6 md:p-12 relative overflow-hidden shadow-2xl my-auto text-brand-black"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 text-brand-black/60 hover:text-brand-black border border-brand-black/10 rounded-full hover:bg-brand-black/5 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Modal Image */}
                <div className="aspect-[3/4] overflow-hidden relative border border-brand-black/10 shadow-lg">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-brand-gold text-brand-cream text-[9px] font-sans font-bold tracking-widest px-3 py-1 uppercase">
                    {selectedProduct.category}
                  </div>
                </div>

                {/* Modal Product Details */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-brand-gold tracking-widest block mb-1">№ {selectedProduct.id}</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-black uppercase leading-tight">{selectedProduct.name}</h2>
                    <p className="text-xl font-sans font-bold text-brand-cyan mt-2">{formatPrice(selectedProduct.priceUSD)}</p>
                  </div>

                  <p className="text-sm font-sans text-brand-black/80 leading-relaxed border-l-2 border-brand-cyan pl-4 italic">
                    "{selectedProduct.story}"
                  </p>

                  <div className="space-y-4 text-xs font-sans pt-2 border-t border-brand-black/10">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-brand-black uppercase block tracking-wider mb-0.5">Материал:</span>
                        <p className="text-brand-black/70">{selectedProduct.material}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-brand-black uppercase block tracking-wider mb-0.5">Онцлог:</span>
                        <p className="text-brand-black/70">{selectedProduct.feature}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-brand-gold/10 p-4 border-l-2 border-brand-gold">
                      <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-brand-black uppercase block tracking-wider mb-0.5">Анхааруулга:</span>
                        <p className="text-brand-black/80 leading-relaxed">{selectedProduct.warning}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => {
                        addToCart({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          subtitle: selectedProduct.category,
                          category: selectedProduct.category,
                          price: selectedProduct.priceUSD,
                          image: selectedProduct.image,
                        });
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-4 bg-brand-black text-brand-cream text-[10px] tracking-[0.3em] font-sans font-bold uppercase hover:bg-brand-cyan transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Сагсанд Нэмэх ({formatPrice(selectedProduct.priceUSD)})</span>
                    </button>

                    <button 
                      onClick={() => {
                        const currentProd = selectedProduct;
                        setSelectedProduct(null);
                        setQpayProduct({
                          name: currentProd.name,
                          amount: convertPrice(currentProd.priceUSD),
                          id: currentProd.id
                        });
                      }}
                      className="py-4 px-6 bg-brand-prussian text-brand-gold text-[10px] tracking-[0.3em] font-sans font-bold uppercase hover:bg-brand-gold hover:text-brand-black transition-all flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>QPay</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QPay Payment Modal for selected product */}
      {qpayProduct && (
        <QPayModal
          isOpen={!!qpayProduct}
          onClose={() => setQpayProduct(null)}
          productName={qpayProduct.name}
          amount={qpayProduct.amount}
          orderId={`LEO-${qpayProduct.id}-${Date.now().toString().slice(-4)}`}
        />
      )}
    </section>
  );
}
