import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, Recycle, Wind, Droplets } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: "الاحتباس الحراري",
    icon: Thermometer,
    color: "text-red-500",
    bg: "bg-red-50",
    description: "ارتفاع درجة حرارة الأرض بسبب الغازات الدفيئة، مما يؤدي إلى تغيرات مناخية قاسية.",
    stats: "ارتفعت الحرارة 1.1°C منذ الثورة الصناعية"
  },
  {
    id: 2,
    title: "إعادة التدوير",
    icon: Recycle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    description: "عملية تحويل النفايات إلى مواد جديدة، مما يقلل من التلوث واستهلاك الموارد الطبيعية.",
    stats: "إعادة تدوير علبة ألومنيوم واحدة توفر طاقة لتشغيل تلفزيون لمدة 3 ساعات"
  },
  {
    id: 3,
    title: "الطاقة النظيفة",
    icon: Wind,
    color: "text-blue-500",
    bg: "bg-blue-50",
    description: "استخدام مصادر طاقة متجددة مثل الشمس والرياح لتقليل الاعتماد على الوقود الأحفوري.",
    stats: "الطاقة الشمسية أرخص مصدر للكهرباء في التاريخ حالياً"
  },
  {
    id: 4,
    title: "أثر البلاستيك",
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    description: "البلاستيك يستغرق مئات السنين ليتحلل، ويشكل خطراً كبيراً على الحياة البحرية.",
    stats: "8 مليون طن من البلاستيك تدخل المحيطات سنوياً"
  }
];

export function Awareness() {
  return (
    <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-4">وعي بيئي</h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          افهم التحديات التي تواجه كوكبنا وكيف يمكننا المساهمة في الحل.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${topic.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${topic.color}`} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{topic.title}</h3>
              <p className="text-stone-600 mb-4 leading-relaxed">{topic.description}</p>
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                <p className="text-xs font-semibold text-stone-500 uppercase mb-1">هل تعلم؟</p>
                <p className="text-sm text-stone-800 font-medium">{topic.stats}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
