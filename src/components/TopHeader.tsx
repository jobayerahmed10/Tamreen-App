import React from 'react';
import { Menu, Moon, Sun, Flame, Home, FolderArchive, Edit3, BookOpenCheck, BarChart3 } from 'lucide-react';
import { TabType } from './BottomNavigation';

interface TopHeaderProps {
  appName?: string;
  streakDays?: number;
  isDarkMode: boolean;
  activeTab?: TabType;
  onChangeTab?: (tab: TabType) => void;
  onToggleDarkMode: () => void;
  onOpenMenu: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  appName = 'তামরীন',
  streakDays = 5,
  isDarkMode,
  activeTab = 'home',
  onChangeTab,
  onToggleDarkMode,
  onOpenMenu,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'হোম', icon: Home },
    { id: 'archive' as TabType, label: 'আর্কাইভ', icon: FolderArchive },
    { id: 'practice' as TabType, label: 'প্র্যাকটিস', icon: Edit3 },
    { id: 'qbank' as TabType, label: 'প্রশ্নব্যাংক', icon: BookOpenCheck },
    { id: 'progress' as TabType, label: 'প্রোগ্রেস', icon: BarChart3 },
  ];

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 py-2.5 transition-colors ${
        isDarkMode
          ? 'bg-[#0b0f19]/95 border-slate-800/80 text-white'
          : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left Side: Only App Name "তামরীন" */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-900/20 ring-1 ring-emerald-400/30">
            <span className="text-white font-black text-base tracking-wider">ত</span>
          </div>
          <h1
            className={`text-xl font-extrabold tracking-tight font-['Hind_Siliguri'] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {appName}
          </h1>
        </div>

        {/* Center: Desktop Navigation Bar (Visible on Desktop / md screens) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-500/10 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab && onChangeTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Streak Badge, Dark Mode Toggle & Menu Drawer Button */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Streak Badge */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono transition-all border ${
              isDarkMode
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                : 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
            }`}
            title="আপনার দৈনিক স্ট্রিক"
          >
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
            <span>🔥 {streakDays}</span>
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 border shadow-xs ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700/60'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isDarkMode ? 'লাইট মোড অন করুন' : 'ডার্ক মোড অন করুন'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Menu Drawer Button */}
          <button
            onClick={onOpenMenu}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 border shadow-xs ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700/60'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
            title="মেনু খুলুন"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};


