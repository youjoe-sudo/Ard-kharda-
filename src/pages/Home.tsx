import React, { useMemo } from 'react';
import { ArrowRight, Leaf, Globe, Zap, TreePine, Flame, Users, Droplets, Sprout, Flame as Fire, TrendingUp, Award, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface HomeProps {
  onStart: () => void;
  score: number;
  plantedTrees: number;
  onPlantTree: () => void;
  streak: number;
  userName?: string;
}

export function Home({ onStart, score, plantedTrees, onPlantTree, streak, userName }: HomeProps) {
  const treesUnlockable = Math.floor(score / 100);
  const treesAvailableToPlant = treesUnlockable - plantedTrees;
  const progressToNextTree = (score % 100);
  
  // رتبة البطل بناءً على النقط
  const rank = useMemo(() => {
    if (score < 500) return { name: "مُحارب مبتدئ", color: "text-slate-400", icon: <Sprout /> };
    if (score < 1500) return { name: "صديق البيئة", color: "text-emerald-400", icon: <Leaf /> };
    if (score < 5000) return { name: "حارس الغابة", color: "text-blue-400", icon: <TreePine /> };
    return { name: "أسطورة الطبيعة", color: "text-amber-400", icon: <Award /> };
  }, [score]);

  const handlePlantClick = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#ffffff', '#6ee7b7']
    });
    onPlantTree();
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 text-center min-h-screen bg-[#f8fafc] pb-32">
      
      {/* --- Global Planet Dashboard --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl mb-10 bg-slate-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden border border-white/5"
      >
        {/* تأثيرات الإضاءة في الخلفية */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 mb-10 border-b border-white/10 pb-8">
          <div className="text-right">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <div className="bg-blue-500/20 p-2 rounded-xl">
                <Globe className="w-6 h-6 text-blue-400 animate-spin-slow" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">رادار الكوكب المباشر</h2>
            </div>
            <p className="text-slate-400 text-sm font-medium">مجهوداتنا الجماعية بتغير الواقع حالاً!</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-orange-500/10 px-6 py-3 rounded-2xl border border-orange-500/20 backdrop-blur-md">
              <Fire className="w-6 h-6 text-orange-500 animate-bounce" />
              <div className="text-right">
                <p className="text-[10px] text-orange-300/60 font-bold uppercase tracking-widest">ستريك الحماس</p>
                <p className="text-lg font-black text-orange-400">{streak} يوم ورا بعض</p>
              </div>
            </motion.div>
            
            <div className={`flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md ${rank.color}`}>
              {rank.icon}
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">رتبتك الحالية</p>
                <p className="text-lg font-black">{rank.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { label: "أشجار زرعناها", val: (12540 + plantedTrees).toLocaleString(), icon: <TreePine />, color: "text-emerald-400" },
            { label: "كربون وفرناه", val: "450 طن", icon: <TrendingUp />, color: "text-yellow-400" },
            { label: "أبطال معانا", val: "8,242", icon: <Users />, color: "text-blue-400" },
            { label: "مية وفرناها", val: "1.2M لتر", icon: <Droplets />, color: "text-cyan-400" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-5 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all"
            >
              <div className={`flex items-center justify-center gap-2 mb-3 opacity-60 ${stat.color}`}>
                {stat.icon}
                <span className="text-xs font-bold uppercase tracking-tighter">{stat.label}</span>
              </div>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- Welcome Section --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="inline-block p-4 bg-emerald-100 rounded-[2rem] mb-6 shadow-sm">
          <Leaf className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          {userName && <span className="block text-2xl text-slate-400 font-medium mb-2">منور يا بطل، {userName}</span>}
          أرض <span className="text-emerald-600 relative inline-block">
            أخضر
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="#10b981" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          أول ابلكيشن يحول خطواتك البسيطة لغابة حقيقية وتأثير ملموس. 
          <br /><span className="text-slate-900">أنت مش لوحدك، إحنا جيش بيحمي الأرض!</span>
        </p>
      </motion.div>

      {/* --- The Digital Forest (The Heart of Home) --- */}
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-[4rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
        
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-3 bg-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextTree}%` }}
            className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 mt-4">
          <div className="text-right">
            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <TreePine className="w-8 h-8 text-emerald-600" />
              غابتك الشخصية
            </h3>
            <p className="text-slate-500 font-bold mt-2">
              كل 100 نقطة بتزرع شجرة.. فاضلك <span className="text-emerald-600 text-xl">{100 - progressToNextTree}</span> نقطة ع الشجرة الجاية. عاش!
            </p>
          </div>

          <AnimatePresence>
            {treesAvailableToPlant > 0 && (
              <motion.button
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlantClick}
                className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-3 group"
              >
                <Sprout className="w-7 h-7 group-hover:animate-bounce" />
                ازرع شجرة دلوقتي ({treesAvailableToPlant})
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Forest Canvas */}
        <div className="bg-gradient-to-b from-emerald-50/50 to-white rounded-[3rem] p-10 min-h-[350px] border-2 border-dashed border-emerald-100 flex flex-wrap content-start gap-8 justify-center items-end relative overflow-hidden">
          
          {plantedTrees === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
               <Box className="w-20 h-20 mb-4 opacity-10" />
               <p className="font-black text-xl opacity-30 italic uppercase tracking-widest">الأرض مستنية لمستك.. ابدأ التحديات!</p>
            </div>
          )}

          <AnimatePresence>
            {Array.from({ length: plantedTrees }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.3, rotate: [0, -5, 5, 0] }}
                className="relative group cursor-pointer"
              >
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                  className="text-6xl md:text-8xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
                >
                  {i % 3 === 0 ? '🌳' : i % 3 === 1 ? '🌲' : '🌴'}
                </motion.div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-black border border-white/20">
                  شجرة بطل #{i + 1}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Decorative Ground */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-emerald-100/30" />
        </div>
      </div>

      {/* --- Action Button --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <button
          onClick={onStart}
          className="group bg-slate-900 text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl hover:bg-emerald-600 transition-all flex items-center gap-4 active:scale-95"
        >
          دوس عشان تنقذ الكوكب
          <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform rtl:rotate-180" />
        </button>
        <p className="mt-4 text-slate-400 font-bold text-sm uppercase tracking-[0.2em]">تحديات النهاردة مستنية توقيعك</p>
      </motion.div>

    </div>
  );
}