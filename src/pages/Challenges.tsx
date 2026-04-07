import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Check, Star, Leaf, Bike, 
  Trash2, Coffee, Lightbulb, Droplets, 
  Wind, ShoppingBag, Trees, Flame, 
  Zap, UtensilsCrossed, Apple, Recycle,
  Smartphone, BookOpen, GraduationCap,
  ShieldCheck, Rocket, Heart
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- قائمة التحديات الخارقة (20 تحدي) ---
export const initialChallenges = [
  { id: 1, title: "يوم من غير بلاستيك", points: 250, description: "ممنوع تستخدم أكياس أو ازايز بلاستيك النهاردة، استبدلها بشنط قماش وازايز إزاز.", category: "waste", icon: <ShoppingBag /> },
  { id: 2, title: "مشي بدل العربية", points: 150, description: "لو المشوار قريب، انزل اتمشى أو خد عجلة وفكك من زحمة العربيات ودخانها.", category: "transport", icon: <Bike /> },
  { id: 3, title: "فصل الزبالة", points: 200, description: "افصل الورق والبلاستيك في كيس لوحدهم عشان يروحوا إعادة تدوير.", category: "recycling", icon: <Trash2 /> },
  { id: 4, title: "وجبة خضار بس", points: 300, description: "جرب تعيش النهاردة على الخضار والفاكهة وادي اللحمة إجازة، الكوكب هيشكرك.", category: "food", icon: <UtensilsCrossed /> },
  { id: 5, title: "ظلام تام (ساعة الأرض)", points: 100, description: "اطفي كل الأنوار والأجهزة اللي مش محتاجها لمدة ساعة كاملة.", category: "energy", icon: <Lightbulb /> },
  { id: 6, title: "وداعاً للمناديل الورق", points: 120, description: "استخدم فوطة قماش بدل المناديل الورق اللي بتخلص بسرعة وبتقطع شجر كتير.", category: "waste", icon: <Leaf /> },
  { id: 7, title: "دش الـ 5 دقائق", points: 180, description: "خليك سريع في الاستحمام، كل دقيقة بتوفر لترات مية محتاجها الكوكب.", category: "water", icon: <Droplets /> },
  { id: 8, title: "بلكونة خضراء", points: 500, description: "ازرع زرعة جديدة في بلكونتك أو قدام بيتك، خلي الدنيا تزهزه.", category: "nature", icon: <Trees /> },
  { id: 9, title: "قاطع المنتجات المستوردة", points: 220, description: "اشتري أكل وشرب من انتاج بلدك عشان نقلل انبعاثات الشحن والطيارات.", category: "transport", icon: <Apple /> },
  { id: 10, title: "ممنوع الشواحن النايمة", points: 80, description: "شيل أي شاحن من الفيشة طالما مش بيشحن موبايلك، بيسحب كهرباء وأنت مش حاسس.", category: "energy", icon: <Zap /> },
  { id: 11, title: "استخدم السلم", points: 140, description: "انسى الأسانسير النهاردة، رياضة ليك وتوفير كهرباء للبرج.", category: "energy", icon: <Flame /> },
  { id: 12, title: "القهوة في كوبايتك", points: 110, description: "لو هتجيب قهوة من بره، خد كوبايتك معاك بدل الكوبايات الورق/البلاستيك.", category: "waste", icon: <Coffee /> },
  { id: 13, title: "اتبرع بقديمك", points: 400, description: "هدومك اللي مش بتلبسها غيرك محتاجها، إعادة تدوير البشر أحلى بكتير.", category: "social", icon: <Heart /> },
  { id: 14, title: "ممنوع ديليفري", points: 260, description: "اطبخ في البيت النهاردة، الديليفري بيجي في بلاستيك وشنط كتير ملهومش لازمة.", category: "waste", icon: <ShoppingBag /> },
  { id: 15, title: "فصل فيشة التلفزيون", points: 90, description: "اطفي التلفزيون وشيل الفيشة قبل ما تنام، اللمبة الحمراء دي بتسحب طاقة!", category: "energy", icon: <Smartphone /> },
  { id: 16, title: "اتعلم حاجة بيئية", points: 150, description: "اقرأ مقال أو اتفرج على فيديو بيشرح أزمة المناخ وفهم اللي حولك.", category: "edu", icon: <BookOpen /> },
  { id: 17, title: "يوم المية من الحنفية", points: 130, description: "اشرب من فلتر البيت وبلاش تشتري ازايز مية معدنية بلاستيك.", category: "water", icon: <Droplets /> },
  { id: 18, title: "تنظيف الشارع", points: 600, description: "لم 5 حاجات بلاستيك مرمية في الشارع وأنت ماشي وحطهم في الباسكت.", category: "nature", icon: <Recycle /> },
  { id: 19, title: "شغل المروحة بدل التكييف", points: 350, description: "لو الجو يسمح، افتح الشباك وشغل مروحة، التكييف عدو البيئة الأول.", category: "energy", icon: <Wind /> },
  { id: 20, title: "انشر الوعي", points: 200, description: "شير بوست عن الاستدامة أو كلم صاحبك عن ابلكيشن 'أرض أخضر'.", category: "social", icon: <GraduationCap /> },
];

