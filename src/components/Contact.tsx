import { motion } from "motion/react";
import { Mail, Instagram, MapPin, HelpCircle, RotateCcw, Share2, QrCode } from "lucide-react";
import { useState } from "react";
import QPayModal from "./QPayModal";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Pinterest", href: "https://pinterest.com" },
  { name: "TikTok", href: "https://tiktok.com" },
  { name: "Behance", href: "https://behance.net" },
  { name: "Threads", href: "https://threads.net" },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState<"contact" | "faq" | "returns">("contact");
  const [isQPayOpen, setIsQPayOpen] = useState(false);

  return (
    <section id="contact" className="bg-brand-cream py-32 bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Navigation Tabs for Contact, FAQ, Returns */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 pb-6 border-b border-brand-black/10">
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-8 py-3 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-300 ${
              activeTab === "contact"
                ? "bg-brand-black text-brand-cream font-bold shadow-md"
                : "border border-brand-black/10 text-brand-black/60 hover:text-brand-black"
            }`}
          >
            Холбоо барих
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-8 py-3 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-300 ${
              activeTab === "faq"
                ? "bg-brand-black text-brand-cream font-bold shadow-md"
                : "border border-brand-black/10 text-brand-black/60 hover:text-brand-black"
            }`}
          >
            Түгээмэл асуултууд (FAQ)
          </button>
          <button
            onClick={() => setActiveTab("returns")}
            className={`px-8 py-3 text-[10px] tracking-[0.3em] font-sans uppercase transition-all duration-300 ${
              activeTab === "returns"
                ? "bg-brand-black text-brand-cream font-bold shadow-md"
                : "border border-brand-black/10 text-brand-black/60 hover:text-brand-black"
            }`}
          >
            Буцаалтын нөхцөл (Return Policy)
          </button>
        </div>

        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left Column: Inquiry */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-6">ХОЛБОО БАРЬХ</span>
                <h2 className="text-4xl md:text-6xl font-serif text-brand-black leading-tight italic">
                  Бидэнтэй <br /> холбогдох.
                </h2>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-full border border-brand-grey/30 flex items-center justify-center text-brand-cyan shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-brand-black/40 font-bold uppercase mb-1">Имэйл хаяг</p>
                    <a href="mailto:hello@leostudio.com" className="text-xl font-serif text-brand-black hover:text-brand-cyan transition-colors">
                      hello@leostudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 rounded-full border border-brand-grey/30 flex items-center justify-center text-brand-cyan shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-brand-black/40 font-bold uppercase mb-1">Хаяг / Байршил</p>
                    <p className="text-xl font-serif text-brand-black">
                      Ulaanbaatar, Mongolia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 pt-4 border-t border-brand-black/10">
                  <div className="w-10 h-10 rounded-full border border-brand-grey/30 flex items-center justify-center text-brand-cyan shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-brand-black/40 font-bold uppercase mb-3">Сошиал сувгууд</p>
                    <div className="flex flex-wrap gap-4">
                      {SOCIAL_LINKS.map((s) => (
                        <a 
                          key={s.name} 
                          href={s.href} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs font-sans tracking-wider text-brand-black/80 hover:text-brand-cyan border-b border-brand-black/20 pb-0.5 transition-colors"
                        >
                          {s.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Newsletter & Order Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-brand-prussian p-10 lg:p-16 text-brand-cream relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 space-y-8">
                <div>
                  <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-4 text-center">СҮНСТЭЙ ТҮҮХҮҮД</span>
                  <h3 className="text-3xl font-serif text-center leading-tight">
                    Бүтээгдэхүүний захиалга & <br /> Ательегийн мэдээлэл
                  </h3>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-[9px] tracking-[0.3em] font-sans uppercase block text-brand-cream/60 mb-2">Таны нэр</label>
                    <input 
                      type="text" 
                      placeholder="НЭРЭЭ ОРУУЛНА УУ" 
                      className="w-full bg-brand-cream/5 border border-brand-cream/20 p-4 text-[12px] tracking-[0.2em] font-sans focus:outline-none focus:border-brand-gold text-brand-cream placeholder:text-brand-cream/30"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.3em] font-sans uppercase block text-brand-cream/60 mb-2">Цахим шуудан / Утас</label>
                    <input 
                      type="text" 
                      placeholder="ИМЭЙЛ ЭСВЭЛ УТАСНЫ ДУГААР" 
                      className="w-full bg-brand-cream/5 border border-brand-cream/20 p-4 text-[12px] tracking-[0.2em] font-sans focus:outline-none focus:border-brand-gold text-brand-cream placeholder:text-brand-cream/30"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.3em] font-sans uppercase block text-brand-cream/60 mb-2">Захиалга / Зурвас</label>
                    <textarea 
                      rows={3}
                      placeholder="СОНИРХОЖ БУЙ ЗАХИАЛГА, ХАБАРТАЙ ИЛГЭЭХ МАТЕРИАЛАА БИЧНЭ ҮҮ" 
                      className="w-full bg-brand-cream/5 border border-brand-cream/20 p-4 text-[12px] tracking-[0.2em] font-sans focus:outline-none focus:border-brand-gold text-brand-cream placeholder:text-brand-cream/30 resize-none"
                    />
                  </div>
                  <button className="w-full py-4 bg-brand-gold text-brand-black text-[10px] tracking-[0.5em] font-sans font-bold uppercase hover:bg-brand-cream transition-all duration-500 shadow-lg">
                    ИЛГЭЭХ / ЗАХИАЛАХ
                  </button>
                </form>

                <p className="text-[10px] text-center opacity-50 font-sans tracking-widest leading-relaxed">
                  © LEO STUDIO — Art First. Story First.
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <HelpCircle className="w-8 h-8 text-brand-cyan mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-brand-black font-bold">Түгээмэл асуултууд (FAQ)</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 bg-brand-cream border border-brand-black/10 space-y-2">
                <h3 className="font-bold text-sm font-sans uppercase text-brand-black">1. Cyanotype гэж юу вэ?</h3>
                <p className="text-xs text-brand-black/80 leading-relaxed font-sans">
                  Cyanotype нь 19-р зуунд зохион бүтээгдсэн, нарны ультравиолет гэрэл болон химийн тусгай уусмалыг ашиглан байгалийн баялаг, ургамлын хээг Прусс хөх өнгөөр даавуунд мөнхөлдөг гэрэл зургийн эртний аргачлал юм.
                </p>
              </div>

              <div className="p-6 bg-brand-cream border border-brand-black/10 space-y-2">
                <h3 className="font-bold text-sm font-sans uppercase text-brand-black">2. Хувцас бүр үнэхээр дахин давтагдашгүй юу?</h3>
                <p className="text-xs text-brand-black/80 leading-relaxed font-sans">
                  Тийм ээ. LEO STUDIO-ийн бүх бүтээгдэхүүнийг нарны гэрэл дор гар аргаар хэвлэдэг тул тухайн өдрийн нарны тусгал, салхи, ургамлын байршлаас хамаарч уусалт бүр цор ганц байдаг.
                </p>
              </div>

              <div className="p-6 bg-brand-cream border border-brand-black/10 space-y-2">
                <h3 className="font-bold text-sm font-sans uppercase text-brand-black">3. Төлбөрийн нөхцөл ямар вэ? QPay дэмжих үү?</h3>
                <p className="text-xs text-brand-black/80 leading-relaxed font-sans">
                  Тийм ээ, бид Монголын бүх банкны эпп (Хаан Банк, Голомт Банк, Төрийн Банк, Хас Банк, М Банк, SocialPay гэх мэт)-ээр QR код уншуулж QPay төлбөрийн системээр шууд төлөх боломжтой.
                </p>
                <button
                  onClick={() => setIsQPayOpen(true)}
                  className="mt-2 flex items-center gap-2 text-xs font-bold text-brand-prussian bg-brand-gold px-4 py-2 rounded uppercase"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QPay-ээр төлбөр шалгаж турших</span>
                </button>
              </div>

              <div className="p-6 bg-brand-cream border border-brand-black/10 space-y-2">
                <h3 className="font-bold text-sm font-sans uppercase text-brand-black">4. Хүргэлт яаж хийгддэг вэ?</h3>
                <p className="text-xs text-brand-black/80 leading-relaxed font-sans">
                  Улаанбаатар хот дотор 24-48 цагийн дотор эко сав баглаа боодолтойгоор үнэгүй хүргэгдэнэ. Орон нутаг болон олон улсын хүргэлтийг шуудангаар илгээнэ.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Returns Tab */}
        {activeTab === "returns" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <RotateCcw className="w-8 h-8 text-brand-gold mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-brand-black font-bold">Буцаалтын нөхцөл (Return Policy)</h2>
            </div>
            
            <div className="p-8 bg-brand-cream border border-brand-black/10 space-y-6 text-xs text-brand-black/80 leading-relaxed font-sans">
              <p>
                Бүтээгдэхүүнийг хүлээн авснаас хойш <strong>7 хоногийн дотор</strong> хэрэглээгүй, угаагаагүй, анхны шошго болон эко сав баглаа боодолтой нь буцаах эсвэл солих боломжтой.
              </p>
              <div className="p-4 bg-brand-gold/10 border-l-2 border-brand-gold space-y-1">
                <span className="font-bold text-brand-black uppercase block">Санамж:</span>
                <p>
                  Цаг хугацааны эрхээр болон угаалтын явцад өнгө бага зэрэг хувирах нь гар аргаар бүтээгдсэн амьд урлагийн (Handmade Culture) байгалийн жам бөгөөд энэ нь чанарын доголдолд тооцогдохгүй.
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      <QPayModal
        isOpen={isQPayOpen}
        onClose={() => setIsQPayOpen(false)}
        productName="LEO STUDIO — Захиалгын Төлбөр"
        amount={189000}
      />
    </section>
  );
}
