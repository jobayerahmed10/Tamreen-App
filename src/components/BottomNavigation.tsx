import React from 'react';
import { Home, FolderArchive, Edit3, BookOpenCheck, BarChart3 } from 'lucide-react';

export type TabType = 'home' | 'archive' | 'practice' | 'qbank' | 'progress';

interface BottomNavigationProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'হোম', icon: Home },
    { id: 'archive' as TabType, label: 'আর্কাইভ', icon: FolderArchive },
    { id: 'practice' as TabType, label: 'প্র্যাকটিস', icon: Edit3 },
    { id: 'qbank' as TabType, label: 'প্রশ্নব্যাংক', icon: BookOpenCheck },
    { id: 'progress' as TabType, label: 'প্রোগ্রেস', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f172a]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
