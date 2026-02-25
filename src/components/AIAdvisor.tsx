import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Loader2, RefreshCw } from 'lucide-react';
import { getEcoAdvice } from '../lib/gemini';
import { motion, AnimatePresence } from 'motion/react';

interface AIAdvisorProps {
  calculatorData: any;
  challengesData: any;
}

export function AIAdvisor({ calculatorData, challengesData }: AIAdvisorProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    setIsOpen(true);
    const result = await getEcoAdvice(
      calculatorData,
      challengesData.completed,
      challengesData.score
    );
    setAdvice(result);
    setLoading(false);
  };

  useEffect(() => {
    // Automatically fetch advice on mount if data is available
    if (!advice && (calculatorData.result !== null || challengesData.score > 0)) {
      handleGetAdvice();
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,white,transparent)] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
          <Bot className="w-8 h-8 text-emerald-300" />
        </div>
        
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
            المستشار البيئي الذكي
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </h3>
          <p className="text-emerald-100 text-sm mb-4 md:mb-0">
            احصل على خطة مخصصة لتحسين بصمتك الكربونية بناءً على نشاطك.
          </p>
        </div>

        <button
          onClick={handleGetAdvice}
          disabled={loading}
          className="bg-white text-emerald-900 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-md disabled:opacity-70 flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              جاري التحليل...
            </>
          ) : advice ? (
            <>
              <RefreshCw className="w-5 h-5" />
              تحديث التحليل
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              حلل أدائي
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && advice && !loading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20"
          >
            <p className="text-lg leading-relaxed font-medium">
              "{advice}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
