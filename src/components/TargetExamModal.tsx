import React, { useState } from 'react';
import { X, Target, Plus, Check } from 'lucide-react';

interface TargetExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTarget: string;
  onSelectTarget: (target: string) => void;
  onAddCustomTarget: (title: string) => void;
}

export const TargetExamModal: React.FC<TargetExamModalProps> = ({
  isOpen,
  onClose,
  currentTarget,
  onSelectTarget,
  onAddCustomTarget,
}) => {
  const [customTitle, setCustomTitle] = useState('');

  if (!isOpen) return null;

  const targets = [
    'BCS-52',
    '19th NTRCA Roadmap',
    'সমাজসেবা অধিদপ্তর',
    '14th- 20th Grade Exam',
    'Primary Assistant Teacher',
    'Bangladesh Bank Officer',
  ];

  const handleAdd = () => {
    if (!customTitle.trim()) return;
    onAddCustomTarget(customTitle);
    onSelectTarget(customTitle);
    setCustomTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-xs p-4 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Target className="w-5 h-5" />
            <span>আমার লক্ষ্য নির্বাচন</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Existing targets */}
        <div className="space-y-1.5">
          {targets.map((t) => (
            <button
              key={t}
              onClick={() => {
                onSelectTarget(t);
                onClose();
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
                currentTarget === t
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{t}</span>
              {currentTarget === t && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>

        {/* Add custom target */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <label className="text-[11px] font-bold text-slate-400 block">
            নতুন প্রস্তুতি লক্ষ্য যোগ করুন:
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="যেমন: দুর্নীতি দমন কমিশন"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleAdd}
              disabled={!customTitle.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
