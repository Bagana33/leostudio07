import { motion } from "motion/react";
import { Droplets, Wind, ShieldAlert, Thermometer } from "lucide-react";

const CARE_ITEMS = [
  {
    title: "Угаалт",
    desc: "Зөвхөн хүйтэн усаар (30°C-ээс доош хэмд), гараар эсвэл угаалгын машины зөөлөн (gentle) горимоор угаана уу.",
    icon: <Droplets className="w-6 h-6" strokeWidth={1} />,
  },
  {
    title: "Угаалгын бодис",
    desc: "Цайруулагч (bleach) болон фосфат (phosphate) агуулсан угаалгын нунтаг хэрэглэхээс хатуу татгалзана уу.",
    icon: <ShieldAlert className="w-6 h-6" strokeWidth={1} />,
  },
  {
    title: "Хатаах",
    desc: "Нарны шууд тусгалаас хол, сүүдэрт, хэвийг нь алдагдуулахгүйгээр дэлгэж хатаана.",
    icon: <Wind className="w-6 h-6" strokeWidth={1} />,
  },
  {
    title: "Индүүдэх",
    desc: "Хэвлэлтэй хэсгийг дотогш нь эргүүлж (inside out), бага хэмээр индүүднэ.",
    icon: <Thermometer className="w-6 h-6" strokeWidth={1} />,
  },
];

export default function CareGuide() {
  return (
    <section id="care" className="bg-brand-cream py-32 border-t border-brand-grey/20 bg-paper overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Header Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <span className="text-[10px] tracking-[0.5em] text-brand-gold font-sans font-bold uppercase block mb-6">ХАДГАЛАЛТ БА АРЧИЛГАА</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-black leading-tight">Арчилгааны <br /> заавар.</h2>
            <p className="text-[14px] text-brand-black/70 mt-8 leading-relaxed font-sans font-light max-w-xs">
              Удаан хугацаанд үнэ цэнээ хадгалахын тулд дараах зааврын дагуу арчилна уу.
            </p>
          </motion.div>

          {/* Items Column */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {CARE_ITEMS.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group border-l border-brand-grey/30 pl-8 space-y-6"
              >
                <div className="w-12 h-12 rounded-full border border-brand-grey/30 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-all duration-700">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-serif tracking-widest uppercase text-brand-black font-bold">{item.title}</h3>
                  <p className="text-[13px] text-brand-black/70 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
