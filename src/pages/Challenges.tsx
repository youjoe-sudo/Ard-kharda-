import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Check, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export const initialChallenges = [
  { id: 1, title: "يوم بلا بلاستيك", points: 650, description: "استخدم بدائل قابلة لإعادة الاستخدام طوال اليوم.", category: "waste" },
  { id: 2, title: "المشي للعمل/الدراسة", points: 100, description: "استبدل السيارة بالمشي أو الدراجة لمسافة قصيرة.", category: "transport" },
  { id: 3, title: "فصل النفايات", points: 330, description: "افصل الورق والبلاستيك عن باقي النفايات اليوم.", category: "recycling" },
  { id: 4, title: "وجبة نباتية", points: 4110, description: "تناول وجبة غداء خالية من اللحوم تماماً.", category: "food" },
  { id: 5, title: "إطفاء الأنوار", points: 20, description: "أطفئ الأنوار غير الضرورية لمدة 3 ساعات.", category: "energy" },
];

interface ChallengesProps {
  data: {
    completed: number[];
    score: number;
  };
  setData: React.Dispatch<React.SetStateAction<{
    completed: number[];
    score: number;
  }>>;
  onCompleteChallenge: () => void;
}

export function Challenges({ data, setData, onCompleteChallenge }: ChallengesProps) {
  const { completed, score } = data;

  const toggleChallenge = (id: number, points: number) => {
    if (completed.includes(id)) {
      setData(prev => ({
        completed: prev.completed.filter(c => c !== id),
        score: prev.score - points
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
    <div className="p-6 pb-24 md:pb-6 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">التحديات الأسبوعية</h2>
          <p className="text-stone-500">أكمل التحديات واجمع النقاط لتصبح بطلاً للبيئة.</p>
        </div>
        <div className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm self-start">
          <Trophy className="w-6 h-6 text-emerald-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600/70">نقاطك الحالية</p>
            <p className="text-2xl font-bold">{score}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {initialChallenges.map((challenge) => {
          const isCompleted = completed.includes(challenge.id);
          return (
            <motion.div
              key={challenge.id}
              layout
              className={cn(
                "group relative overflow-hidden rounded-xl border p-5 transition-all duration-300",
                isCompleted 
                  ? "bg-emerald-50 border-emerald-200" 
                  : "bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-500">
                      {challenge.points} نقطة
                    </span>
                    {isCompleted && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 flex items-center gap-1">
                        <Check className="w-3 h-3" /> مكتمل
                      </span>
                    )}
                  </div>
                  <h3 className={cn("text-lg font-bold mb-1", isCompleted ? "text-emerald-900" : "text-stone-900")}>
                    {challenge.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {challenge.description}
                  </p>
                </div>

                <button
                  onClick={() => toggleChallenge(challenge.id, challenge.points)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-emerald-200 shadow-lg rotate-0"
                      : "bg-stone-100 text-stone-400 hover:bg-emerald-100 hover:text-emerald-600 -rotate-12 hover:rotate-0"
                  )}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