interface ChallengesProps {
  data: { completed: number[]; score: number; };
  setData: React.Dispatch<React.SetStateAction<{ completed: number[]; score: number; }>>;
  onCompleteChallenge: () => void;
}

export function Challenges({ data, setData, onCompleteChallenge }: ChallengesProps) {
  const { completed, score } = data;

  const progress = useMemo(() => {
    return Math.round((completed.length / initialChallenges.length) * 100);
  }, [completed]);

  const toggleChallenge = (id: number, points: number) => {
    if (completed.includes(id)) {
      setData(prev => ({
        completed: prev.completed.filter(c => c !== id),
        score: Math.max(0, prev.score - points)
      }));
    } else {
      setData(prev => ({
        completed: [...prev.completed, id],
        score: prev.score + points
      }));
      onCompleteChallenge();
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc] pb-24 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-20 right-10 text-emerald-100 rotate-12"><Trees size={200} /></div>
        <div className="absolute bottom-20 left-10 text-emerald-100 -rotate-12"><Leaf size={150} /></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        
        {/* --- Header & Stats Card --- */}
        <header className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-right">
              <h2 className="text-4xl font-black text-slate-900 mb-2">تحديات <span className="text-emerald-600">الأبطال</span></h2>
              <p className="text-slate-500 font-medium">كل تحدي بتخلصه، الأرض بتتنفس بسببه. جاهز؟</p>
              
              {/* Progress Bar */}
              <div className="mt-6 w-full md:w-80">
                <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                  <span className="text-emerald-600">{progress}% إنجاز</span>
                  <span className="text-slate-400">{completed.length} من {initialChallenges.length}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-emerald-600 text-white px-10 py-6 rounded-[2.5rem] flex flex-col items-center shadow-xl">
                <Trophy className="w-10 h-10 mb-2 animate-bounce" />
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">مجموع نقطك</p>
                <p className="text-5xl font-black">{score}</p>
              </div>
            </div>
          </div>
        </header>

        {/* --- Challenges Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {initialChallenges.map((challenge, index) => {
              const isDone = completed.includes(challenge.id);
              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "group relative overflow-hidden rounded-[2.5rem] p-1 transition-all duration-500",
                    isDone ? "bg-gradient-to-br from-emerald-100 to-emerald-200" : "bg-white border-2 border-slate-50 hover:border-emerald-100 shadow-sm hover:shadow-xl"
                  )}
                >
                  <div className={cn(
                    "h-full w-full rounded-[2.3rem] p-6 flex flex-col justify-between transition-colors",
                    isDone ? "bg-emerald-50/50" : "bg-white"
                  )}>
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                        isDone ? "bg-emerald-500 text-white rotate-[360deg]" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 group-hover:rotate-12"
                      )}>
                        {React.cloneElement(challenge.icon as React.ReactElement, { size: 28 } as any)}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          {isDone && <ShieldCheck size={16} className="text-emerald-600" />}
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                            isDone ? "bg-emerald-200 text-emerald-800" : "bg-slate-100 text-slate-500"
                          )}>
                            {isDone ? 'تم التنفيذ' : `+${challenge.points} نقطة`}
                          </span>
                        </div>
                        <h3 className={cn("text-xl font-black transition-colors", isDone ? "text-emerald-900" : "text-slate-800")}>
                          {challenge.title}
                        </h3>
                      </div>
                    </div>

                    <p className={cn("text-sm leading-relaxed text-right mb-6", isDone ? "text-emerald-700/70 italic" : "text-slate-500")}>
                      {challenge.description}
                    </p>

                    <button
                      onClick={() => toggleChallenge(challenge.id, challenge.points)}
                      className={cn(
                        "w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 active:scale-95",
                        isDone 
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                          : "bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-slate-100"
                      )}
                    >
                      {isDone ? (
                        <> <Check size={18} strokeWidth={3} /> تسلم يا بطل! </>
                      ) : (
                        <> <Rocket size={18} /> هعمل التحدي ده </>
                      )}
                    </button>
                  </div>

                  {/* Decorative Sparkle for completed ones */}
                  {isDone && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute top-2 left-8 text-emerald-300"
                    >
                      <Star size={40} fill="currentColor" className="animate-pulse" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- Bottom Motivational Quote --- */}
        <footer className="mt-20 text-center">
          <div className="inline-block bg-white border border-emerald-100 px-8 py-4 rounded-3xl shadow-sm">
            <p className="text-slate-600 font-bold italic">
              "مفيش فعل صغير طالما بيتعمل عشان الكوكب.. استمر!"
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
          </div>
        </footer>

      </div>
    </div>
  );
}