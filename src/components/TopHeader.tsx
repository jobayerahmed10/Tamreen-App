import React from 'react';
import { Menu, Bell, Search, Sparkles, Target, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  appName?: string;
  targetExam?: string;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenTargetModal: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  appName = 'তামরীন',
  targetExam = 'BCS-52',
  onOpenMenu,
  onOpenSearch,
  onOpenNotifications,
  onOpenTargetModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left Side: App Name "তামরীন" + Target Exam Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 ring-1 ring-emerald-400/30">
            <span className="text-white font-black text-lg tracking-wider">ত</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold tracking-tight text-white font-['Hind_Siliguri']">
                {appName}
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                PRO
              </span>
            </div>
            
            {/* Target Exam Dropdown Pill */}
            <button
              onClick={onOpenTargetModal}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
              title="লক্ষ্য পরিবর্তন করুন"
            >
              <Target className="w-3 h-3 text-emerald-400" />
              <span className="font-medium text-slate-300 group-hover:text-emerald-300">{targetExam}</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Side: Search, Notifications & Top Right Menu */}
        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 border border-slate-700/50"
            title="প্রশ্ন খুঁজুন"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 border border-slate-700/50"
            title="নোটিফিকেশন"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#0f172a] animate-pulse" />
          </button>

          {/* Top Right Menu Button (as explicitly requested: "অ্যাপের উপরের ডান দিকে মেনু দিবে।") */}
          <button
            onClick={onOpenMenu}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 flex items-center justify-center text-emerald-400 hover:text-emerald-200 transition-all active:scale-95 border border-emerald-500/40 shadow-sm"
            title="মেনু খুলুন"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
