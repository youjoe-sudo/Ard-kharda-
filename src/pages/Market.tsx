import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, Star, Ticket, Award, Gift, Lock, 
  Download, X, Loader2, Share2, Trees, MapPin, 
  Calendar, CheckCircle2, ArrowRight, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// --- Interfaces ---
interface MarketProps {
  score: number;
  onRedeem: (points: number) => void;
  userName: string;
}

interface TreeDetails {
  id: string;
  lat: number;
  lng: number;
  date: string;
}

// --- Data ---
const products = [
  { id: 1, name: "حقيبة قماشية صديقة", price: "50 ج.م", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", category: "بدائل البلاستيك", rating: 4.9 },
  { id: 2, name: "زجاجة مياه معدنية", price: "120 ج.م", image: "https://images.unsplash.com/photo-1602143399827-7214bb59986f?auto=format&fit=crop&q=80&w=600", category: "إعادة استخدام", rating: 4.8 },
  { id: 3, name: "فرشاة أسنان خيزران", price: "30 ج.م", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600", category: "عناية شخصية", rating: 4.7 },
  { id: 4, name: "مجموعة زراعة منزلية", price: "200 ج.م", image: "https://images.unsplash.com/photo-1585336139118-b3195694733d?auto=format&fit=crop&q=80&w=600", category: "زراعة", rating: 5.0 },
  { id: 5, name: "دفتر ورق معاد تدويره", price: "45 ج.م", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600", category: "أدوات مكتبية", rating: 4.6 },
  { id: 6, name: "قشات شرب زجاجية", price: "60 ج.م", image: "https://images.unsplash.com/photo-1591872202319-24058b17750e?auto=format&fit=crop&q=80&w=600", category: "بدائل البلاستيك", rating: 4.5 },
];

const rewards = [
  { 
    id: 101, 
    name: "خصم 20% على المنتجات", 
    cost: 500, 
    type: "discount", 
    icon: Ticket, 
    color: "purple",
    description: "كوبون خصم صالح لمدة شهر على جميع المنتجات الصديقة للبيئة في متجرنا." 
  },
  { 
    id: 102, 
    name: "شهادة بطل البيئة", 
    cost: 1000, 
    type: "certificate", 
    icon: Award, 
    color: "blue",
    description: "شهادة رقمية موثقة تثبت مساهمتك الاستثنائية في حماية الكوكب وتقليل الانبعاثات." 
  },
  { 
    id: 103, 
    name: "شجرة حقيقية باسمك", 
    cost: 2000, 
    type: "gift", 
    icon: Gift, 
    color: "emerald",
    description: "سنقوم بزراعة شجرة حقيقية في أحد مشاريع التشجير، ونرسل لك موقعها الجغرافي الدقيق." 
  },
];

export function Market({ score, onRedeem, userName }: MarketProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'rewards'>('rewards');
  const [showCertificate, setShowCertificate] = useState(false);
  const [showTreeCertificate, setShowTreeCertificate] = useState(false);
  const [treeDetails, setTreeDetails] = useState<TreeDetails | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const treeRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  // --- PDF Logic ---
  const downloadPDF = async (elementRef: React.RefObject<HTMLDivElement>, filename: string, orientation: 'p' | 'l' = 'p') => {
    if (!elementRef.current) return;
    
    try {
      setIsDownloading(true);
      
      // Optimization for high quality rendering
      const canvas = await html2canvas(elementRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: orientation === 'l' ? 1120 : 794,
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save(filename);
      
      confetti({
        particleCount: 40,
        scalar: 0.7,
        colors: ['#10b981']
      });
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('حدث خطأ أثناء تحميل الملف، يرجى المحاولة لاحقاً.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (score >= reward.cost) {
      setSelectedReward(reward);
      onRedeem(reward.cost);
      
      // Success Celebration
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      if (reward.type === 'certificate') {
        setShowCertificate(true);
      } else if (reward.type === 'gift') {
        setTreeDetails({
          id: `ECO-TREE-${Math.floor(100000 + Math.random() * 900000)}`,
          lat: 30.0444 + (Math.random() * 0.5),
          lng: 31.2357 + (Math.random() * 0.5),
          date: new Date().toLocaleDateString('ar-EG')
        });
        setShowTreeCertificate(true);
      } else {
        alert(`تم التفعيل بنجاح! كود الخصم هو: GREEN-${Math.random().toString(36).substring(7).toUpperCase()}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4 md:p-10 font-sans text-right" dir="rtl">
      
      {/* --- Overlay Modals --- */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-5xl w-full overflow-hidden relative"
            >
              <button 
                onClick={() => setShowCertificate(false)}
                className="absolute top-6 left-6 p-3 bg-stone-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all z-[110]"
              >
                <X size={24} />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Certificate Render Area */}
                <div 
                  ref={certRef}
                  className="p-16 border-[20px] border-double border-emerald-900 m-4 bg-[#fffdfa] relative text-center"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 border-r-8 border-t-8 border-emerald-800/20 rounded-tr-[100px]" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 border-l-8 border-b-8 border-emerald-800/20 rounded-bl-[100px]" />
                  
                  <div className="relative z-10">
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        <Award size={100} className="text-emerald-700 relative z-10" />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-dashed border-emerald-200 rounded-full scale-150"
                        />
                      </div>
                    </div>

                    <h2 className="text-5xl font-black text-emerald-900 mb-2">شهادة بطل البيئة</h2>
                    <p className="text-emerald-600 text-xl font-medium mb-12 tracking-[0.2em] uppercase">Eco-Warrior Official Certificate</p>
                    
                    <div className="space-y-6 mb-16">
                      <p className="text-stone-500 text-xl">تمنح هذه الشهادة بكل فخر إلى</p>
                      <div className="relative inline-block">
                        <h3 className="text-7xl font-black text-stone-900 px-12 pb-4 border-b-4 border-emerald-100 italic">
                          {userName}
                        </h3>
                      </div>
                    </div>

                    <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-stone-700 mb-20">
                      تقديراً لالتزامه الراسخ تجاه كوكبنا، ومساهمته الفعالة في برنامج "أرض أخضر" 
                      لاستبدال النقاط بمبادرات بيئية مستدامة، مما يجعله نموذجاً يحتذى به في الحفاظ على الطبيعة.
                    </p>

                    <div className="grid grid-cols-3 gap-8 items-end px-12">
                      <div className="text-center">
                        <p className="text-stone-400 text-sm mb-2 uppercase font-bold">تاريخ الإصدار</p>
                        <p className="text-xl font-bold text-stone-800 border-b border-stone-200 pb-2">{new Date().toLocaleDateString('ar-EG')}</p>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-32 h-32 border-4 border-emerald-100 rounded-full flex items-center justify-center p-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VerifiedEcoHero" alt="Verification QR" className="w-full h-full" />
                        </div>
                      </div>
                      <div className="text-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Sign" className="h-16 mx-auto mb-2 opacity-80" />
                        <div className="border-t-2 border-stone-900 pt-2 font-black text-stone-900">إدارة المشروع</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-10 bg-stone-50 border-t flex flex-col md:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => downloadPDF(certRef, `EcoHero-${userName}.pdf`, 'l')}
                    disabled={isDownloading}
                    className="w-full md:w-auto bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all disabled:opacity-50 active:scale-95"
                  >
                    {isDownloading ? <Loader2 className="animate-spin" /> : <Download size={28} />}
                    {isDownloading ? 'جاري التجهيز...' : 'تحميل الشهادة بنسخة PDF'}
                  </button>
                  <button className="flex items-center gap-2 text-stone-500 font-bold hover:text-emerald-600 transition-colors">
                    <Share2 size={20} /> مشاركة الإنجاز
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showTreeCertificate && treeDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-[3rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
               <button onClick={() => setShowTreeCertificate(false)} className="absolute top-6 left-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full z-50 backdrop-blur-md">
                <X size={24} />
              </button>

              <div ref={treeRef} className="bg-white">
                <div className="h-64 relative">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Planted Tree" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 to-transparent flex items-end p-10">
                    <h2 className="text-4xl font-black text-white">وثيقة زراعة شجرة</h2>
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex items-center gap-4 mb-10 p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                    <div className="bg-emerald-600 p-4 rounded-2xl text-white">
                      <Trees size={40} />
                    </div>
                    <div>
                      <p className="text-stone-500 font-bold mb-1">باسم البطل:</p>
                      <h4 className="text-2xl font-black text-emerald-900">{userName}</h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="space-y-2">
                      <p className="text-stone-400 font-bold text-xs flex items-center gap-1 uppercase"><Calendar size={14}/> تاريخ الزراعة</p>
                      <p className="text-xl font-bold text-stone-800">{treeDetails.date}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-stone-400 font-bold text-xs flex items-center gap-1 uppercase"><MapPin size={14}/> كود التتبع</p>
                      <p className="text-xl font-mono font-bold text-emerald-600">{treeDetails.id}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 text-center mb-8">
                    <p className="text-stone-400 text-xs font-black mb-2 uppercase tracking-tighter">الموقع الجغرافي الدقيق</p>
                    <p className="text-2xl font-mono font-black text-stone-700">
                      {treeDetails.lat.toFixed(6)}° N, {treeDetails.lng.toFixed(6)}° E
                    </p>
                  </div>

                  <p className="text-center text-stone-500 italic mb-10 leading-relaxed">
                    "هذه الشجرة ستنمو لتمتص أكثر من 20 كجم من ثاني أكسيد الكربون سنوياً بفضلك."
                  </p>
                </div>
              </div>

              <div className="p-8 bg-stone-900 flex justify-center">
                 <button 
                  onClick={() => downloadPDF(treeRef, `MyTree-${treeDetails.id}.pdf`)}
                  disabled={isDownloading}
                  className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-2xl font-black transition-all"
                 >
                   {isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
                   تحميل بطاقة الشجرة
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Main Dashboard UI --- */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-2">
             <div className="flex items-center gap-3 text-emerald-600 font-black mb-2">
                <Leaf size={24} />
                <span className="tracking-[0.3em] uppercase text-sm">Green Marketplace</span>
             </div>
             <h1 className="text-5xl font-black text-stone-900 tracking-tight">السوق والمكافآت</h1>
             <p className="text-xl text-stone-400 font-medium">استبدل مجهودك البيئي بجوائز حقيقية تدعم الكوكب.</p>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-default"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white border border-stone-100 px-10 py-6 rounded-[2rem] flex items-center gap-6 shadow-xl shadow-stone-200/50">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-2xl">
                <Star className="w-10 h-10 text-amber-600 fill-amber-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest mb-1">رصيدك الحالي</span>
                <span className="text-5xl font-black text-stone-900 tabular-nums">{score.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-12 flex flex-wrap items-center gap-4 border-b border-stone-200 pb-6">
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3 ${
              activeTab === 'rewards' 
              ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' 
              : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Award size={24} /> المكافآت والجوائز
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3 ${
              activeTab === 'products' 
              ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' 
              : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShoppingCart size={24} /> منتجات خضراء
          </button>

          <div className="mr-auto hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100">
             <CheckCircle2 size={16} /> التوصيل متاح لكل محافظات مصر
          </div>
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'rewards' ? (
            <motion.div 
              key="rewards-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {rewards.map((reward) => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  score={score} 
                  onRedeem={handleRedeem} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="products-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Footer Spacing */}
      <div className="h-24 md:hidden" />
    </div>
  );
}

// --- Sub-Components ---

function RewardCard({ reward, score, onRedeem }: { reward: any, score: number, onRedeem: any }) {
  const Icon = reward.icon;
  const canAfford = score >= reward.cost;
  const progress = Math.min((score / reward.cost) * 100, 100);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`group relative bg-white rounded-[2.5rem] p-10 border border-stone-100 shadow-sm hover:shadow-2xl transition-all flex flex-col h-full overflow-hidden ${!canAfford && 'opacity-80'}`}
    >
      {/* Decorative Background */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-10 -translate-y-10 rounded-full bg-${reward.color}-600 group-hover:scale-150 transition-transform duration-700`} />

      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 ${
        canAfford ? `bg-${reward.color}-50 text-${reward.color}-600` : 'bg-stone-50 text-stone-300'
      }`}>
        <Icon size={40} strokeWidth={2.5} />
      </div>

      <h3 className="text-2xl font-black text-stone-900 mb-4">{reward.name}</h3>
      <p className="text-stone-500 font-medium leading-relaxed mb-8 flex-1">{reward.description}</p>

      {/* Progress Bar for Locked Rewards */}
      {!canAfford && (
        <div className="mb-8 space-y-2">
           <div className="flex justify-between text-xs font-black text-stone-400">
             <span>التقدم</span>
             <span>{Math.floor(progress)}%</span>
           </div>
           <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               className="h-full bg-amber-400 rounded-full"
             />
           </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">التكلفة</span>
          <div className="flex items-center gap-1">
             <Star size={16} className="text-amber-500 fill-amber-500" />
             <span className="text-2xl font-black text-amber-600">{reward.cost.toLocaleString()}</span>
          </div>
        </div>

        <button 
          onClick={() => onRedeem(reward)}
          disabled={!canAfford}
          className={`relative px-8 py-4 rounded-2xl font-black transition-all overflow-hidden group/btn ${
            canAfford 
            ? 'bg-stone-900 text-white hover:bg-emerald-600 hover:pr-12' 
            : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">{canAfford ? 'استبدال' : <div className="flex items-center gap-2"><Lock size={16}/> مقفل</div>}</span>
          {canAfford && <ArrowRight size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/btn:opacity-100 transition-all" />}
        </button>
      </div>
    </motion.div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="relative h-56 overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-emerald-700 shadow-sm flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           {product.category}
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-white flex items-center gap-1">
           <Star size={12} className="text-amber-400 fill-amber-400" />
           {product.rating}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-black text-stone-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-stone-900">{product.price}</span>
          </div>
          
          <button 
            onClick={() => alert('هذا المنتج متاح حالياً للتوصيل، سيتم تحويلك لصفحة الدفع.')}
            className="p-4 bg-stone-900 text-white rounded-2xl hover:bg-emerald-600 transition-all active:scale-90"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}