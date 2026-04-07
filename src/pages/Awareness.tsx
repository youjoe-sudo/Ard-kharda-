import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Thermometer, Recycle, Wind, Droplets, Beaker, 
  FlaskConical, Leaf, Lightbulb, Timer, Sparkles, 
  Zap, Sprout, Globe, AlertTriangle, HelpCircle,
  CheckCircle2, ArrowRight, Microscope, Biohazard, Trees
} from 'lucide-react';
import { CactusExperiment } from '../components/CactusExperiment';

// --- البيانات المعززة ---
const topics = [
  {
    id: 1,
    title: "الاحتباس الحراري",
    subtitle: "الأرض بتسخن يا جدعان!",
    icon: Thermometer,
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    description: "تخيل إنك لابس جاكيت تقيل في عز الصيف ومضطر تمشي بيه.. ده بالظبط اللي الغازات بتعمله في الكوكب، بتحبس الحرارة ومش بتخليها تطلع.",
    stats: "الحرارة زادت 1.1 درجة، وده رقم يخوف في لغة الكواكب!"
  },
  {
    id: 2,
    title: "إعادة التدوير",
    subtitle: "مترميش حاجة، كله بينفع!",
    icon: Recycle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    description: "بدل ما نرمي الزبالة ونملى بيها الأرض، بنرجع نصنعها من تاني. الكانز اللي بتشربه ممكن يرجع يبقى عجلة أو حتى طيارة!",
    stats: "علبة واحدة توفر كهرباء تشغل التلفزيون ماتش كامل 3 ساعات."
  },
  {
    id: 3,
    title: "الطاقة النظيفة",
    subtitle: "شمسنا وريحنا هما المستقبل",
    icon: Wind,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    description: "بدل ما نحرق فحم ونطلع دخان يخنقنا، بناخد طاقتنا من الشمس والرياح.. طاقة ببلاش ومن غير ريحة ولا دخان.",
    stats: "الشمس حالياً هي أرخص كهرباء في تاريخ البشرية كله."
  },
  {
    id: 4,
    title: "أثر البلاستيك",
    subtitle: "وحش البحر الحقيقي",
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    description: "الشوكة البلاستيك اللي بتستخدمها في 5 دقايق، بتمطر في البحر وتفضل هناك 400 سنة وتأذي السمك اللي بناكله.",
    stats: "كل سنة فيه 8 مليون طن بلاستيك بيترمي في المحيطات."
  }
];

const myths = [
  { q: "هل الورق دايما أحسن من البلاستيك؟", a: "مش دايماً! تصنيع الورق بيستهلك مية طاقة أكتر بكتير، الحل في 'إعادة الاستخدام' مش نوع المادة." },
  { q: "هل إعادة التدوير لوحدها هتحل المشكلة؟", a: "لأ طبعاً، الأهم إننا 'نقلل' استهلاكنا من الأول (Reduce) قبل ما نفكر ندور." }
];

const cactusPlastic = {
  title: "بلاستيك الصبار (Nopal Plastic)",
  description: "مشروع 'ساندرا باسكو' اللي قلب الدنيا.. تخيل إننا بنصنع بلاستيك لو رميته في جنينة بيتكم يتحول لسماد ويغذي الشجر في أسابيع!",
  presentationTips: [
    "اعمل برطمان شيك فيه الخليط وهو لسه سائل عشان الحكام يشوفوا القوام.",
    "هات حتة بلاستيك ناشفة جاهزة وخليهم يحاولوا يقطعوها عشان يشوفوا قوتها.",
    "قولهم 'البلاستيك ده لو القطة أكلته مش هيحصلها حاجة'.. دي جملة بتكسب قلوب الحكام!",
    "ركز على إن الصبار مبيحتاجش مية كتير، يعني مشروع موفر جداً في مصر."
  ]
};

