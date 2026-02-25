import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Recycle, Leaf, Play, RotateCcw, Trophy, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesProps {
  onScoreUpdate: (points: number) => void;
}

const ITEMS = [
  { id: 1, name: 'زجاجة بلاستيك', type: 'recycle', icon: '🥤' },
  { id: 2, name: 'قشر موز', type: 'compost', icon: '🍌' },
  { id: 3, name: 'علبة كانز', type: 'recycle', icon: '🥫' },
  { id: 4, name: 'كيس شيبسي', type: 'trash', icon: '🥡' },
  { id: 5, name: 'ورق جرائد', type: 'recycle', icon: '📰' },
  { id: 6, name: 'تفاحة مأكولة', type: 'compost', icon: '🍎' },
  { id: 7, name: 'بطارية قديمة', type: 'trash', icon: '🔋' },
  { id: 8, name: 'كرتونة بيض', type: 'recycle', icon: '📦' },
  { id: 9, name: 'بقايا خبز', type: 'compost', icon: '🥖' },
  { id: 10, name: 'مناديل مستعملة', type: 'trash', icon: '🤧' },
];

export function Games({ onScoreUpdate }: GamesProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentItem, setCurrentItem] = useState<typeof ITEMS[0] | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('eco_game_highscore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setFeedback(null);
    nextItem();
  };

  const nextItem = () => {
    const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    setCurrentItem(randomItem);
  };

  const handleSort = (binType: 'recycle' | 'compost' | 'trash') => {
    if (!currentItem) return;

    if (currentItem.type === binType) {
      // Correct
      setScore((prev) => prev + 10);
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        nextItem();
      }, 500);
    } else {
      // Wrong
      setFeedback('wrong');
      // Penalty? Maybe just visual feedback
      setTimeout(() => {
        setFeedback(null);
        nextItem();
      }, 500);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('eco_game_highscore', score.toString());
    }
    
    // Add points to global score
    if (score > 0) {
      onScoreUpdate(score);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669']
      });
    }
  };

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">الألعاب البيئية</h2>
        <p className="text-stone-500">العب، تعلم، واكسب نقاط إضافية!</p>
      </header>

      <div className="flex-1 flex items-center justify-center">
        {!isPlaying ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-md w-full border border-stone-100"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Recycle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">فرز النفايات السريع</h3>
            <p className="text-stone-500 mb-6">
              صنف النفايات في الحاويات الصحيحة بأسرع ما يمكن خلال 30 ثانية.
            </p>
            
            <div className="flex justify-center gap-8 mb-8 text-sm font-bold text-stone-600">
              <div className="flex flex-col items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mb-1" />
                <span>أعلى نتيجة: {highScore}</span>
              </div>
              <div className="flex flex-col items-center">
                <Play className="w-5 h-5 text-emerald-500 mb-1" />
                <span>العب لتربح</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
              ابدأ اللعب
            </button>
          </motion.div>
        ) : (
          <div className="w-full max-w-md">
            {/* Game Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
              <div className="text-center">
                <p className="text-xs text-stone-400 font-bold uppercase">الوقت</p>
                <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-stone-700'}`}>
                  {timeLeft}s
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-stone-400 font-bold uppercase">النقاط</p>
                <p className="text-2xl font-bold text-emerald-600">{score}</p>
              </div>
            </div>

            {/* Game Area */}
            <div className="relative h-64 mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {currentItem && (
                  <motion.div
                    key={currentItem.id}
                    initial={{ y: -50, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-9xl mb-4 filter drop-shadow-xl">{currentItem.icon}</div>
                    <p className="text-xl font-bold text-stone-700">{currentItem.name}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feedback Overlay */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 flex items-center justify-center rounded-3xl ${
                      feedback === 'correct' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}
                  >
                    {feedback === 'correct' ? (
                      <Check className="w-24 h-24 text-emerald-600 drop-shadow-lg" />
                    ) : (
                      <X className="w-24 h-24 text-red-600 drop-shadow-lg" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleSort('recycle')}
                className="flex flex-col items-center justify-center p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:bg-blue-100 active:scale-95 transition-all"
              >
                <Recycle className="w-8 h-8 text-blue-600 mb-2" />
                <span className="font-bold text-blue-800">إعادة تدوير</span>
              </button>
              
              <button
                onClick={() => handleSort('compost')}
                className="flex flex-col items-center justify-center p-4 bg-green-50 border-2 border-green-200 rounded-2xl hover:bg-green-100 active:scale-95 transition-all"
              >
                <Leaf className="w-8 h-8 text-green-600 mb-2" />
                <span className="font-bold text-green-800">سماد</span>
              </button>
              
              <button
                onClick={() => handleSort('trash')}
                className="flex flex-col items-center justify-center p-4 bg-stone-50 border-2 border-stone-200 rounded-2xl hover:bg-stone-100 active:scale-95 transition-all"
              >
                <Trash2 className="w-8 h-8 text-stone-600 mb-2" />
                <span className="font-bold text-stone-800">نفايات</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
