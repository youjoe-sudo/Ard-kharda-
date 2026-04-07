import React, { useState, useEffect } from 'react';
import { 
  Document, Page, Text, View, StyleSheet, Font, 
  PDFDownloadLink, Image as PDFImage 
} from '@react-pdf/renderer';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import { 
  Trophy, TrendingUp, Calendar, FileJson, 
  Printer, Loader2, Key, HelpCircle, Leaf, 
  ChevronLeft, ExternalLink, ShieldCheck, 
  Info, AlertTriangle, CheckCircle2, Download,
  Trees, CloudSun, Target
} from 'lucide-react';
import { initialChallenges } from './Challenges';
import { AIAdvisor } from '../components/AIAdvisor';

// --- إعدادات الخطوط للتقرير الرسمي ---
Font.register({
  family: 'Almarai',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/almarai/v5/ts3L2px0BZ5qc9H6mVkCX_6p.ttf' },
    { src: 'https://fonts.gstatic.com/s/almarai/v5/ts3M2px0BZ5qc9H6mVkCX_6p.ttf', fontWeight: 'bold' }
  ]
});

// --- ستايلات الـ PDF الاحترافي ---
const pdfStyles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Almarai', direction: 'rtl', backgroundColor: '#FFFFFF' },
  headerContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', borderBottom: 3, borderBottomColor: '#10b981', paddingBottom: 20, marginBottom: 30 },
  brandTitle: { fontSize: 28, color: '#065f46', fontWeight: 'bold' },
  tagline: { fontSize: 12, color: '#6b7280', marginTop: 5 },
  sectionTitle: { fontSize: 18, color: '#111827', marginBottom: 15, textAlign: 'right', borderRight: 5, borderRightColor: '#10b981', paddingRight: 10 },
  statGrid: { flexDirection: 'row-reverse', gap: 15, marginBottom: 40 },
  statCard: { flex: 1, backgroundColor: '#f0fdf4', padding: 20, borderRadius: 12, alignItems: 'center', border: 1, borderColor: '#d1fae5' },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#065f46' },
  statLabel: { fontSize: 10, color: '#374151', marginTop: 5 },
  tableHeader: { flexDirection: 'row-reverse', backgroundColor: '#f9fafb', padding: 10, borderRadius: 8, marginBottom: 5 },
  tableRow: { flexDirection: 'row-reverse', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', alignItems: 'center' },
  cellLabel: { flex: 2, fontSize: 12, color: '#374151', textAlign: 'right' },
  cellValue: { flex: 1, fontSize: 12, fontWeight: 'bold', color: '#059669', textAlign: 'left' },
  footer: { position: 'absolute', bottom: 40, left: 50, right: 50, textAlign: 'center', fontSize: 10, color: '#9ca3af', borderTop: 1, borderTopColor: '#e5e7eb', paddingTop: 15 }
});

