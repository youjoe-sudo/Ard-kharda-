import React from 'react';
import { motion } from 'motion/react';
import { Car, Zap, Droplets, Utensils, CheckCircle } from 'lucide-react';

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

  const updateField = (field: keyof typeof data, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const calculateFootprint = () => {
    // Simplified calculation logic for demo purposes
    // Transport: 0.2 kg CO2 per km
    // Electricity: 0.5 kg CO2 per kWh
    // Water: 0.001 kg CO2 per L (treatment/pumping)
    // Meat: 20 kg CO2 per kg beef (approx)
    
    const transportScore = transport * 52 * 0.2; // Annual
    const electricityScore = electricity * 12 * 0.5; // Annual
    const waterScore = water * 365 * 0.001; // Annual
    const meatScore = meat * 52 * 20; // Annual (kg per week * 52 weeks * factor)

    const total = transportScore + electricityScore + waterScore + meatScore;
    updateField('result', Math.round(total));
  };

  const getRating = (score: number) => {
    if (score < 3000) return { label: 'ممتاز', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (score < 6000) return { label: 'متوسط', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'عالي التأثير', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">حاسبة البصمة الكربونية</h2>
        <p className="text-stone-500">أدخل بيانات استهلاكك لتعرف تأثيرك على البيئة سنوياً (كجم CO2).</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Car className="w-4 h-4 text-blue-500" />
              المواصلات (كم/أسبوع)
            </label>
            <input
              type="number"
              value={transport || ''}
              onChange={(e) => updateField('transport', Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="مثلاً: 100"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              الكهرباء (كيلوواط/شهر)
            </label>
            <input
              type="number"
              value={electricity || ''}
              onChange={(e) => updateField('electricity', Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="مثلاً: 300"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Droplets className="w-4 h-4 text-cyan-500" />
              المياه (لتر/يوم)
            </label>
            <input
              type="number"
              value={water || ''}
              onChange={(e) => updateField('water', Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="مثلاً: 150"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Utensils className="w-4 h-4 text-red-500" />
              اللحوم (كجم/أسبوع)
            </label>
            <input
              type="number"
              value={meat || ''}
              onChange={(e) => updateField('meat', Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="مثلاً: 2"
            />
          </div>
        </div>

        <button
          onClick={calculateFootprint}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
        >
          احسب النتيجة
        </button>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 bg-stone-50 rounded-xl border border-stone-200 text-center"
          >
            <p className="text-stone-500 text-sm mb-2">بصمتك الكربونية السنوية التقديرية</p>
            <div className="text-5xl font-bold text-stone-900 mb-4">
              {result} <span className="text-lg font-normal text-stone-500">كجم CO2</span>
            </div>
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getRating(result).bg} ${getRating(result).color}`}>
              <CheckCircle className="w-4 h-4" />
              {getRating(result).label}
            </div>

            <div className="mt-6 text-right space-y-2">
              <h4 className="font-semibold text-stone-900">نصائح لتحسين رقمك:</h4>
              <ul className="text-sm text-stone-600 list-disc list-inside space-y-1">
                <li>حاول استخدام المواصلات العامة أو المشي لمسافات قصيرة.</li>
                <li>قلل استهلاك اللحوم الحمراء ليوم واحد في الأسبوع.</li>
                <li>استخدم مصابيح LED الموفرة للطاقة.</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
