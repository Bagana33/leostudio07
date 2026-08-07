import { motion } from "motion/react";

export default function Story() {
  return (
    <section id="story" className="bg-brand-cream py-40 overflow-hidden relative bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop" 
                alt="LEO STUDIO Atelier"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-cyan/5 mix-blend-overlay"></div>
            </div>
            {/* Decorative Offset Box */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-brand-black/10 -z-10 hidden lg:block"></div>
          </motion.div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-4">БИДНИЙ ТУХАЙ & БҮТЭЭЛЧ ФИЛОСОФИ</span>
                <h2 className="text-4xl md:text-6xl font-serif text-brand-black leading-tight italic">
                  Art First. <br /> <span className="not-italic text-brand-cyan">Story First.</span>
                </h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8 text-brand-black/80 font-sans font-light"
            >
              {/* Vision Block */}
              <div className="p-6 bg-brand-cream/60 border-l-2 border-brand-gold space-y-2">
                <h3 className="text-xs font-bold tracking-[0.3em] text-brand-gold uppercase">Брэндийн алсын хараа / Vision</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed">
                  Монголын хамгийн танигдсан Cyanotype арт брэнд болж, олон улсын зах зээлд Монголын визуал соёлыг шинэ өнцгөөс таниулах.
                </p>
              </div>

              {/* Cyanotype Art Block */}
              <div className="p-6 bg-brand-cream/60 border-l-2 border-brand-cyan space-y-2">
                <h3 className="text-xs font-bold tracking-[0.3em] text-brand-cyan uppercase">Cyanotype буюу Нарны урлаг</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed">
                  Энэхүү бүтээл нь нарны гэрэл, цаг хугацаа болон Монгол өв соёлыг шингээж, Cyanotype аргаар гар аргаар бүтээгдсэн цор ганц урлагийн бүтээл юм.
                </p>
              </div>

              {/* Sustainability Block */}
              <div className="p-6 bg-brand-cream/60 border-l-2 border-brand-black/30 space-y-2">
                <h3 className="text-xs font-bold tracking-[0.3em] text-brand-black/60 uppercase">Тогтвортой хөгжил / Sustainability</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed">
                  Бид "Slow Fashion" чиглэлийг баримталж, байгальд ээлтэй материал болох Organic Cotton, Hemp, Bamboo зэргийг эко сав баглаа боодолтой хослуулан ашиглах зорилт тавин ажиллаж байна.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6 flex items-center gap-6 group"
            >
              <div className="w-12 h-[1px] bg-brand-black/20 group-hover:w-24 transition-all duration-700"></div>
              <p className="font-serif italic text-brand-cyan text-xl md:text-2xl group-hover:tracking-wider transition-all duration-700">Wearable Art from Mongolia</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute right-0 bottom-0 opacity-[0.02] select-none pointer-events-none translate-y-1/4">
        <h2 className="text-[20vw] font-serif leading-none tracking-tighter">ATELIER</h2>
      </div>
    </section>
  );
}
