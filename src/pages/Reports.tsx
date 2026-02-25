import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Calendar, Download, AlertCircle, FileJson, Printer } from 'lucide-react';
import { initialChallenges } from './Challenges';
import { AIAdvisor } from '../components/AIAdvisor';

interface ReportsProps {
  calculatorData: {
    transport: number;
    electricity: number;
    water: number;
    meat: number;
    result: number | null;
  };
  challengesData: {
    completed: number[];
    score: number;
  };
  onNavigateToCalculator: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#06b6d4', '#ef4444'];

export function Reports({ calculatorData, challengesData, onNavigateToCalculator }: ReportsProps) {
  const { result, transport, electricity, water, meat } = calculatorData;
  const { score, completed } = challengesData;

  const handleDownload = () => {
    window.print();
  };

  const handleDownloadData = () => {
    const data = {
      calculator: calculatorData,
      challenges: challengesData,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ard-akhdar-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Prepare data for the chart based on user input
  const footprintData = [
    { name: 'المواصلات', value: Math.round(transport * 52 * 0.2) },
    { name: 'الكهرباء', value: Math.round(electricity * 12 * 0.5) },
    { name: 'المياه', value: Math.round(water * 365 * 0.001) },
    { name: 'الغذاء', value: Math.round(meat * 52 * 20) },
  ].filter(item => item.value > 0);

  const completedChallengesList = initialChallenges.filter(c => completed.includes(c.id));

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto space-y-8 print:p-0 print:max-w-none">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div className="text-center md:text-right">
          <h2 className="text-3xl font-bold text-stone-900 mb-2">تقارير الأداء</h2>
          <p className="text-stone-500">تابع تطورك وتأثيرك الإيجابي بناءً على مدخلاتك.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadData}
            className="bg-white text-stone-900 border border-stone-200 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-stone-50 transition-colors shadow-sm"
          >
            <FileJson className="w-5 h-5" />
            تنزيل البيانات
          </button>
          <button 
            onClick={handleDownload}
            className="bg-stone-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-md"
          >
            <Printer className="w-5 h-5" />
            طباعة / حفظ PDF
          </button>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block text-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">أرض أخضر</h1>
        <p className="text-stone-600">تقرير الأداء البيئي الشخصي</p>
        <p className="text-sm text-stone-400 mt-2">{new Date().toLocaleDateString('ar-EG')}</p>
      </div>

      <div className="mb-8 print:hidden">
        <AIAdvisor calculatorData={calculatorData} challengesData={challengesData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center print:border-stone-300">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 print:bg-emerald-50">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">إجمالي النقاط</h3>
          <p className="text-3xl font-bold text-stone-900">{score}</p>
          <span className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> نقاط مكتسبة
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center print:border-stone-300">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 print:bg-blue-50">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">التحديات المكتملة</h3>
          <p className="text-3xl font-bold text-stone-900">{completed.length}</p>
          <span className="text-stone-400 text-xs font-medium mt-2">تحدي</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center print:border-stone-300">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600 print:bg-yellow-50">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-stone-500 text-sm font-medium mb-1">البصمة الكربونية</h3>
          <p className="text-3xl font-bold text-stone-900">{result !== null ? result : '--'}</p>
          <span className="text-stone-400 text-xs font-medium mt-2">كجم CO2 / سنة</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 min-h-[320px] print:border-stone-300">
          <h3 className="text-lg font-bold text-stone-900 mb-6">تحليل البصمة الكربونية</h3>
          {result !== null && footprintData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={footprintData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {footprintData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 pb-10">
              <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
              <p className="mb-2">لم يتم حساب البصمة الكربونية بعد</p>
              <button 
                onClick={onNavigateToCalculator}
                className="text-emerald-600 text-sm font-medium hover:underline"
              >
                اذهب إلى الحاسبة وأدخل بياناتك
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 min-h-[320px] print:border-stone-300">
          <h3 className="text-lg font-bold text-stone-900 mb-4">سجل الإنجازات</h3>
          {completedChallengesList.length > 0 ? (
            <div className="space-y-3">
              {completedChallengesList.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-100 print:border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-bold text-stone-900">{challenge.title}</span>
                        <span className="mx-2 text-stone-300">|</span>
                        <span className="text-xs text-stone-500">{challenge.description}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-sm">+{challenge.points}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 pb-10">
              <Trophy className="w-10 h-10 mb-2 opacity-50" />
              <p>لم تكمل أي تحديات بعد</p>
              <p className="text-xs">ابدأ التحديات واجمع النقاط!</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="hidden print:block text-center text-xs text-stone-400 mt-8 pt-8 border-t">
        تم إنشاء هذا التقرير بواسطة منصة أرض أخضر - معاً لمستقبل مستدام.
      </div>
    </div>
  );
}
