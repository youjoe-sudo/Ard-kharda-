import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Zap, Droplets, Utensils, CheckCircle, 
  AlertCircle, Leaf, ArrowRight, Gauge, 
  Info, InfoIcon, TrendingDown, HelpCircle,
  Trees, Cloud
} from 'lucide-react';

interface CalculatorProps {
  data: {
    transport: number;
    electricity: number;
    water: number;
    meat: number;
    result: number | null;
  };
  setData: React.Dispatch<React.SetStateAction<{
    transport: number;
    electricity: number;
    water: number;
    meat: number;
    result: number | null;
  }>>;
}

export function Calculator({ data, setData }: CalculatorProps) {
  const { transport, electricity, water, meat, result } = data;
  const [isCalculating, setIsCalculating] = useState(false);

  const updateField = (field: keyof typeof data, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFootprint = () => {
    setIsCalculating(true);
    
    // تأخير وهمي عشان نحسس المستخدم إن فيه "ذكاء اصطناعي" بيحسب
    setTimeout(() => {
      const transportScore = transport * 52 * 0.21; // متوسط انبعاثات العربيات
      const electricityScore = electricity * 12 * 0.45; // متوسط انبعاثات الكهرباء في المنطقة
      const waterScore = water * 365 * 0.0008; // معالجة المية
      const meatScore = meat * 52 * 15.5; // متوسط إنتاج اللحوم

      const total = transportScore + electricityScore + waterScore + meatScore;
      updateField('result', Math.round(total));
      setIsCalculating(false);
    }, 800);
  };

  const getRating = (score: number) => {
    if (score < 2500) return { 
      label: 'عاش يا بطل! بصمتك خفيفة ع الكوكب', 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200',
      desc: 'إنت كدة بتساعد الأرض تتنفس، كمل على كدة!'
    };
    if (score < 5500) return { 
      label: 'مش وحش، بس محتاجين نشد حيلنا شوية', 
      color: 'text-amber-600', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200',
      desc: 'استهلاكك متوسط، بشوية تعديلات بسيطة هتبقى برنس بيئة.'
    };
    return { 
      label: 'يا نهار أبيض! بصمتك تقيلة أوي', 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      desc: 'الرقم ده معناه إنك محتاج تغير عاداتك بسرعة عشان الكوكب بيستغيث.'
    };
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] p-4 md:p-10 relative overflow-hidden">
      
      {/* عناصر ديكورية في الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 left-10 text-emerald-100">
          <Cloud size={100} />
        </motion.div>
        <div className="absolute bottom-[-20px] right-[-20px] text-emerald-50">
          <Trees size={300} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-lg shadow-emerald-200"
          >
            <Gauge size={14} /> حاسبة الأثر البيئي
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">احسب "بصمتك" <span className="text-emerald-600">الكربونية</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            عايز تعرف إنت مأثر على الكوكب قد إيه؟ جاوب على الأسئلة دي بالعامية وبكل صراحة وهنقولك الخلاصة.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-3 space-y-4">
            {[
              { id: 'transport', label: 'بتركب مواصلات أو عربية قد إيه؟', sub: '(كم في الأسبوع)', icon: <Car />, color: 'text-blue-500', placeholder: 'مثلاً: 120' },
              { id: 'electricity', label: 'فاتورة الكهرباء بتعمل كام كيلوواط؟', sub: '(في الشهر)', icon: <Zap />, color: 'text-amber-500', placeholder: 'مثلاً: 250' },
              { id: 'water', label: 'بتستهلك مية قد إيه في اليوم؟', sub: '(لتر تقريباً)', icon: <Droplets />, color: 'text-cyan-500', placeholder: 'مثلاً: 100' },
              { id: 'meat', label: 'بتاكل لحمة وفراخ قد إيه؟', sub: '(كم كجم في الأسبوع)', icon: <Utensils />, color: 'text-red-500', placeholder: 'مثلاً: 3' },
            ].map((input) => (
              <motion.div 
                key={input.id}
                whileHover={{ x: 10 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
              >
                <label className="flex items-center gap-3 text-slate-800 font-bold mb-4 justify-end">
                   <div className="text-right">
                    <p className="text-sm">{input.label}</p>
                    <span className="text-[10px] text-slate-400 font-normal">{input.sub}</span>
                   </div>
                   <div className={`p-3 rounded-2xl bg-slate-50 group-hover:bg-white transition-colors ${input.color}`}>
                    {input.icon}
                   </div>
                </label>
                <input
                  type="number"
                  value={data[input.id as keyof typeof data] || ''}
                  onChange={(e) => updateField(input.id as keyof typeof data, Number(e.target.value))}
                  className="w-full bg-slate-50 p-4 rounded-2xl border-2 border-transparent focus:border-emerald-400 focus:bg-white outline-none transition-all text-right font-bold text-slate-700"
                  placeholder={input.placeholder}
                />
              </motion.div>
            ))}

            <button
              onClick={calculateFootprint}
              disabled={isCalculating}
              className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
            >
              {isCalculating ? (
                <> <LoaderIcon className="animate-spin" /> بنحسبها ونشوف.. </>
              ) : (
                <> <Leaf /> احسب الحسبة دي </>
              )}
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {result !== null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="sticky top-10"
                >
                  <div className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <TrendingDown size={150} />
                    </div>

                    <div className="relative z-10 text-center">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">النتيجة السنوية</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-6xl font-black text-slate-900">{result}</span>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400">كجم</p>
                          <p className="text-xs font-bold text-slate-400 text-emerald-600">CO2</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl border-2 mb-6 ${getRating(result).bg} ${getRating(result).border} ${getRating(result).color}`}>
                        <p className="font-black text-sm mb-1">{getRating(result).label}</p>
                        <p className="text-xs opacity-80 leading-relaxed">{getRating(result).desc}</p>
                      </div>

                      <div className="space-y-3 text-right">
                        <h4 className="font-black text-slate-800 text-sm flex items-center gap-2 justify-end">
                          تعمل إيه عشان تقلل الرقم ده؟ <HelpCircle size={14} className="text-emerald-500" />
                        </h4>
                        {[
                          "جرب تمشي للمشاوير القريبة بدل المواصلات.",
                          "يوم واحد في الأسبوع من غير لحمة بيفرق جداً.",
                          "افصل الشواحن وأي فيشة مش محتاجها وأنت نايم.",
                          "ازرع أي حاجة خضراء في بلكونتك، بتسحب كاربون!"
                        ].map((tip, i) => (
                          <div key={i} className="flex gap-2 items-start justify-end group">
                            <p className="text-xs text-slate-500 group-hover:text-emerald-600 transition-colors">{tip}</p>
                            <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => updateField('result', null)}
                        className="mt-8 text-slate-400 text-xs font-bold hover:text-red-500 transition-colors underline"
                      >
                        إعادة الحساب من الأول
                      </button>
                    </div>
                  </div>
                  
                  {/* Small Alert Card */}
                  <div className="mt-4 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
                    <InfoIcon className="text-amber-500 shrink-0" size={18} />
                    <p className="text-[10px] text-amber-800 leading-tight">
                      الأرقام دي تقريبية بناءً على دراسات عالمية، المهم إننا ناخد خطوة فعلية لتقليل الأثر ده.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center p-10 opacity-60">
                   <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Gauge size={40} className="text-slate-300" />
                   </div>
                   <h3 className="font-bold text-slate-800 mb-2">مستنيين بياناتك</h3>
                   <p className="text-xs text-slate-400">إملا الخانات اللي على اليمين ودوس على "احسب" عشان نشوف النتيجة مع بعض.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// مكون صغير للتحميل
function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V6M12 18V22M6 12H2M22 12H18M5.63604 5.63604L8.46447 8.46447M15.5355 15.5355L18.364 18.364M5.63604 18.364L8.46447 15.5355M15.5355 8.46447L18.364 5.63604" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}