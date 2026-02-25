import React from 'react';
import { Home, Leaf, Calculator, Trophy, ShoppingBag, BarChart2, Users, LogOut, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between md:justify-center md:gap-8 h-16 items-center">
          <div className="flex justify-around flex-1 md:flex-none md:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center w-full md:w-auto px-2 py-1 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "text-emerald-600 bg-emerald-50" 
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                  )}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] md:text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center px-4 py-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200 ml-2 md:absolute md:left-4"
            title="تسجيل الخروج"
          >
            <LogOut className="w-6 h-6 mb-1" />
            <span className="text-[10px] md:text-xs font-medium">خروج</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
