import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, Medal, Users, School, 
  ArrowUp, User, AlertCircle, 
  Crown, Star, TrendingUp, 
  MapPin, ShieldCheck, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'teams' | 'individuals'>('teams');
  const [teams, setTeams] = useState<any[]>([]);
  const [individuals, setIndividuals] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('eco_teams') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('eco_users') || '[]');
    const user = JSON.parse(localStorage.getItem('eco_user') || 'null');

    setTeams([...storedTeams].sort((a, b) => b.score - a.score));
    setIndividuals([...storedUsers].sort((a, b) => (b.score || 0) - (a.score || 0)));
    setCurrentUser(user);
  }, []);

  // حساب الترتيب والبيانات المهمة
  const userStats = useMemo(() => {
    const rank = individuals.findIndex((u: any) => u.name === currentUser?.name) + 1;
    const teamRank = teams.findIndex((t: any) => t.name === currentUser?.teamName) + 1;
    const teamData = teams.find((t: any) => t.name === currentUser?.teamName);
    return { rank, teamRank, teamData };
  }, [individuals, teams, currentUser]);

  return (
    <div className="p-4 md:p-10 pb-32 max-w-5xl mx-auto font-sans">
      
      {/* --- Header --- */}
      <header className="mb-12 text-center relative">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
        >
          حائط الأبطال
        </motion.div>
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">لوحة <span className="text-emerald-600">الشرف</span></h2>
        <p className="text-slate-500 max-w-md mx-auto font-medium">أكتر ناس ومدارس أثروا في الكوكب النهاردة.. اسمك موجود بينهم؟</p>
        
        {/* Live Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">تحديث مباشر</span>
        </div>
      </header>

      {/* --- Tab Switcher --- */}
      <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-md rounded-[2rem] max-w-sm mx-auto mb-12 border border-slate-200">
        {(['teams', 'individuals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 rounded-[1.8rem] font-black text-sm transition-all duration-500 flex items-center justify-center gap-2 ${
              activeTab === tab 
                ? 'bg-white text-slate-900 shadow-xl scale-100' 
                : 'text-slate-500 hover:text-slate-700 scale-95'
            }`}
          >
            {tab === 'teams' ? <School size={18} /> : <User size={18} />}
            {tab === 'teams' ? 'المدارس والفرق' : 'أبطال الكوكب'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'teams' ? (
          <motion.div key="teams" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            
            {/* Podium (Top 3) */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 items-end mb-16 px-2">
               {/* المركز الثاني */}
               <PodiumItem data={teams[1]} rank={2} color="bg-slate-300" height="h-40" />
               {/* المركز الأول */}
               <PodiumItem data={teams[0]} rank={1} color="bg-amber-400" height="h-56" isMain />
               {/* المركز الثالث */}
               <PodiumItem data={teams[2]} rank={3} color="bg-orange-400" height="h-32" />
            </div>

            {/* Rest of the List */}
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
               {teams.slice(3).map((team, index) => (
                 <LeaderboardRow key={team.name} rank={index + 4} name={team.name} score={team.score} subText={`${team.members.length} بطل مشارك`} />
               ))}
               {teams.length <= 3 && <EmptyState text="لسة مفيش فرق تانية.. فرصة مدرستك تتصدر!" />}
            </div>
          </motion.div>
        ) : (
          <motion.div key="individuals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Top Individuals */}
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
               {individuals.slice(0, 15).map((user, index) => (
                 <LeaderboardRow 
                    key={user.name} 
                    rank={index + 1} 
                    name={user.name} 
                    score={user.score || 0} 
                    subText={user.governorate} 
                    isUser={user.name === currentUser?.name}
                    avatar={user.name.charAt(0)}
                 />
               ))}
               {individuals.length === 0 && <EmptyState text="كن أول بطل ينضم للوحة الشرف!" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Floating User Status Card --- */}
      <AnimatePresence>
        {currentUser && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-50"
          >
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 shadow-2xl shadow-emerald-900/40 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-black text-slate-900 shadow-lg shadow-emerald-500/20">
                  {userStats.rank || "?"}
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tighter mb-1">مركزك الحالي</p>
                  <h4 className="text-xl font-black">{currentUser.name}</h4>
                </div>
              </div>
              <div className="flex gap-4">
                 <div className="text-center bg-white/5 px-4 py-2 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-bold mb-1">السكور</p>
                    <p className="text-lg font-black text-emerald-400">{currentUser.score || 0}</p>
                 </div>
                 {userStats.teamData && (
                   <div className="text-center bg-white/5 px-4 py-2 rounded-2xl border border-emerald-500/20">
                    <p className="text-[10px] text-slate-400 font-bold mb-1">ترتيب الفريق</p>
                    <p className="text-lg font-black text-white">#{userStats.teamRank}</p>
                   </div>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- المكونات الفرعية (Internal Components) ---

function PodiumItem({ data, rank, color, height, isMain }: any) {
  if (!data) return <div className="flex-1" />;
  return (
    <div className="flex flex-col items-center flex-1 group">
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="mb-4 relative"
      >
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl ${isMain ? 'bg-amber-400' : 'bg-slate-700'} flex items-center justify-center text-3xl font-black text-slate-900 shadow-xl relative z-10 overflow-hidden`}>
          {data.name.charAt(0)}
          {isMain && <Crown className="absolute top-1 right-1 text-white opacity-40" size={16} />}
        </div>
        <div className={`absolute inset-0 ${isMain ? 'bg-amber-400' : 'bg-slate-400'} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
      </motion.div>
      <div className={`w-full ${height} ${color} rounded-t-[2rem] relative flex flex-col items-center justify-start pt-4 shadow-inner`}>
        <span className="text-2xl font-black text-white/50">#{rank}</span>
        <div className="absolute -bottom-10 w-full text-center">
          <p className="font-black text-slate-900 text-xs md:text-sm truncate px-2">{data.name}</p>
          <p className="text-emerald-600 font-black text-xs">{data.score.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ rank, name, score, subText, isUser, avatar }: any) {
  return (
    <motion.div 
      whileHover={{ x: 10, backgroundColor: '#f8fafc' }}
      className={`p-6 flex items-center gap-4 transition-all border-b border-slate-50 ${isUser ? 'bg-emerald-50/50' : ''}`}
    >
      <div className="w-10 text-center font-black text-slate-300 text-lg">#{rank}</div>
      
      {avatar && (
        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-500 border border-slate-200">
          {avatar}
        </div>
      )}

      <div className="flex-1 text-right">
        <h4 className="font-black text-slate-900 flex items-center gap-2">
          {name}
          {isUser && <span className="bg-emerald-500 text-[8px] text-white px-2 py-0.5 rounded-full uppercase tracking-widest">أنت</span>}
        </h4>
        <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
          <MapPin size={10} /> {subText}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xl font-black text-slate-900 tabular-nums">{score.toLocaleString()}</p>
          <p className="text-[9px] text-slate-400 font-bold uppercase text-left">نقطة</p>
        </div>
        <div className={`p-2 rounded-xl ${rank <= 5 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
          <TrendingUp size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="p-20 text-center">
      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-slate-200" />
      <p className="text-slate-400 font-black italic">{text}</p>
    </div>
  );
}