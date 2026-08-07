import { motion } from "motion/react";

const MATERIALS = [
  { name: "Цианотип Индиго", desc: "Угаалт бүрээр гүнзгийрэх Прусс хөх үндсэн пигмент.", color: "#0A2A66" },
  { name: "Байгалийн органик даавуу", desc: "100% Хөвөн даавуу, маалинга ба бамбук ширхэгт.", color: "#FDFCF5" },
  { name: "Монгол Нарны Гэрэл", desc: "Ургамлын хээ ба геометрийн хэлбэрийг амилуулах нарны УВ тусгал.", color: "#BFA46A" },
  { name: "Эко Пигмент", desc: "Орчин үеийн болон эртний зан үйлийг илэрхийлэх байгалийн эрдэс.", color: "#D8D8D2" },
];

export default function MaterialArchive() {
  return (
    <section id="materials" className="bg-brand-cream py-32 border-t border-brand-grey/20 bg-paper overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-6">УРЛАГИЙН ҮНДЭС</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-black leading-tight italic mb-8">Материалын архив.</h2>
            <p className="text-[15px] text-brand-black/70 leading-relaxed font-sans font-light max-w-sm mb-16">
              LEO STUDIO-ийн гоо зүй нь химийн болон байгалийн органик нэгдэлд оршдог. Энд бид урлагийнхаа үндсэн элементүүдийг тэмдэглэн үлдээдэг.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {MATERIALS.map((mat, idx) => (
                <motion.div 
                  key={mat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div 
                    className="w-full aspect-video grayscale border border-brand-black/10"
                    style={{ backgroundColor: mat.color }}
                  ></div>
                  <div className="space-y-2">
                    <h4 className="text-[11px] tracking-[0.2em] font-sans font-bold uppercase text-brand-black">{mat.name}</h4>
                    <p className="text-[12px] text-brand-black/70 font-sans leading-relaxed">{mat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               viewport={{ once: true }}
               className="aspect-square bg-brand-prussian relative p-12 lg:p-24 overflow-hidden"
             >
                {/* Abstract graphic */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
                <div className="relative z-10 w-full h-full border border-brand-cream/20 flex flex-col items-center justify-center text-center">
                    <div className="text-brand-cream font-serif italic text-6xl md:text-8xl opacity-20 select-none">LEO</div>
                    <p className="text-brand-gold font-sans tracking-[0.4em] text-xs uppercase mt-4">Wearable Art from Mongolia</p>
                </div>
                {/* Color Blobs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-brand-gold/30 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-brand-cyan/40 blur-3xl"></div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