export function Awareness() {
  const { scrollYProgress } = useScroll();
  const leafRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 relative overflow-hidden">
      
      {/* --- Decorative Floating Elements --- */}
      <motion.div style={{ rotate: leafRotate }} className="fixed top-20 -left-20 opacity-5 pointer-events-none z-0">
        <Leaf size={400} className="text-emerald-900" />
      </motion.div>
      <div className="fixed bottom-10 -right-20 opacity-5 pointer-events-none z-0">
        <Trees size={300} className="text-emerald-900" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Hero Header --- */}
        <header className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Microscope size={16} /> معمل الوعي الأخضر
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            ازاي ننقذ <span className="text-emerald-600">كوكبنا؟</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            مش مجرد كلام كتب.. هنا هتفهم الحكاية ببساطة، وتتعلم ازاي تعمل تجارب علمية تغير بيها مستقبلك.
          </p>
        </header>

        {/* --- Core Topics Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border-2 ${topic.border} relative overflow-hidden group`}
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 ${topic.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${topic.bg} flex items-center justify-center mb-6`}>
                  <topic.icon className={`w-8 h-8 ${topic.color}`} />
                </div>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{topic.subtitle}</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-4 text-right">{topic.title}</h3>
                <p className="text-slate-600 mb-6 text-right leading-relaxed h-20 overflow-hidden text-sm">
                  {topic.description}
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 justify-end">
                   <p className="text-sm font-bold text-slate-800 text-right">{topic.stats}</p>
                   <div className="p-2 bg-white rounded-lg shadow-sm font-black text-xs text-emerald-600">DASH</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Pro Experiment Section (The BIG One) --- */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden mb-24"
        >
          {/* Animated Background Gradient */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-4 bg-emerald-500/20 rounded-3xl backdrop-blur-xl border border-white/10">
                  <Biohazard className="text-emerald-400 w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-4xl font-black">{cactusPlastic.title}</h2>
                  <p className="text-emerald-400 font-bold">تجربة المعمل المنزلي</p>
                </div>
              </div>

              <p className="text-lg text-slate-300 mb-10 leading-relaxed text-right">
                {cactusPlastic.description}
              </p>

              {/* Steps Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  { t: "عصر الصبار", d: "اضرب الصبار في الخلاط وصفيه تماماً من الألياف." },
                  { t: "الخلط الذكي", d: "ضيف النشا والخل والجلسرين على البارد وقلب." },
                  { t: "التسخين", d: "على نار هادية لحد ما لونه يبقى شفاف وتقيل." },
                  { t: "التجفيف", d: "صبه على لوح زجاج وسيبه ينشف براحته." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold shrink-0">{i+1}</div>
                    <div className="text-right">
                      <h5 className="font-bold text-white">{step.t}</h5>
                      <p className="text-xs text-slate-400 mt-1">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem]">
                <h4 className="flex items-center gap-2 font-black text-emerald-400 mb-4 justify-end">
                  نصايح من "أرض أخضر" بالعامية <Sparkles size={18} />
                </h4>
                <div className="space-y-3">
                  {cactusPlastic.presentationTips.map((tip, i) => (
                    <div key={i} className="flex gap-3 items-start justify-end">
                      <p className="text-sm text-emerald-100/80 text-right">{tip}</p>
                      <CheckCircle2 size={16} className="text-emerald-500 mt-1 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8">
                  <div className="flex justify-center mb-6">
                     <FlaskConical size={100} className="text-emerald-400 animate-bounce" />
                  </div>
                  <h4 className="text-center text-xl font-bold mb-4 italic">"البلاستيك ده بيتأكل!"</h4>
                  <div className="space-y-4">
                     <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-emerald-400 font-bold">200 ml</span>
                        <span className="text-sm">عصير صبار</span>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center">
                        <span className="text-emerald-400 font-bold">1 Tbsp</span>
                        <span className="text-sm">نشا ذرة</span>
                     </div>
                  </div>
                  <button className="w-full mt-8 bg-emerald-600 py-4 rounded-2xl font-black hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/50">
                    ابدأ التجربة الآن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- Myths vs Facts --- */}
        <section className="mb-24">
          <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">خرافة ولا حقيقة؟ 🤔</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myths.map((myth, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2 justify-end">
                   {myth.q} <HelpCircle className="text-emerald-500" />
                </h4>
                <p className="text-slate-500 text-right leading-relaxed">
                  {myth.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Interactive Lab Injection --- */}
        <div className="bg-emerald-50 rounded-[3rem] p-2 border-2 border-emerald-100 mb-10">
          <div className="bg-white rounded-[2.8rem] p-8 md:p-12 shadow-inner">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <div className="flex items-center gap-4 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <Zap size={20} className="animate-pulse" />
                <span className="font-bold">المختبر الافتراضي جاهز</span>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-black text-slate-900">جرب بالنسب بتاعتك!</h2>
                <p className="text-slate-500 mt-1 font-medium">شوف ايه اللي هيحصل لو زودت الجلسرين أو قللت النشا.</p>
              </div>
            </div>
            <CactusExperiment />
          </div>
        </div>

        {/* --- CTA Footer --- */}
        <footer className="text-center py-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-emerald-600/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 px-6">
            <h3 className="text-2xl font-bold mb-4">خلصت القراية؟</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              المعلومات دي مش للتخزين، دي عشان تتحرك.. ابدأ أول تحدي ليك النهاردة وشوف أثرك على الأرض.
            </p>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black flex items-center gap-2 mx-auto hover:bg-emerald-400 hover:scale-105 transition-all">
               اذهب للتحديات <ArrowRight size={20} />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}