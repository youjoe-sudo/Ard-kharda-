import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Phone, Users, ArrowRight, Check, School, ShieldCheck } from 'lucide-react';

interface UserData {
  name: string;
  governorate: string;
  phone: string;
  teamName?: string;
  isLeader?: boolean;
}

interface OnboardingProps {
  onComplete: (user: UserData) => void;
}

const GOVERNORATES = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية", 
  "القليوبية", "البحيرة", "الغربية", "بور سعيد", "دمياط", "الإسماعيلية", 
  "السويس", "كفر الشيخ", "الفيوم", "بني سويف", "المنيا", "أسيوط", 
  "سوهاج", "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد", 
  "مطروح", "شمال سيناء", "جنوب سيناء"
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    governorate: '',
    phone: '',
    hasTeam: null as boolean | null,
    teamName: '',
    isLeader: false
  });
  const [error, setError] = useState('');

  const [availableTeams, setAvailableTeams] = useState<any[]>([]);

  useEffect(() => {
    const teams = JSON.parse(localStorage.getItem('eco_teams') || '[]');
    setAvailableTeams(teams);
  }, [step]);

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.governorate || !formData.phone) {
        setError('يرجى ملء جميع البيانات المطلوبة');
        return;
      }
      if (formData.phone.length < 11) {
        setError('رقم الهاتف غير صحيح');
        return;
      }
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handleTeamSubmit = () => {
    if (formData.hasTeam === true && !formData.teamName) {
      setError('يرجى إدخال اسم الفريق');
      return;
    }

    // Simulate Team Logic with LocalStorage
    const storedTeams = JSON.parse(localStorage.getItem('eco_teams') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('eco_users') || '[]');
    
    const cleanTeamName = formData.teamName.trim();
    
    if (formData.hasTeam) {
      const existingTeam = storedTeams.find((t: any) => t.name.toLowerCase() === cleanTeamName.toLowerCase());
      
      if (formData.isLeader) {
        // Creating a new team
        if (existingTeam) {
          setError('هذا الفريق موجود بالفعل. هل تريد الانضمام إليه كعضو؟');
          return;
        }
        const newTeam = {
          name: cleanTeamName,
          leader: formData.name,
          members: [formData.name],
          score: 0
        };
        localStorage.setItem('eco_teams', JSON.stringify([...storedTeams, newTeam]));
      } else {
        // Joining existing team
        if (!existingTeam) {
          setError('هذا الفريق غير موجود. تأكد من الاسم أو قم بإنشاء فريق جديد.');
          return;
        }
        // Add member to team (simulation)
        const updatedTeams = storedTeams.map((t: any) => {
          if (t.name.toLowerCase() === cleanTeamName.toLowerCase()) {
            // Check if user already in team to avoid duplicates
            if (!t.members.includes(formData.name)) {
              return { ...t, members: [...t.members, formData.name] };
            }
          }
          return t;
        });
        localStorage.setItem('eco_teams', JSON.stringify(updatedTeams));
      }
    }

    const newUser = {
      name: formData.name,
      governorate: formData.governorate,
      phone: formData.phone,
      teamName: formData.hasTeam ? cleanTeamName : undefined,
      isLeader: formData.isLeader,
      score: 0 // Initial score
    };

    // Save to global users list
    localStorage.setItem('eco_users', JSON.stringify([...storedUsers, newUser]));

    onComplete(newUser);
  };

  return (
    <div className="fixed inset-0 bg-stone-50 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-100"
      >
        <div className="bg-emerald-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">أهلاً بك في أرض أخضر</h2>
          <p className="text-emerald-100 text-sm">خطوتك الأولى نحو كوكب أنظف 🌱</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    الاسم بالكامل
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="اكتب اسمك هنا..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    المحافظة
                  </label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => setFormData({...formData, governorate: e.target.value})}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    <option value="">اختر المحافظة...</option>
                    {GOVERNORATES.map(gov => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="01xxxxxxxxx"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">هل أنت جزء من فريق؟</h3>
                  <p className="text-stone-500 text-sm">الانضمام لفريق يزيد من نقاطك وحماسك!</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({...formData, hasTeam: true})}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.hasTeam === true
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-stone-100 bg-white text-stone-500 hover:border-emerald-200'
                    }`}
                  >
                    <Users className="w-8 h-8" />
                    <span className="font-bold">نعم، معي فريق</span>
                  </button>
                  <button
                    onClick={() => setFormData({...formData, hasTeam: false, teamName: ''})}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      formData.hasTeam === false
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-stone-100 bg-white text-stone-500 hover:border-emerald-200'
                    }`}
                  >
                    <User className="w-8 h-8" />
                    <span className="font-bold">لا، أنا مستقل</span>
                  </button>
                </div>

                {formData.hasTeam === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-stone-100"
                  >
                    <div className="flex gap-4 text-sm bg-stone-50 p-1 rounded-lg">
                      <button
                        onClick={() => setFormData({...formData, isLeader: false})}
                        className={`flex-1 py-2 rounded-md transition-all ${!formData.isLeader ? 'bg-white shadow-sm text-emerald-600 font-bold' : 'text-stone-500'}`}
                      >
                        انضمام لفريق
                      </button>
                      <button
                        onClick={() => setFormData({...formData, isLeader: true})}
                        className={`flex-1 py-2 rounded-md transition-all ${formData.isLeader ? 'bg-white shadow-sm text-emerald-600 font-bold' : 'text-stone-500'}`}
                      >
                        إنشاء فريق جديد
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                        {formData.isLeader ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <School className="w-4 h-4 text-emerald-600" />}
                        {formData.isLeader ? 'اسم الفريق الجديد' : 'اسم الفريق للانضمام'}
                      </label>
                      <input
                        type="text"
                        value={formData.teamName}
                        onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                        className="w-full p-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        placeholder={formData.isLeader ? "مثال: أبطال البيئة" : "اكتب اسم الفريق بدقة..."}
                      />
                      
                      {!formData.isLeader && availableTeams.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-stone-400 mb-2">الفرق المتاحة (اضغط للاختيار):</p>
                          <div className="flex flex-wrap gap-2">
                            {availableTeams.map((team: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setFormData({...formData, teamName: team.name})}
                                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                                  formData.teamName === team.name 
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200 font-bold' 
                                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-emerald-300'
                                }`}
                              >
                                {team.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-4 text-center font-medium bg-red-50 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-8 flex justify-end">
            {step === 1 ? (
              <div className="w-full flex flex-col gap-4">
                <button
                  onClick={handleNext}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 w-full justify-center"
                >
                  التالي
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </button>
                
                <button
                  onClick={() => {
                    if (window.confirm('هل أنت متأكد من مسح جميع البيانات (الفرق والمستخدمين) والبدء من جديد؟')) {
                      localStorage.clear();
                      setAvailableTeams([]);
                      alert('تم مسح البيانات بنجاح');
                    }
                  }}
                  className="text-xs text-red-400 hover:text-red-600 underline text-center"
                >
                  مسح جميع البيانات والبدء من جديد (للتجربة)
                </button>
              </div>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl font-bold text-stone-500 hover:bg-stone-100 transition-colors"
                >
                  رجوع
                </button>
                <button
                  onClick={handleTeamSubmit}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 flex-1 justify-center"
                >
                  ابدأ الرحلة
                  <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
