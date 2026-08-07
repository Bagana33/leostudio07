import { motion } from "motion/react";
import step2Image from "@/assets/images/process-1.png";

const STEPS = [
  {
    id: "01",
    title: "Даавууг бэлтгэх",
    desc: "Бид гэрэлд мэдрэмтгий уусмалыг байгалийн цэвэр даавуун дээр гар аргаар түрхэж, гэрэлтэй уулзах гадаргууг бэлтгэдэг.",
    image: "https://images.unsplash.com/photo-1520004434532-668416a08753?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Нарны гэрэлд тусгах",
    desc: "Газар дундын тэнгисийн нарны доор ургамал болон сүүдэр даавуунд бууж, цаг хугацааны химийн зан үйл явагдана.",
    image: step2Image
  },
  {
    id: "03",
    title: "Угааж ил гаргах",
    desc: "Даавууг усаар угааснаар нууцлаг Прусс хөх хээ угалз тодорч, дурсгал мөнхөрнө.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Process() {
  return (
    <section id="process" className="bg-brand-cream py-40 border-t border-brand-grey/20 relative bg-paper">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <span className="text-[10px] tracking-[0.6em] text-brand-gold font-sans font-bold uppercase block mb-6">ГЭРЛИЙН ТУСГАЛЫН УРЛАГ</span>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-black leading-tight italic">Нарны гэрлээр <br/> бүтээв.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end">
            <p className="text-[15px] text-brand-black/60 leading-relaxed font-sans font-light">
              Бид 18-р зууны гэрэл зургийн арга техникийг ашиглан орчин үеийн өмсөж болох урлагийг бүтээдэг. Гэрлийн тусгал бүр нь цаг хугацааны давтагдашгүй агшин юм.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div className="relative mb-12 aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-cyan/5 mix-blend-overlay"></div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-cream border border-brand-grey/20 rounded-full flex items-center justify-center text-brand-black font-serif italic text-2xl z-10 transition-transform group-hover:rotate-12">
                   {step.id}
                </div>
              </div>
              
              <div className="space-y-6 pt-4 border-t border-brand-black/5">
                <h3 className="text-2xl font-serif text-brand-black tracking-widest uppercase">{step.title}</h3>
                <p className="text-[13px] text-brand-black/40 leading-relaxed font-sans max-w-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
