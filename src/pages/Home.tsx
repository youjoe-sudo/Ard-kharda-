import React from 'react';
import { ArrowRight, Leaf, Globe, Zap, TreePine, Flame, Users, Droplets, Sprout, Flame as Fire } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

  const handlePlantClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#059669']
    });
    onPlantTree();
  };

  return (
    <div className="flex flex-col items-center p-6 text-center min-h-[calc(100vh-8rem)] pb-24">
      
      {/* Planet Dashboard - Global Stats */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mb-12 bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-white/10 pb-6">
          <div className="text-right">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              وضع الكوكب
            </h2>
            <p className="text-stone-400 text-sm">إحصائيات مجتمع أرض أخضر المباشرة</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30">
              <Fire className="w-5 h-5 text-orange-500 animate-pulse" />
              <span className="text-orange-400 font-bold">{streak} يوم حماس</span>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20 animate-pulse">
              مباشر
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <div className="flex items-center justify-center gap-2 mb-2 text-stone-400">
              <TreePine className="w-5 h-5" />
              <span className="text-sm">أشجار زرعت</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">{(12540 + plantedTrees).toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2 text-stone-400">
              <Flame className="w-5 h-5" />
              <span className="text-sm">كربون تم توفيره</span>
            </div>
            <p className="text-3xl font-bold text-yellow-400">450 <span className="text-sm font-normal">طن</span></p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2 text-stone-400">
              <Users className="w-5 h-5" />
              <span className="text-sm">أبطال البيئة</span>
            </div>
            <p className="text-3xl font-bold text-blue-400">8,200</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2 mb-2 text-stone-400">
              <Droplets className="w-5 h-5" />
              <span className="text-sm">مياه تم توفيرها</span>
            </div>
            <p className="text-3xl font-bold text-cyan-400">1.2 <span className="text-sm font-normal">مليون لتر</span></p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto space-y-8 w-full"
      >
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
          <Leaf className="w-8 h-8 text-emerald-600" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight">
          {userName && <span className="block text-2xl md:text-3xl text-stone-500 font-medium mb-2">أهلاً، {userName}</span>}
          أرض <span className="text-emerald-600">أخضر</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          منصة رقمية لتحويل السلوك البيئي من "كلام نظري" إلى "أفعال يومية قابلة للقياس".
        </p>

        {/* My Forest Section */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-stone-100">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${progressToNextTree}%` }}
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-4">
            <div className="text-right">
              <h3 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                <TreePine className="w-6 h-6 text-emerald-600" />
                غابتك الرقمية
              </h3>
              <p className="text-stone-500 text-sm mt-1">
                كل 100 نقطة = شجرة جديدة. 
                <span className="text-emerald-600 font-bold mx-1">{100 - progressToNextTree} نقطة</span>
                متبقية للشجرة القادمة.
              </p>
            </div>
            
            {treesAvailableToPlant > 0 && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlantClick}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 animate-bounce"
              >
                <Sprout className="w-5 h-5" />
                ازرع شجرة ({treesAvailableToPlant})
              </motion.button>
            )}
          </div>

          <div className="bg-emerald-50/50 rounded-2xl p-6 min-h-[200px] flex flex-wrap content-start gap-4 justify-center md:justify-start">
            <AnimatePresence>
              {plantedTrees === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 py-10">
                  <TreePine className="w-12 h-12 mb-2 opacity-20" />
                  <p>لم تزرع أي أشجار بعد</p>
                </div>
              )}
              {Array.from({ length: plantedTrees }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="text-4xl filter drop-shadow-md">🌳</div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    شجرة #{i + 1}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <Globe className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">تأثير عالمي</h3>
            <p className="text-stone-500 text-sm">ساهم في تقليل الانبعاثات الكربونية وحماية الكوكب.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">أفعال يومية</h3>
            <p className="text-stone-500 text-sm">خطوات بسيطة يومية تصنع فرقاً كبيراً على المدى الطويل.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <Leaf className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">أسلوب حياة</h3>
            <p className="text-stone-500 text-sm">حول الوعي البيئي إلى عادات مستدامة وممتعة.</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
        >
          ابدأ رحلتك البيئية
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </motion.button>
      </motion.div>
    </div>
  );
}
