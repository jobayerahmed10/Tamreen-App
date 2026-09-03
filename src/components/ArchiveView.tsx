import React, { useState } from 'react';
import { Search, X, Edit2, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { ExamCategory } from '../types';

interface ArchiveViewProps {
  categories: ExamCategory[];
  onSelectSubCategory: (catId: string, title: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ categories, onSelectSubCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'সকল ক্যাটাগরি' },
    { id: 'bcs-cat', label: 'বিসিএস' },
    { id: 'teacher-cat', label: 'টিচার রিক্রুটমেন্ট' },
    { id: 'bank-cat', label: 'ব্যাংক জব' },
  ];

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter !== 'all' && cat.id !== activeFilter) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      cat.titleBn.toLowerCase().includes(term) ||
      cat.items.some((item) => item.titleBn.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto">
      {/* Search Input (Matching Screenshot 2) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="প্রশ্নব্যাংক খুঁজুন..."
          className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Section List */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className={`p-4 rounded-2xl border ${cat.bgColor} ${cat.borderColor} space-y-3 transition-all`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-wide">{cat.titleBn}</h3>
              <span className="text-[10px] bg-slate-800/80 text-slate-300 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                {cat.items.length}টি ক্যাটাগরি
              </span>
            </div>

            {/* Grid of Exam Cards (2 Columns) */}
            <div className="grid grid-cols-2 gap-3">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectSubCategory(item.id, item.titleBn)}
                  className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl cursor-pointer hover:opacity-95 transition-all shadow-lg relative flex flex-col justify-between min-h-[120px] group active:scale-98`}
                >
                  <h4 className="text-sm font-bold text-white leading-snug drop-shadow-sm">
                    {item.titleBn}
                  </h4>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20">
                    <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                      <Edit2 className="w-2.5 h-2.5" /> {item.count}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Filter Pills (Matching Screenshot 2) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 border-t border-slate-800">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