// --- مكون مستند الـ PDF ---
const SustainabilityReportPDF = ({ calcData, challData, totalScore }: any) => {
  const breakdown = [
    { name: 'انبعاثات المواصلات', val: Math.round(calcData.transport * 52 * 0.2) },
    { name: 'استهلاك الكهرباء', val: Math.round(calcData.electricity * 12 * 0.5) },
    { name: 'هدر المياه', val: Math.round(calcData.water * 365 * 0.001) },
    { name: 'البصمة الغذائية', val: Math.round(calcData.meat * 52 * 20) }
  ];

  return (
    <Document title="تقرير الاستدامة - أرض أخضر">
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.headerContainer}>
          <View>
            <Text style={pdfStyles.brandTitle}>أرض أخضر</Text>
            <Text style={pdfStyles.tagline}>منصة تقييم الأثر البيئي الشخصي</Text>
          </View>
          <Text style={{ fontSize: 10 }}>تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</Text>
        </View>

        <View style={pdfStyles.statGrid}>
          <View style={pdfStyles.statCard}>
            <Text style={pdfStyles.statValue}>{totalScore}</Text>
            <Text style={pdfStyles.statLabel}>إجمالي النقاط</Text>
          </View>
          <View style={pdfStyles.statCard}>
            <Text style={pdfStyles.statValue}>{calcData.result || 0}</Text>
            <Text style={pdfStyles.statLabel}>CO2 كجم/سنة</Text>
          </View>
          <View style={pdfStyles.statCard}>
            <Text style={pdfStyles.statValue}>{challData.completed.length}</Text>
            <Text style={pdfStyles.statLabel}>تحديات مكتملة</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionTitle}>تحليل الأثر الكربوني التفصيلي</Text>
        <View style={pdfStyles.tableHeader}>
          <Text style={[pdfStyles.cellLabel, { fontWeight: 'bold' }]}>المصدر البيئي</Text>
          <Text style={[pdfStyles.cellValue, { fontWeight: 'bold', textAlign: 'right' }]}>الكمية (كجم)</Text>
        </View>
        {breakdown.map((item, i) => (
          <View key={i} style={pdfStyles.tableRow}>
            <Text style={pdfStyles.cellLabel}>{item.name}</Text>
            <Text style={pdfStyles.cellValue}>{item.val}</Text>
          </View>
        ))}

        <View style={{ marginTop: 40 }}>
          <Text style={pdfStyles.sectionTitle}>أبرز الإنجازات</Text>
          {initialChallenges.filter(c => challData.completed.includes(c.id)).slice(0, 5).map((c, i) => (
            <View key={i} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.cellLabel}>• {c.title}</Text>
              <Text style={[pdfStyles.cellValue, { color: '#10b981' }]}>+{c.points} Pt</Text>
            </View>
          ))}
        </View>

        <Text style={pdfStyles.footer}>صدر هذا التقرير آلياً - يساعدك على فهم أثرك البيئي واتخاذ خطوات إيجابية نحو الكوكب.</Text>
      </Page>
    </Document>
  );
};

