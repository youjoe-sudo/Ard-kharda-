import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, Recycle, Leaf, Play, RotateCcw, 
  Trophy, Check, X, Timer, Zap, 
  Gamepad2, Wind, CloudOff, Star, 
  ArrowLeft, Target, Rocket, AlertCircle,
  Skull, FastForward
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesProps {
  onScoreUpdate: (points: number) => void;
}

const SORTING_ITEMS = [
  { id: 1, name: 'كانز بيبسي', type: 'recycle', icon: '🥫' },
  { id: 2, name: 'قشر مانجو', type: 'compost', icon: '🥭' },
  { id: 3, name: 'علبة بيتزا زيتية', type: 'trash', icon: '🍕' },
  { id: 4, name: 'كيس شيبسي معدني', type: 'trash', icon: '🥡' },
  { id: 5, name: 'ورق كرتون', type: 'recycle', icon: '📦' },
  { id: 6, name: 'نواة بلح', type: 'compost', icon: '🌴' },
  { id: 7, name: 'لمبة محروقة', type: 'trash', icon: '💡' },
  { id: 8, name: 'ازازة مية', type: 'recycle', icon: '🥤' },
  { id: 9, name: 'بقايا سلطة', type: 'compost', icon: '🥗' },
  { id: 10, name: 'فردة جزمة قديمة', type: 'trash', icon: '👟' },
  { id: 11, name: 'جرنال قديم', type: 'recycle', icon: '📰' },
  { id: 12, name: 'بطارية ريموت', type: 'trash', icon: '🔋' },
];

