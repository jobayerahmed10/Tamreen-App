import React from 'react';
import {
  Flame,
  FolderArchive,
  Zap,
  Edit3,
  Sparkles,
  Target,
  BookOpenCheck,
  History,
  Newspaper,
  ChevronRight,
  Clock,
  Play,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { UserProfile, MockExam, PreparationTarget, FlashNewsItem } from '../types';
import { TabType } from './BottomNavigation';

interface HomeViewProps {
  user: UserProfile;
  mockExams: MockExam[];
  preparationTargets: PreparationTarget[];
  flashNews: FlashNewsItem[];
  onChangeTab: (tab: TabType) => void;
  onStartExam: (exam: MockExam) => void;
  onOpenChorchaAI: () => void;
  onOpenFlashNews: () => void;
  onOpenHistory: () => void;
  onOpenNewTargetModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  mockExams,
  preparationTargets,
  flashNews,
  onChangeTab,
  onStartExam,
  onOpenChorchaAI,
  onOpenFlashNews,
  onOpenHistory,
  onOpenNewTargetModal,
}) => {
  return (
    <div className="space-y-5 pb-24 px-4 pt-3 max-w-md mx-auto">
      {/* 1. User Header Banner (as shown in Screenshot 1) */}
      <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/60 shadow-md"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0b0f19] flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight leading-tight">{user.name}</h2>
            <p className="text-xs font-semibold text-emerald-400">{user.targetExam}</p>
          </div>
        </div>

        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 px-3 py-1.5 rounded-full shadow-inner">
          <Flame className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="text-xs font-bold font-mono">🔥 {user.streakDays}</span>
        </div>
      </div>

      {/* 2. Weekly Exams Carousel ("এই সপ্তাহের পরীক্ষাসমূহ") */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
            এই সপ্তাহের পরীক্ষাসমূহ
          </h3>
          <button
            onClick={() => onChangeTab('practice')}
            className="text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          >
            রুটিন দেখুন
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {mockExams.map((exam) => (
            <div
              key={exam.id}
              className="min-w-[270px] max-w-[290px] bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-lg flex flex-col justify-between relative group hover:border-emerald-500/50 transition-all"
            >
              {exam.badge && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  {exam.badge}
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold text-emerald-400">{exam.title}</p>
                <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{exam.subtitle}</h4>

                <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-rose-400 font-medium">
                    <Clock className="w-3 h-3" />
                    {exam.remainingTime}
                  </span>
                  <span>•</span>
                  <span>{exam.totalQuestions} প্রশ্ন</span>
                  <span>•</span>
                  <span>{exam.durationMinutes} মি.</span>
                </div>
              </div>

              <button
                onClick={() => onStartExam(exam)}
                className="mt-3.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50 transition-all active:scale-98"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                পরীক্ষা দিন
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 8 Quick Action Grid Buttons (Matching Screenshot 1 closely) */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={() => onChangeTab('archive')}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <FolderArchive className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">আর্কাইভ</span>
        </button>

        <button
          onClick={() => onChangeTab('practice')}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">দ্রুত প্র্যাকটিস</span>
        </button>

        <button
          onClick={() => onChangeTab('practice')}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Edit3 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">মক পরীক্ষা</span>
        </button>

        <button
          onClick={onOpenChorchaAI}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-purple-500/30 text-slate-200 transition-all active:scale-95 group relative"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-purple-300">চর্চা AI</span>
        </button>

        <button
          onClick={onOpenNewTargetModal}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">আমার প্রস্তুতি</span>
        </button>

        <button
          onClick={() => onChangeTab('qbank')}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">প্রশ্নব্যাংক</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <History className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">হিস্ট্রি</span>
        </button>

        <button
          onClick={onOpenFlashNews}
          className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Newspaper className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium text-slate-300">ফ্ল্যাশনিউজ</span>
        </button>
      </div>

      {/* 4. "আমার প্রস্তুতি" Arc Progress Section (Matching Screenshot 1) */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            আমার প্রস্তুতি
          </h3>
          <button
            onClick={onOpenNewTargetModal}
            className="text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          >
            সবগুলো দেখুন
          </button>
        </div>

        {/* Semi-circle Gauge Cards */}
        <div className="grid grid-cols-3 gap-2">
          {preparationTargets.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 flex flex-col items-center text-center justify-between min-h-[110px]"
            >
              {/* Semi-Circle Arc SVG Progress */}
              <div className="relative w-16 h-10 flex items-end justify-center overflow-hidden">
                <svg className="w-16 h-16 transform -rotate-180" viewBox="0 0 36 36">
                  <path
                    className="text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="transition-all duration-1000 ease-out text-emerald-400"
                    strokeDasharray={`${item.progressPercent * 0.5}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute bottom-0 text-xs font-bold text-white font-mono">
                  {item.progressPercent}%
                </span>
              </div>

              <p className="text-[11px] font-semibold text-slate-300 mt-1 line-clamp-2 leading-tight">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* + নতুন প্রস্তুতি যোগ করুন Button */}
        <button
          onClick={onOpenNewTargetModal}
          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          নতুন প্রস্তুতি যোগ করুন
        </button>
      </div>

      {/* 5. "আজকের ফ্ল্যাশনিউজ" Card Feed (Matching Screenshot 1) */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            আজকের ফ্ল্যাশনিউজ
          </h3>
          <button
            onClick={onOpenFlashNews}
            className="text-xs text-slate-400 hover:text-emerald-400 font-medium transition-colors"
          >
            সবগুলো দেখুন
          </button>
        </div>

        {flashNews.slice(0, 1).map((item) => (
          <div
            key={item.id}
            onClick={onOpenFlashNews}
            className="cursor-pointer bg-slate-800/80 border border-slate-700/60 rounded-xl overflow-hidden hover:border-slate-600 transition-all group"
          >
            <div className="h-28 bg-gradient-to-r from-emerald-900/60 to-slate-900 flex items-center justify-center p-4 relative">
              <Newspaper className="w-12 h-12 text-emerald-500/40 absolute right-4 bottom-2" />
              <div className="relative z-10">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/40">
              <span>{item.date}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                বিস্তারিত পড়ুন <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
