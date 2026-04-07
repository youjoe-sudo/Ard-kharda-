import React from 'react';
import { Home, Leaf, Calculator, Trophy, ShoppingBag, BarChart2, Users, LogOut, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react'; // ضفت أنيميشن خفيف للحركات

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function Navigation({ activeTab, setActiveTab, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'awareness', label: 'توعية', icon: Leaf },
    { id: 'calculator', label: 'حاسبة', icon: Calculator },
    { id: 'challenges', label: 'تحديات', icon: Trophy },
    { id: 'games', label: 'ألعاب', icon: Gamepad2 },
    { id: 'leaderboard', label: 'الفرق', icon: Users },
    { id: 'market', label: 'السوق', icon: ShoppingBag },
    { id: 'reports', label: 'تقارير', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-[100] md:top-6 md:bottom-auto">
      {/* Container الأساسي بلمسة زجاجية */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] rounded-[2rem] px-4 py-2 md:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          
          {/* العناصر الأساسية */}
          <div className="flex justify-around items-center flex-1 md:gap-4 lg:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative group flex flex-col items-center justify-center p-2"
                >
                  {/* Indicator الخلفي لما يكون Active */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-emerald-500/10 rounded-2xl z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <Icon className={cn(
                    "w-5 h-5 md:w-6 md:h-6 transition-all duration-300 z-10",
                    isActive ? "text-emerald-600 scale-110" : "text-stone-400 group-hover:text-stone-600"
                  )} />
                  
                  <span className={cn(
                    "text-[10px] md:text-xs font-bold mt-1 transition-all duration-300 z-10 hidden sm:block",
                    isActive ? "text-emerald-700" : "text-stone-400 group-hover:text-stone-600"
                  )}>
                    {item.label}
                  </span>

                  {/* نقطة صغيرة تحت الأيقونة في الموبايل */}
                  {isActive && (
                    <motion.div 
                      layoutId="dot"
                      className="absolute -bottom-1 w-1 h-1 bg-emerald-600 rounded-full sm:hidden" 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* خط فاصل صغير */}
          <div className="w-[1px] h-8 bg-stone-200 mx-2 md:mx-4 hidden sm:block" />

          {/* زر تسجيل الخروج */}
          <button
            onClick={onLogout}
            className="group flex flex-col items-center justify-center p-2 text-red-400 hover:text-red-600 transition-colors"
            title="خروج"
          >
            <div className="p-2 group-hover:bg-red-50 rounded-xl transition-all">
              <LogOut className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="text-[10px] font-bold hidden md:block">خروج</span>
          </button>
        </div>
      </div>
    </nav>
  );
}