import React, { useState } from 'react';
import { ShoppingCart, Star, Ticket, Award, Gift, Lock, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface MarketProps {
  score: number;
  onRedeem: (points: number) => void;
  userName: string;
}

const products = [
  { id: 1, name: "حقيبة قماشية", price: "50 ج.م", image: "https://picsum.photos/seed/bag/300/300", category: "بدائل البلاستيك" },
  { id: 2, name: "زجاجة مياه معدنية", price: "120 ج.م", image: "https://picsum.photos/seed/bottle/300/300", category: "إعادة استخدام" },
  { id: 3, name: "فرشاة أسنان خيزران", price: "30 ج.م", image: "https://picsum.photos/seed/brush/300/300", category: "عناية شخصية" },
];

const rewards = [
  { id: 101, name: "خصم 20% على المنتجات", cost: 500, type: "discount", icon: Ticket, description: "كوبون خصم صالح لمدة شهر على جميع المنتجات الصديقة للبيئة." },
  { id: 102, name: "شهادة بطل البيئة", cost: 1000, type: "certificate", icon: Award, description: "شهادة رقمية موثقة تثبت مساهمتك في حماية الكوكب." },
  { id: 103, name: "شجرة باسمك", cost: 2000, type: "gift", icon: Gift, description: "نزرع شجرة حقيقية باسمك ونرسل لك إحداثياتها وصورتها." },
];

export function Market({ score, onRedeem, userName }: MarketProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'rewards'>('rewards');
  const [showCertificate, setShowCertificate] = useState(false);
  const [showTreeCertificate, setShowTreeCertificate] = useState(false);
  const [treeDetails, setTreeDetails] = useState<{id: string, lat: number, lng: number} | null>(null);

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (score >= reward.cost) {
      onRedeem(reward.cost);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706']
      });

      if (reward.type === 'certificate') {
        setShowCertificate(true);
      } else if (reward.type === 'gift') {
        // Generate random tree details
        setTreeDetails({
          id: `TR-${Math.floor(Math.random() * 10000)}`,
          lat: 30.0 + (Math.random() * 2), // Approx Egypt Lat
          lng: 31.0 + (Math.random() * 2)  // Approx Egypt Lng
        });
        setShowTreeCertificate(true);
      } else {
        alert(`تم استبدال ${reward.cost} نقطة بنجاح! ستجد ${reward.name} في بريدك الإلكتروني.`);
      }
    } else {
      alert("عذراً، ليس لديك نقاط كافية.");
    }
  };

  const TreeCertificateModal = () => {
    if (!treeDetails) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm print:bg-white print:p-0 print:static">
        <style>{`
          @media print {
            body > * { display: none; }
            #tree-modal-container { display: flex !important; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: white; align-items: center; justify-content: center; }
            #tree-content { transform: scale(1) !important; width: 100%; height: 100%; border: none; margin: 0; }
            .no-print { display: none !important; }
          }
        `}</style>
        <motion.div 
          id="tree-modal-container"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={() => setShowTreeCertificate(false)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-stone-100 transition-colors z-50 no-print"
          >
            <X className="w-5 h-5" />
          </button>

          <div id="tree-content" className="relative h-full flex flex-col">
            {/* Image Header */}
            <div className="h-64 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop" 
                alt="Planted Tree" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-6 h-6 text-emerald-400" />
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">تمت الزراعة بنجاح</span>
                  </div>
                  <h2 className="text-3xl font-bold">شجرة باسم {userName}</h2>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white flex-1">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-stone-500 text-xs font-bold uppercase mb-1">رقم الشجرة</p>
                  <p className="text-xl font-mono font-bold text-stone-800">{treeDetails.id}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-stone-500 text-xs font-bold uppercase mb-1">التاريخ</p>
                  <p className="text-xl font-bold text-stone-800">{new Date().toLocaleDateString('ar-EG')}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-stone-500 text-xs font-bold uppercase mb-3">الموقع الجغرافي (الإحداثيات)</p>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-ping"></div>
                    </div>
                    <div>
                      <p className="font-mono text-emerald-900 font-bold text-lg">{treeDetails.lat.toFixed(6)}, {treeDetails.lng.toFixed(6)}</p>
                      <p className="text-xs text-emerald-600">تم توثيق الموقع في سجلاتنا</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed text-center mb-8">
                شكراً لمساهمتك في جعل العالم أكثر خضرة. هذه الشجرة ستنمو لتساهم في تنقية الهواء وتوفير المأوى للحياة البرية لسنوات قادمة.
              </p>

              <div className="flex justify-center gap-4 no-print">
                <button 
                  onClick={() => window.print()}
                  className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors flex items-center gap-2 w-full justify-center"
                >
                  <Download className="w-5 h-5" />
                  حفظ الوثيقة
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const CertificateModal = () => (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm print:bg-white print:p-0 print:static">
      <style>{`
        @media print {
          body > * { display: none; }
          #certificate-modal-container { display: flex !important; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: white; align-items: center; justify-content: center; }
          #certificate-content { transform: scale(1) !important; width: 100%; height: 100%; border: 10px solid #064e3b; margin: 0; }
          .no-print { display: none !important; }
        }
      `}</style>
      <motion.div 
        id="certificate-modal-container"
        initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden relative print:shadow-none print:w-full print:max-w-none print:rounded-none"
      >
        <button 
          onClick={() => setShowCertificate(false)}
          className="absolute top-4 right-4 bg-stone-100 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors z-50 no-print"
        >
          <X className="w-5 h-5" />
        </button>

        <div id="certificate-content" className="p-12 text-center border-[20px] border-double border-emerald-800 m-0 bg-[#fffdf5] relative overflow-hidden h-full flex flex-col justify-center">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-[4px] border-l-[4px] border-emerald-600 rounded-tl-3xl"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-[4px] border-r-[4px] border-emerald-600 rounded-tr-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[4px] border-l-[4px] border-emerald-600 rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[4px] border-r-[4px] border-emerald-600 rounded-br-3xl"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none">
                <Award className="w-[500px] h-[500px] text-emerald-900" />
            </div>

            <div className="relative z-10">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 rounded-full"></div>
                        <Award className="w-20 h-20 text-emerald-600 relative z-10" />
                    </div>
                </motion.div>
                
                <motion.h2 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-serif font-bold text-emerald-900 mb-2 tracking-wide"
                >
                    شهادة بطل البيئة
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-emerald-700 font-serif italic text-xl mb-12"
                >
                    Eco Hero Certificate of Appreciation
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    <p className="text-stone-500 text-lg mb-4 font-medium">تتشرف منصة أرض أخضر بمنح هذه الشهادة إلى</p>
                    <h3 className="text-6xl font-bold text-stone-900 mb-8 font-serif border-b-4 border-emerald-500/30 pb-6 inline-block px-16 min-w-[400px]">
                    {userName}
                    </h3>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-stone-600 text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-medium"
                >
                    تقديراً لجهوده المتميزة ومساهمته الفعالة في الحفاظ على البيئة، 
                    والتزامه بنمط حياة مستدام من أجل كوكب أنظف ومستقبل أفضل للأجيال القادمة.
                </motion.p>
                
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="flex justify-between items-end px-16 mt-8"
                >
                    <div className="text-center">
                        <p className="text-emerald-800/60 text-sm mb-2 font-bold uppercase tracking-widest">التاريخ</p>
                        <p className="font-bold text-stone-800 text-lg border-b border-stone-300 pb-1">{new Date().toLocaleDateString('ar-EG')}</p>
                    </div>
                    
                    {/* Official Seal */}
                    <div className="absolute left-1/2 bottom-12 -translate-x-1/2 opacity-80 hidden md:block">
                         <div className="w-32 h-32 border-4 border-emerald-600/30 rounded-full flex items-center justify-center p-2 rotate-12">
                            <div className="w-full h-full border-2 border-dashed border-emerald-600/50 rounded-full flex items-center justify-center text-center">
                                <span className="text-xs font-bold text-emerald-800 uppercase transform -rotate-12">Official<br/>Certified<br/>Eco Hero</span>
                            </div>
                         </div>
                    </div>

                    <div className="text-center relative">
                        <div className="mb-2 relative">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-16 opacity-90 mx-auto filter sepia contrast-125" />
                        </div>
                        <div className="border-t-2 border-stone-900 pt-2 w-56 mx-auto">
                            <p className="font-bold text-stone-900 text-lg">Mohamed Abdelfatah</p>
                            <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">المدير التنفيذي</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        <div className="bg-stone-50 p-6 flex justify-center gap-4 border-t border-stone-100 no-print">
          <button 
            onClick={() => window.print()}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 flex items-center gap-2 transform hover:-translate-y-1"
          >
            <Download className="w-5 h-5" />
            تحميل / طباعة الشهادة
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto">
      {showCertificate && <CertificateModal />}
      {showTreeCertificate && <TreeCertificateModal />}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 mb-2">السوق والمكافآت</h2>
          <p className="text-stone-500">استبدل نقاطك بمكافآت قيمة أو تسوق منتجات صديقة للبيئة.</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
          <Star className="w-6 h-6 text-yellow-600 fill-current" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600/70">رصيد النقاط</p>
            <p className="text-2xl font-bold">{score}</p>
          </div>
        </div>
      </header>

      <div className="flex gap-4 mb-8 border-b border-stone-200 pb-1">
        <button
          onClick={() => setActiveTab('rewards')}
          className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
            activeTab === 'rewards' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          المكافآت والجوائز
          {activeTab === 'rewards' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 px-4 text-sm font-bold transition-colors relative ${
            activeTab === 'products' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          منتجات صديقة للبيئة
          {activeTab === 'products' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'rewards' ? (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rewards.map((reward) => {
              const Icon = reward.icon;
              const canAfford = score >= reward.cost;
              
              return (
                <div key={reward.id} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm flex flex-col relative overflow-hidden group hover:border-emerald-200 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    reward.type === 'discount' ? 'bg-purple-100 text-purple-600' :
                    reward.type === 'certificate' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{reward.name}</h3>
                  <p className="text-stone-500 text-sm mb-6 flex-1">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
                    <span className="font-bold text-yellow-600 flex items-center gap-1">
                      {reward.cost} <span className="text-xs font-normal text-stone-400">نقطة</span>
                    </span>
                    
                    <button
                      onClick={() => handleRedeem(reward)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                        canAfford 
                          ? 'bg-stone-900 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg' 
                          : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'استبدال' : <><Lock className="w-3 h-3" /> مقفل</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group"
              >
                <div className="aspect-square overflow-hidden bg-stone-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-stone-600 shadow-sm">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-stone-900 text-lg">{product.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-stone-400 font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-emerald-600 font-bold text-lg">{product.price}</span>
                    <button 
                      onClick={() => alert('هذه منتجات تجريبية وسيتم الربط بمتاجر قريبا')}
                      className="bg-stone-900 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
