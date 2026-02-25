import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Users, School, ArrowUp, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'teams' | 'individuals'>('teams');
  const [teams, setTeams] = useState<any[]>([]);
  const [individuals, setIndividuals] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const storedTeams = JSON.parse(localStorage.getItem('eco_teams') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('eco_users') || '[]');
    const user = JSON.parse(localStorage.getItem('eco_user') || 'null');

    // Sort teams by score
    const sortedTeams = [...storedTeams].sort((a, b) => b.score - a.score);
    
    // Sort individuals by score
    const sortedIndividuals = [...storedUsers].sort((a, b) => (b.score || 0) - (a.score || 0));

    setTeams(sortedTeams);
    setIndividuals(sortedIndividuals);
    setCurrentUser(user);
  }, []);

  const userTeam = currentUser?.teamName 
    ? teams.find((t: any) => t.name === currentUser.teamName) 
    : null;

  const userRank = individuals.findIndex((u: any) => u.name === currentUser?.name) + 1;

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">لوحة الشرف</h2>
        <p className="text-stone-500">تنافس مع المدارس والأفراد لخدمة الكوكب.</p>
      </header>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            activeTab === 'teams' 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-white text-stone-500 hover:bg-stone-50'
          }`}
        >
          الفرق والمدارس
        </button>
        <button
          onClick={() => setActiveTab('individuals')}
          className={`px-6 py-2 rounded-full font-bold transition-all ${
            activeTab === 'individuals' 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-white text-stone-500 hover:bg-stone-50'
          }`}
        >
          الأفراد (Top 10)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'teams' ? (
          <motion.div
            key="teams"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* User Team Card */}
            {userTeam ? (
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <School className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-emerald-100 text-sm">فريقك الحالي</p>
                      <h3 className="text-2xl font-bold">{userTeam.name}</h3>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-emerald-100 text-sm">الترتيب</p>
                    <p className="text-3xl font-bold">#{teams.findIndex(t => t.name === userTeam.name) + 1}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  <div className="bg-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Users className="w-4 h-4" /> {userTeam.members.length} عضو
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> {userTeam.score.toLocaleString()} نقطة
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-stone-100 rounded-2xl p-6 text-stone-500 text-center mb-8 border border-stone-200">
                <p>أنت لست منضماً لأي فريق حالياً.</p>
              </div>
            )}

            {/* Leaderboard List */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
                <h3 className="font-bold text-stone-700">ترتيب الفرق</h3>
                <span className="text-xs text-stone-400">مباشر</span>
              </div>
              
              {teams.length > 0 ? (
                <div className="divide-y divide-stone-100">
                  {teams.map((team, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 flex items-center gap-4 hover:bg-stone-50 transition-colors"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-stone-200 text-stone-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-stone-50 text-stone-400'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900 flex items-center gap-2">
                          {team.name}
                          {index < 3 && <Medal className="w-4 h-4 text-yellow-500" />}
                        </h4>
                        <p className="text-xs text-stone-500">{team.members.length} عضو</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{team.score.toLocaleString()}</p>
                        <p className="text-xs text-stone-400">نقطة</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-stone-400">
                  <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>لا توجد فرق مسجلة بعد.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="individuals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
             <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
                <h3 className="font-bold text-stone-700">أفضل الأبطال</h3>
                <span className="text-xs text-stone-400">مباشر</span>
              </div>
              
              {individuals.length > 0 ? (
                <div className="divide-y divide-stone-100">
                  {individuals.slice(0, 10).map((user, index) => (
                    <div 
                      key={index}
                      className={`p-4 flex items-center gap-4 hover:bg-stone-50 transition-colors ${user.name === currentUser?.name ? 'bg-emerald-50' : ''}`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-stone-200 text-stone-600' :
                        index === 2 ? 'bg-orange-100 text-orange-600' :
                        'bg-stone-50 text-stone-400'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold overflow-hidden">
                        {user.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-stone-900 flex items-center gap-2">
                          {user.name}
                          {user.name === currentUser?.name && <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">أنت</span>}
                          {index < 3 && <Medal className="w-4 h-4 text-yellow-500" />}
                        </h4>
                        <p className="text-xs text-stone-500">{user.governorate}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{(user.score || 0).toLocaleString()}</p>
                        <p className="text-xs text-stone-400">نقطة</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-stone-400">
                  <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>لا يوجد مستخدمين مسجلين بعد.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