export function Games({ onScoreUpdate }: GamesProps) {
  const [activeGame, setActiveGame] = useState<'menu' | 'sorting' | 'carbon'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [highScore, setHighScore] = useState({ sorting: 0, carbon: 0 });

  const [currentItem, setCurrentItem] = useState<typeof SORTING_ITEMS[0] | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [carbonClouds, setCarbonClouds] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('eco_arcade_scores_v2');
    if (saved) setHighScore(JSON.parse(saved));
  }, []);

  // الموقت الرئيسي للعبتين
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleEndGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // --- منطق سباون الكربون (التعديل الجوهري هنا) ---
  const spawnCloud = useCallback(() => {
    const newCloud = {
      id: Math.random(),
      x: Math.random() * 80 + 5, // من 5% لـ 85% عرض
      y: Math.random() * 70 + 10, // من 10% لـ 80% طول
      size: Math.random() * 40 + 60, // أحجام مختلفة
    };
    setCarbonClouds(prev => [...prev, newCloud]);
  }, []);

  useEffect(() => {
    if (activeGame === 'carbon' && isPlaying) {
      // سرعة السباون بتزيد كل ما السكور يزيد
      const speed = Math.max(300, 900 - score * 5);
      spawnIntervalRef.current = setInterval(spawnCloud, speed);
    } else {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    }
    return () => { if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current); };
  }, [activeGame, isPlaying, score, spawnCloud]);

  const startSortingGame = () => {
    setActiveGame('sorting');
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setShowGameOver(false);
    setCurrentItem(SORTING_ITEMS[Math.floor(Math.random() * SORTING_ITEMS.length)]);
  };

  const startCarbonGame = () => {
    setActiveGame('carbon');
    setScore(0);
    setTimeLeft(20);
    setIsPlaying(true);
    setShowGameOver(false);
    setCarbonClouds([]);
    // أول هجمة كربون فوراً
    spawnCloud();
    spawnCloud();
  };

  const catchCloud = (id: number) => {
    setCarbonClouds(prev => prev.filter(c => c.id !== id));
    setScore(s => s + 15);
  };

  const handleSort = (binType: string) => {
    if (!currentItem || feedback || !isPlaying) return;
    if (currentItem.type === binType) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
      setTimeLeft(t => Math.max(0, t - 2)); // خصم وقت لو غلطت
    }
    setTimeout(() => {
      setFeedback(null);
      setCurrentItem(SORTING_ITEMS[Math.floor(Math.random() * SORTING_ITEMS.length)]);
    }, 350);
  };

  const handleEndGame = () => {
    setIsPlaying(false);
    setShowGameOver(true);
    const gameKey = activeGame as keyof typeof highScore;
    if (score > highScore[gameKey]) {
      const newHighs = { ...highScore, [gameKey]: score };
      setHighScore(newHighs);
      localStorage.setItem('eco_arcade_scores_v2', JSON.stringify(newHighs));
    }
    if (score > 0) {
      onScoreUpdate(Math.floor(score / 5));
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#ffffff'] });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-10 relative overflow-hidden font-sans select-none">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 bg-slate-900/80 p-2 pr-6 rounded-2xl border border-slate-800">
             <span className="font-black text-xl tracking-tighter">إيكو <span className="text-emerald-500">آركيد</span></span>
             <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
               <Gamepad2 size={24} className="text-slate-900" />
             </div>
          </motion.div>
          {activeGame !== 'menu' && (
            <button onClick={() => { setActiveGame('menu'); setIsPlaying(false); setShowGameOver(false); }} className="bg-slate-900 p-3 rounded-xl border border-slate-800 hover:bg-red-500/20 hover:border-red-500/50 transition-all">
              <ArrowLeft />
            </button>
          )}
        </nav>

        <AnimatePresence mode="wait">
          {/* --- القائمة الرئيسية --- */}
          {activeGame === 'menu' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sorting Game Card */}
              <motion.div whileHover={{ y: -10 }} className="bg-slate-900/50 border-2 border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all" />
                <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
                  <Recycle className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-3xl font-black mb-3 text-right">فرز النفايات</h3>
                <p className="text-slate-400 text-right text-sm leading-relaxed mb-8">حط كل حاجة في مكانها الصح بسرعة قبل ما الكوكب يغرق في الزبالة! الـ "غلطة" بتخصم وقت.</p>
                <div className="flex justify-between items-center mb-6 bg-black/30 p-4 rounded-2xl">
                   <div className="text-right">
                     <p className="text-[10px] text-slate-500 font-bold uppercase">رقمك القياسي</p>
                     <p className="text-2xl font-black text-emerald-400">{highScore.sorting}</p>
                   </div>
                   <Trophy className="text-amber-500" />
                </div>
                <button onClick={startSortingGame} className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <Play fill="currentColor" /> العب دلوقتي
                </button>
              </motion.div>

              {/* Carbon Catcher Card */}
              <motion.div whileHover={{ y: -10 }} className="bg-slate-900/50 border-2 border-slate-800 p-8 rounded-[3.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all" />
                <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                  <Skull className="text-blue-400" size={32} />
                </div>
                <h3 className="text-3xl font-black mb-3 text-right">صياد الكربون</h3>
                <p className="text-slate-400 text-right text-sm leading-relaxed mb-8">الدخان ملى الجو! استعمل مهاراتك وفرقع سحابات الكربون السوداء قبل ما تخنق المدينة.</p>
                <div className="flex justify-between items-center mb-6 bg-black/30 p-4 rounded-2xl">
                   <div className="text-right">
                     <p className="text-[10px] text-slate-500 font-bold uppercase">رقمك القياسي</p>
                     <p className="text-2xl font-black text-blue-400">{highScore.carbon}</p>
                   </div>
                   <Target className="text-blue-400" />
                </div>
                <button onClick={startCarbonGame} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <Zap fill="currentColor" /> ابدأ الصيد
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* --- Game View: Sorting --- */}
          {activeGame === 'sorting' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
               {/* Stats Bar */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-900 p-4 rounded-[2rem] border border-slate-800 flex items-center justify-between px-8">
                    <Timer className={timeLeft < 10 ? "text-red-500 animate-pulse" : "text-emerald-500"} />
                    <span className="text-3xl font-black tabular-nums">{timeLeft}s</span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-[2rem] border border-slate-800 flex items-center justify-between px-8">
                    <span className="text-3xl font-black text-emerald-400 tabular-nums">{score}</span>
                    <Star className="text-emerald-500" fill="currentColor" />
                  </div>
               </div>

               <div className="bg-slate-900/80 backdrop-blur-2xl p-10 rounded-[4rem] border-2 border-slate-800 h-[450px] flex flex-col items-center justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isPlaying && currentItem && !feedback && (
                      <motion.div key={currentItem.id} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="text-center">
                         <div className="text-[150px] leading-none mb-6 filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.3)]">{currentItem.icon}</div>
                         <h4 className="text-3xl font-black">{currentItem.name}</h4>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {feedback && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} className={`absolute inset-0 flex items-center justify-center z-20 ${feedback === 'correct' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                       <div className={`p-10 rounded-full ${feedback === 'correct' ? 'bg-emerald-500' : 'bg-red-500'} shadow-2xl`}>
                          {feedback === 'correct' ? <Check size={80} strokeWidth={4} /> : <X size={80} strokeWidth={4} />}
                       </div>
                    </motion.div>
                  )}

                  {!isPlaying && showGameOver && <GameOverScreen score={score} onRetry={startSortingGame} onMenu={() => setActiveGame('menu')} />}
               </div>

               <div className="grid grid-cols-3 gap-6 mt-8">
                  {[
                    { type: 'recycle', label: 'تدوير', icon: <Recycle />, color: 'from-blue-600 to-blue-800' },
                    { type: 'compost', label: 'سماد', icon: <Leaf />, color: 'from-emerald-600 to-emerald-800' },
                    { type: 'trash', label: 'نفايات', icon: <Trash2 />, color: 'from-slate-600 to-slate-800' },
                  ].map(btn => (
                    <button key={btn.type} onClick={() => handleSort(btn.type)} className={`bg-gradient-to-br ${btn.color} p-8 rounded-[2.5rem] shadow-2xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-2 border-t border-white/20`}>
                       {btn.icon}
                       <span className="font-black uppercase text-xs tracking-widest">{btn.label}</span>
                    </button>
                  ))}
               </div>
            </motion.div>
          )}

          {/* --- Game View: Carbon Catcher --- */}
          {activeGame === 'carbon' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
              <div className="flex justify-between items-center mb-6 px-4">
                 <div className="flex items-center gap-4">
                    <div className="bg-blue-600 px-6 py-2 rounded-full font-black text-xl shadow-lg shadow-blue-900/50 tracking-widest">{timeLeft}s</div>
                    <p className="text-slate-500 font-bold text-xs">فرقع الدخان!</p>
                 </div>
                 <div className="text-3xl font-black text-blue-400">{score}</div>
              </div>

              <div className="h-[550px] bg-slate-900 rounded-[4rem] border-2 border-slate-800 relative overflow-hidden cursor-crosshair">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent)]" />
                 
                 <AnimatePresence>
                   {isPlaying && carbonClouds.map(cloud => (
                     <motion.button
                       key={cloud.id}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 2, opacity: 0, transition: { duration: 0.2 } }}
                       onClick={() => catchCloud(cloud.id)}
                       style={{ left: `${cloud.x}%`, top: `${cloud.y}%` }}
                       className="absolute p-4 text-slate-200 hover:text-blue-400 transition-colors z-10"
                     >
                       <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                         <CloudOff size={cloud.size} className="drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                       </motion.div>
                     </motion.button>
                   ))}
                 </AnimatePresence>

                 {/* Smoke Decorations */}
                 <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                 {!isPlaying && showGameOver && <GameOverScreen score={score} onRetry={startCarbonGame} onMenu={() => setActiveGame('menu')} />}
              </div>
              
              <div className="mt-6 flex justify-center">
                 <div className="flex gap-2 items-center text-slate-500 bg-slate-900/50 px-6 py-3 rounded-full border border-slate-800">
                    <FastForward size={16} />
                    <span className="text-xs font-bold">السرعة بتزيد كل ما تجمع نقط أكتر.. ركز!</span>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// مكون شاشة النهاية
function GameOverScreen({ score, onRetry, onMenu }: { score: number, onRetry: () => void, onMenu: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-10 text-center">
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-24 h-24 bg-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/20 mb-6">
        <Trophy size={48} className="text-slate-900" />
      </motion.div>
      <h3 className="text-5xl font-black mb-2 uppercase italic tracking-tighter">وقتك خلص!</h3>
      <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-sm">جمعت مجموع نقط</p>
      <div className="text-7xl font-black text-emerald-500 mb-10 tabular-nums drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">{score}</div>
      
      <div className="flex flex-col w-full max-w-xs gap-4">
        <button onClick={onRetry} className="bg-white text-slate-950 py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3">
          <RotateCcw /> العب تاني
        </button>
        <button onClick={onMenu} className="bg-slate-800 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-700 transition-all">
          الرجوع للقائمة
        </button>
      </div>
    </motion.div>
  );
}