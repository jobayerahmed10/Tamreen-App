import React, { useState } from 'react';
import {
  Globe,
  Feather,
  BookOpen,
  BookMarked,
  Languages,
  Calculator,
  Atom,
  Landmark,
  Compass,
  MapPin,
  Scale,
  Monitor,
  Brain,
  Play,
  Zap,
  CheckCircle,
  Sliders,
} from 'lucide-react';
import { Subject } from '../types';

interface PracticeViewProps {
  subjects: Subject[];
  onSelectSubjectPractice: (subject: Subject, mode: 'mock' | 'quick', options?: { count: number; difficulty: string }) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ subjects, onSelectSubjectPractice }) => {
  const [activeTab, setActiveTab] = useState<'mock' | 'quick'>('mock');
  const [selectedQuickSubject, setSelectedQuickSubject] = useState<Subject | null>(subjects[0] || null);
  const [quickQuestionCount, setQuickQuestionCount] = useState<number>(20);
  const [quickDifficulty, setQuickDifficulty] = useState<string>('mixed');

  // Map icon strings to Lucide components
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Feather': return <Feather className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'BookMarked': return <BookMarked className="w-5 h-5" />;
      case 'Languages': return <Languages className="w-5 h-5" />;
      case 'Calculator': return <Calculator className="w-5 h-5" />;
      case 'Atom': return <Atom className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'Monitor': return <Monitor className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto">
      {/* Dual Tab Switcher (Matching Screenshot 3 & 4) */}
      <div className="flex bg-slate-800/80 p-1 rounded-2xl border border-slate-700/80 shadow-inner">
        <button
          onClick={() => setActiveTab('mock')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'mock'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          মক পরীক্ষা
        </button>
        <button
          onClick={() => setActiveTab('quick')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'quick'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          দ্রুত প্র্যাকটিস
        </button>
      </div>

      {/* TAB 1: MOCK EXAM SUBJECT GRID (Matching Screenshot 3) */}
      {activeTab === 'mock' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide">বিষয় ভিত্তিক</h3>
            <span className="text-[11px] text-slate-400">{subjects.length}টি বিষয়</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onSelectSubjectPractice(sub, 'mock')}
                className="bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/50 p-3 rounded-2xl cursor-pointer transition-all active:scale-98 flex flex-col justify-between min-h-[90px] group shadow-md"
              >
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl ${sub.bgColor} shrink-0`}>
                    {getSubjectIcon(sub.icon)}
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                    {sub.nameBn}
                  </h4>
                </div>

                {/* Progress bar inside card */}
                <div className="mt-2 pt-1 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400">
                  <span>প্রোগ্রেস</span>
                  <span className="font-bold text-emerald-400">{sub.progressPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUICK PRACTICE MODE (Matching Screenshot 4) */}
      {activeTab === 'quick' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" /> কনফিগারেশন
              </span>
              <span className="text-[10px] text-slate-400">ফাষ্ট ট্র্যাক মোড</span>
            </div>

            {/* Question Count selector */}
            <div>
              <label className="text-[11px] text-slate-300 font-medium block mb-1">
                প্রশ্ন সংখ্যা: <span className="font-bold text-emerald-400">{quickQuestionCount}টি</span>
              </label>
              <div className="flex gap-1.5">
                {[10, 20, 30, 50, 100].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuickQuestionCount(num)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      quickQuestionCount === num
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty selector */}
            <div>
              <label className="text-[11px] text-slate-300 font-medium block mb-1">কঠিনতা (Difficulty)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'easy', label: 'সহজ' },
                  { id: 'medium', label: 'মাঝারি' },
                  { id: 'hard', label: 'কঠিন' },
                  { id: 'mixed', label: 'মিশ্র' },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setQuickDifficulty(diff.id)}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      quickDifficulty === diff.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical Subject List for Quick Practice (Matching Screenshot 4) */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
              বিষয় নির্বাচন করুন:
            </h4>

            {subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedQuickSubject(sub)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedQuickSubject?.id === sub.id
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${sub.bgColor}`}>
                    {getSubjectIcon(sub.icon)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{sub.nameBn}</h5>
                    <p className="text-[10px] text-slate-400">{sub.questionCount} প্রশ্ন প্রস্তুত</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedQuickSubject?.id === sub.id && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Practice Start Button */}
          {selectedQuickSubject && (
            <button
              onClick={() =>
                onSelectSubjectPractice(selectedQuickSubject, 'quick', {
                  count: quickQuestionCount,
                  difficulty: quickDifficulty,
                })
              }
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-98"
            >
              <Zap className="w-4 h-4" />
              "{selectedQuickSubject.nameBn}" দ্রুত প্র্যাকটিস শুরু করুন ({quickQuestionCount}টি প্রশ্ন)
            </button>
          )}
        </div>
      )}
    </div>
  );
};
