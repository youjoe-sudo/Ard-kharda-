import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Thermometer, Droplets, FlaskConical, Sparkles, AlertCircle, CheckCircle2, RotateCcw, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Ingredients {
  juice: number;
  glycerin: number;
  vinegar: number;
  starch: number;
  water: number;
}

const IDEAL_RANGES = {
  juice: { min: 180, max: 220 },
  glycerin: { min: 0.8, max: 1.5 },
  vinegar: { min: 0.8, max: 1.5 },
  starch: { min: 0.8, max: 1.5 },
  water: { min: 100, max: 150 },
};

export function CactusExperiment() {
  const [ingredients, setIngredients] = useState<Ingredients>({
    juice: 0,
    glycerin: 0,
    vinegar: 0,
    starch: 0,
    water: 0,
  });

  const [phase, setPhase] = useState<'idle' | 'mixing' | 'heating' | 'result'>('idle');
  const [result, setResult] = useState<{
    status: 'perfect' | 'brittle' | 'sticky' | 'liquid' | 'thick' | null;
    message: string;
    description: string;
  } | null>(null);

  const handleReset = () => {
    setIngredients({ juice: 0, glycerin: 0, vinegar: 0, starch: 0, water: 0 });
    setResult(null);
    setPhase('idle');
  };

  const runExperiment = () => {
    setPhase('mixing');
    setTimeout(() => {
      setPhase('heating');
      setTimeout(() => {
        evaluateResult();
        setPhase('result');
      }, 4000);
    }, 2000);
  };

  const evaluateResult = () => {
    const { juice, glycerin, vinegar, starch, water } = ingredients;
    
    if (juice < 150 || starch < 0.5) {
      setResult({
        status: 'liquid',
        message: "فشل في التماسك!",
        description: "الخليط سائل جداً. النشا أو عصير الصبار غير كافٍ لبناء الروابط البوليمرية."
      });
    } else if (glycerin < 0.8) {
      setResult({
        status: 'brittle',
        message: "بلاستيك زجاجي!",
        description: "المنتج جف ولكنه يتكسر بسهولة جداً. تحتاج لزيادة الجلسرين ليعطي مرونة."
      });
    } else if (glycerin > 1.5) {
      setResult({
        status: 'sticky',
        message: "دبق جداً!",
        description: "البلاستيك لا يجف أبداً ويبقى لزجاً. الجلسرين الزائد منع التصلب."
      });
    } else if (starch > 1.5) {
      setResult({
        status: 'thick',
        message: "قوام طيني!",
        description: "الخليط سميك جداً وغير شفاف. النشا الزائد حوله لمادة تشبه الصلصال بدلاً من البلاستيك."
      });
    } else if (
      juice >= IDEAL_RANGES.juice.min && juice <= IDEAL_RANGES.juice.max &&
      glycerin >= IDEAL_RANGES.glycerin.min && glycerin <= IDEAL_RANGES.glycerin.max &&
      vinegar >= IDEAL_RANGES.vinegar.min && vinegar <= IDEAL_RANGES.vinegar.max &&
      starch >= IDEAL_RANGES.starch.min && starch <= IDEAL_RANGES.starch.max &&
      water >= IDEAL_RANGES.water.min && water <= IDEAL_RANGES.water.max
    ) {
      setResult({
        status: 'perfect',
        message: "بلاستيك حيوي مثالي!",
        description: "مبروك! لقد وصلت للخلطة السرية. البلاستيك شفاف، مرن، وقوي تماماً مثل منتج ساندرا باسكو."
      });
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669']
      });
    } else {
      setResult({
        status: 'liquid',
        message: "نتيجة غير مستقرة",
        description: "النسب غير متوازنة. حاول الاقتراب أكثر من المقادير العلمية الموصى بها."
      });
    }
  };

  const isIdeal = (key: keyof typeof IDEAL_RANGES, val: number) => {
    return val >= IDEAL_RANGES[key].min && val <= IDEAL_RANGES[key].max;
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-stone-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Lab Controls */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-500" />
              تجربة المختبر التفاعلية
            </h3>
            <p className="text-stone-500">قم بضبط المقادير واختبر جودة البلاستيك الناتج</p>
          </div>

          <div className="space-y-6">
            <IngredientSlider 
              label="عصير الصبار (مل)" 
              value={ingredients.juice} 
              max={400} 
              unit="ml"
              isIdeal={isIdeal('juice', ingredients.juice)}
              onChange={(v) => setIngredients(prev => ({ ...prev, juice: v }))}
              disabled={phase !== 'idle'}
            />
            <IngredientSlider 
              label="الجلسرين (ملعقة)" 
              value={ingredients.glycerin} 
              max={5} 
              step={0.1}
              unit="tbsp"
              isIdeal={isIdeal('glycerin', ingredients.glycerin)}
              onChange={(v) => setIngredients(prev => ({ ...prev, glycerin: v }))}
              disabled={phase !== 'idle'}
            />
            <IngredientSlider 
              label="الخل الأبيض (ملعقة)" 
              value={ingredients.vinegar} 
              max={5} 
              step={0.1}
              unit="tbsp"
              isIdeal={isIdeal('vinegar', ingredients.vinegar)}
              onChange={(v) => setIngredients(prev => ({ ...prev, vinegar: v }))}
              disabled={phase !== 'idle'}
            />
            <IngredientSlider 
              label="النشا (ملعقة)" 
              value={ingredients.starch} 
              max={5} 
              step={0.1}
              unit="tbsp"
              isIdeal={isIdeal('starch', ingredients.starch)}
              onChange={(v) => setIngredients(prev => ({ ...prev, starch: v }))}
              disabled={phase !== 'idle'}
            />
            <IngredientSlider 
              label="الماء (مل)" 
              value={ingredients.water} 
              max={300} 
              unit="ml"
              isIdeal={isIdeal('water', ingredients.water)}
              onChange={(v) => setIngredients(prev => ({ ...prev, water: v }))}
              disabled={phase !== 'idle'}
            />
          </div>

          <div className="flex gap-4 pt-4">
            {phase === 'idle' ? (
              <button
                onClick={runExperiment}
                disabled={Object.values(ingredients).every(v => v === 0)}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-100"
              >
                <Play className="w-5 h-5" />
                بدء التفاعل الكيميائي
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-200 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                إعادة التجربة
              </button>
            )}
          </div>
        </div>

        {/* Visual Representation */}
        <div className="lg:w-80 flex flex-col items-center justify-center bg-stone-50 rounded-[2rem] p-8 border border-stone-100 relative">
          
          {/* The Beaker */}
          <div className="relative w-48 h-64 border-4 border-stone-300 border-t-0 rounded-b-3xl overflow-hidden bg-white/50 backdrop-blur-sm">
            {/* Liquid */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0"
              initial={{ height: 0, backgroundColor: '#d1fae5' }}
              animate={{ 
                height: `${Math.min(100, ((ingredients.juice + ingredients.glycerin + ingredients.vinegar + ingredients.starch + ingredients.water) / 600) * 100)}%`,
                backgroundColor: phase === 'heating' ? '#059669' : phase === 'mixing' ? '#6ee7b7' : '#d1fae5',
                opacity: phase === 'heating' ? 0.9 : 0.6
              }}
              transition={{ 
                height: { type: 'spring', damping: 20, stiffness: 100 },
                backgroundColor: { duration: 2 }
              }}
            >
              {/* Wave Effect */}
              <motion.div 
                className="absolute -top-4 left-0 right-0 h-8 bg-inherit opacity-50"
                animate={{
                  x: [-20, 20, -20],
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 50% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />

              {phase === 'mixing' && (
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                />
              )}
              {phase === 'heating' && (
                <div className="absolute inset-0 flex justify-around items-end pb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.div 
                      key={i}
                      className="w-1.5 h-1.5 bg-white/60 rounded-full"
                      animate={{ 
                        y: [0, -150], 
                        opacity: [0, 1, 0],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Measurement Lines */}
            <div className="absolute inset-y-0 right-2 flex flex-col justify-between py-4 text-[10px] text-stone-400 font-mono">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-8 w-full">
            <AnimatePresence mode="wait">
              {phase === 'mixing' && (
                <motion.div 
                  key="mixing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-blue-50 text-blue-600 p-4 rounded-2xl flex items-center gap-3 border border-blue-100"
                >
                  <Droplets className="w-5 h-5 animate-bounce" />
                  <span className="font-bold">جاري الخلط...</span>
                </motion.div>
              )}
              {phase === 'heating' && (
                <motion.div 
                  key="heating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-orange-50 text-orange-600 p-4 rounded-2xl flex items-center gap-3 border border-orange-100"
                >
                  <Thermometer className="w-5 h-5 animate-pulse" />
                  <span className="font-bold">جاري التسخين (تفاعل)...</span>
                </motion.div>
              )}
              {phase === 'result' && result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-2xl flex flex-col gap-2 border ${
                    result.status === 'perfect' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-red-50 text-red-800 border-red-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.status === 'perfect' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    <span className="font-bold">{result.message}</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">{result.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

function IngredientSlider({ label, value, max, unit, onChange, disabled, step = 1, isIdeal }: { 
  label: string, 
  value: number, 
  max: number, 
  unit: string, 
  onChange: (v: number) => void,
  disabled?: boolean,
  step?: number,
  isIdeal?: boolean
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-stone-700">{label}</label>
        <motion.span 
          animate={{ 
            scale: isIdeal ? 1.1 : 1,
            boxShadow: isIdeal ? "0 0 15px rgba(16, 185, 129, 0.4)" : "none"
          }}
          className={`text-sm font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${
            isIdeal ? 'text-emerald-700 bg-emerald-100' : 'text-emerald-600 bg-emerald-50'
          }`}
        >
          {value} {unit}
        </motion.span>
      </div>
      <div className="relative group">
        {isIdeal && (
          <motion.div 
            layoutId={`glow-${label}`}
            className="absolute inset-0 bg-emerald-400/20 blur-md rounded-lg"
          />
        )}
        <input 
          type="range" 
          min="0" 
          max={max} 
          step={step}
          value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className={`relative w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-30 transition-all ${
            isIdeal ? 'ring-2 ring-emerald-400/50' : ''
          } bg-stone-100`}
        />
      </div>
    </div>
  );
}