// --- المكون الرئيسي للمتصفح ---
export function Reports({ calculatorData, challengesData, onNavigateToCalculator }: any) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  const CHART_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
  const footprintData = [
    { name: 'المواصلات', value: Math.round(calculatorData.transport * 52 * 0.2) },
    { name: 'الكهرباء', value: Math.round(calculatorData.electricity * 12 * 0.5) },
    { name: 'المياه', value: Math.round(calculatorData.water * 365 * 0.001) },
    { name: 'الغذاء', value: Math.round(calculatorData.meat * 52 * 20) },
  ].filter(v => v.value > 0);

  return (
    <div className="min-h-screen bg-[#f0f9f6] text-slate-900 font-sans relative overflow-hidden pb-20">
      
      {/* Background Elements (The Forest Feel) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] text-emerald-100/40">
          <Trees size={600} strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-[-5%] left-[-10%] text-emerald-200/30 rotate-12">
          <Leaf size={400} strokeWidth={0.5} />
        </div>
        <div className="absolute top-1/4 left-10 text-emerald-300/20">
          <CloudSun size={150} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Header - Glassmorphism */}
        <header className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 mb-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-right flex-1">
            <div className="flex items-center gap-3 justify-end mb-2">
              <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Green Report v2.0</span>
              <h2 className="text-4xl font-black text-emerald-950 tracking-tight">إحصائيات الأثر البيئي</h2>
            </div>
            <p className="text-emerald-800/70 text-lg">بصمتك اليوم تحدد ملامح كوكبنا غداً. تابع تقدمك بدقة.</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-white text-emerald-700 border-2 border-emerald-100 px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm">
              <FileJson className="group-hover:rotate-12 transition-transform" />
              <span>تصدير JSON</span>
            </button>

            <PDFDownloadLink
              document={<SustainabilityReportPDF calcData={calculatorData} challData={challengesData} totalScore={challengesData.score} />}
              fileName="Ard-Akhdar-Official-Report.pdf"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-emerald-600/20 transition-all hover:shadow-emerald-600/40 active:scale-95"
            >
              {({ loading }) => loading ? (
                <><Loader2 className="animate-spin" /> جاري التحضير...</>
              ) : (
                <><Download className="animate-bounce" /> تحميل التقرير الرسمي (PDF)</>
              )}
            </PDFDownloadLink>
          </div>
        </header>

        {/* API Control Center */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-linear-to-br from-emerald-900 to-teal-950 p-8 rounded-4xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl"><Key className="text-emerald-400" /></div>
                <h3 className="text-xl font-bold">تفعيل المستشار الذكي (AI)</h3>
              </div>
              <p className="text-emerald-100/70 mb-6 text-sm leading-relaxed text-right">
                نحن لا نخزن مفاتيحك. يتم استخدام المفتاح مباشرة من متصفحك للتواصل مع Gemini AI وتقديم نصائح مخصصة بناءً على استهلاكك الفعلي.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your Gemini API Key here..."
                  className="flex-1 bg-black/20 border border-white/10 p-4 rounded-xl outline-none focus:border-emerald-400 transition-all font-mono text-sm placeholder:text-white/20"
                />
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  <HelpCircle size={18} /> كيف أحصل عليه؟
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-4xl border border-emerald-100 shadow-xl flex flex-col justify-center items-center text-center group">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform duration-500">
              <Target size={40} />
            </div>
            <h4 className="font-bold text-slate-800 text-lg mb-2">حالة الاتصال</h4>
            <div className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${apiKey ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {apiKey ? 'Active System' : 'Disconnected'}
            </div>
            <p className="text-slate-400 text-xs mt-4 leading-relaxed">
              {apiKey ? 'المستشار الذكي جاهز الآن لتحليل بياناتك' : 'يرجى إدخال المفتاح لتفعيل ميزات الذكاء الاصطناعي'}
            </p>
          </div>
        </section>

        {/* Stats & Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Main Visual Stat Card */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-emerald-50 relative group">
            <h3 className="text-2xl font-black text-slate-800 mb-8 text-right flex items-center gap-3 justify-end">
              تحليل البصمة الكربونية <TrendingUp className="text-emerald-500" />
            </h3>
            
            <div className="h-75 w-full">
              {footprintData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={footprintData}
                      cx="50%" cy="50%"
                      innerRadius={80} outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {footprintData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300">
                  <AlertTriangle size={60} strokeWidth={1} className="mb-4" />
                  <p className="font-medium">لا توجد بيانات كافية للرسم البياني</p>
                </div>
              )}
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-center pointer-events-none">
              <span className="block text-4xl font-black text-slate-800">{calculatorData.result || 0}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Kg CO2 / Year</span>
            </div>
          </div>

          {/* Achievement Summary */}
          <div className="space-y-6">
            <div className="bg-emerald-600 p-8 rounded-4xl text-white flex justify-between items-center shadow-lg shadow-emerald-200 group relative overflow-hidden">
              <div className="absolute -left-4 -bottom-4 text-white/10 group-hover:rotate-12 transition-transform duration-700">
                <Trophy size={150} />
              </div>
              <div className="relative z-10">
                <p className="text-emerald-100 font-bold mb-1">الرصيد الإجمالي</p>
                <p className="text-5xl font-black">{challengesData.score}<span className="text-sm ml-2 opacity-60">Pt</span></p>
              </div>
              <div className="text-right relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-2 mr-auto">
                  <Trophy size={28} />
                </div>
                <p className="text-xs font-medium text-emerald-100">أنت ضمن أفضل 10%<br/>من حماة الطبيعة</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-md">
                <Calendar className="text-blue-500 mb-3" />
                <p className="text-2xl font-black text-slate-800">{challengesData.completed.length}</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">تحدي مكتمل</p>
              </div>
              <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-md">
                <Target className="text-orange-500 mb-3" />
                <p className="text-2xl font-black text-slate-800">{initialChallenges.length - challengesData.completed.length}</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">تحدي متبقي</p>
              </div>
            </div>

            {/* Micro AI Component Preview */}
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-4xl border border-emerald-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
                <Info size={24} />
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold">نصيحة سريعة</p>
                <p className="text-sm text-slate-700 leading-tight">تقليل استهلاك اللحوم الحمراء ليوم واحد أسبوعياً يخفض بصمتك بنسبة 15%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Advisor Integrated Component */}
        <div className="mb-12">
          <AIAdvisor 
            calculatorData={calculatorData} 
            challengesData={challengesData} 
            apiKey={apiKey}
          />
        </div>

        {/* Recent Achievements Table */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
             <button onClick={onNavigateToCalculator} className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline">
               <ChevronLeft size={16} /> استكشف تحديات جديدة
             </button>
             <h3 className="text-xl font-black text-slate-800">تاريخ الإنجازات البيئية</h3>
          </div>
          <div className="p-4">
            {challengesData.completed.length > 0 ? (
              <div className="space-y-2">
                {initialChallenges.filter(c => challengesData.completed.includes(c.id)).map((challenge) => (
                  <div key={challenge.id} className="flex items-center justify-between p-6 hover:bg-emerald-50/50 rounded-3xl transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full text-xs font-black">+{challenge.points}</div>
                      <CheckCircle2 className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </div>
                    <div className="text-right">
                      <h5 className="font-bold text-slate-800">{challenge.title}</h5>
                      <p className="text-xs text-slate-400">{challenge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                  <Trophy size={40} />
                </div>
                <p className="text-slate-400 font-medium">لم تقم بتسجيل أي إنجازات حتى الآن</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 text-center pb-10">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><Leaf size={24} /></a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><CloudSun size={24} /></a>
          </div>
          <p className="text-slate-400 text-sm">أرض أخضر © 2026 - مبادرة نحو وعي بيئي رقمي شامل</p>
        </footer>
      </div>

      {/* --- Help Modal (Step-by-step Guide) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-emerald-900 p-8 text-white relative">
              <div className="absolute top-[-20%] right-[-10%] opacity-10"><Key size={200} /></div>
              <h3 className="text-3xl font-black mb-2">دليل الحصول على API Key</h3>
              <p className="text-emerald-100/60">اتبع الخطوات التالية لتفعيل ميزات الذكاء الاصطناعي مجاناً</p>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {[
                  { step: '01', title: 'زيارة Google AI Studio', desc: 'توجه إلى الموقع الرسمي لمطوري جوجل لطلب مفتاح تجريبي مجاني.', link: 'https://aistudio.google.com/' },
                  { step: '02', title: 'تسجيل الدخول', desc: 'استخدم حساب Gmail الخاص بك للولوج إلى لوحة التحكم.', link: null },
                  { step: '03', title: 'إنشاء المفتاح (Get API Key)', desc: 'اضغط على زر إنشاء مفتاح جديد في القائمة الجانبية.', link: null },
                  { step: '04', title: 'النسخ واللصق', desc: 'انسخ المفتاح الطويل ووضعه في خانة التفعيل في تطبيقنا.', link: null }
                ].map((s, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="text-3xl font-black text-emerald-100 group-hover:text-emerald-500 transition-colors">{s.step}</div>
                    <div className="text-right flex-1 border-b border-slate-50 pb-4">
                      <h5 className="font-bold text-slate-800 mb-1">{s.title}</h5>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                      {s.link && (
                        <a href={s.link} target="_blank" rel="noreferrer" className="text-emerald-600 text-xs font-bold flex items-center gap-1 justify-end mt-2 hover:underline">
                          <ExternalLink size={12} /> افتح الرابط في علامة تبويب جديدة
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all"
              >
                فهمت ذلك، دعنا نبدأ!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}