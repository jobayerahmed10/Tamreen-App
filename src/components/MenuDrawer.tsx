import React, { useState } from 'react';
import {
  X,
  User,
  Target,
  Sparkles,
  Bookmark,
  AlertCircle,
  Database,
  ShieldCheck,
  Zap,
  ChevronRight,
  Flame,
  BookOpen,
  Award,
  Settings,
  Moon,
  Sun,
  CheckCircle2,
} from 'lucide-react';
import { UserProfile } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAdmin: () => void;
  onOpenChorchaAI: () => void;
  onOpenBookmarks: () => void;
  onOpenWrongQuestions: () => void;
  onOpenFlashNews: () => void;
  onOpenSupabaseModal: () => void;
  onSelectTargetExam: (exam: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  user,
  isDarkMode,
  onToggleDarkMode,
  onOpenAdmin,
  onOpenChorchaAI,
  onOpenBookmarks,
  onOpenWrongQuestions,
  onOpenFlashNews,
  onOpenSupabaseModal,
  onSelectTargetExam,
}) => {
  if (!isOpen) return null;

  const examList = ['BCS-52', '19th NTRCA', 'Primary Assistant', 'Bank Officer'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="w-full max-w-xs bg-[#0f172a] h-full flex flex-col justify-between border-l border-slate-800 shadow-2xl p-4 overflow-y-auto no-scrollbar">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                ত
              </div>
              <div>
                <h2 className="text-base font-bold text-white">তামরীন নেভিগেশন</h2>
                <p className="text-[11px] text-slate-400">প্রতিযোগিতামূলক পরীক্ষা প্রস্তুতি</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile Card with Streak Flame Badge */}
          <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-800/40 border border-slate-700/60 flex items-center justify-between gap-2 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/60"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-white truncate leading-tight">{user.name}</h3>
                <p className="text-xs font-semibold text-emerald-400 truncate">{user.targetExam}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.university}</p>
              </div>
            </div>

            {/* Streak Pill */}
            <div className="flex items-center gap-1 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-2.5 py-1 rounded-full shadow-sm flex-shrink-0">
              <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span className="text-xs font-bold font-mono">🔥 {user.streakDays}</span>
            </div>
          </div>

          {/* Dedicated Streak Banner inside Menu */}
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-rose-950/40 via-amber-950/20 to-slate-800/60 border border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Flame className="w-5 h-5 fill-rose-500 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>দৈনিক স্ট্রিক</span>
                  <span className="text-rose-400 font-mono font-extrabold">{user.streakDays} দিন!</span>
                </div>
                <p className="text-[10px] text-slate-400">প্রতিদিন নিয়মিত পরীক্ষা দিয়ে স্ট্রিক বজায় রাখুন</p>
              </div>
            </div>
          </div>

          {/* Target Exam Selection */}
          <div className="mt-4">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              লক্ষ্য নির্বাচন (Target Exam)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {examList.map((exam) => (
                <button
                  key={exam}
                  onClick={() => onSelectTargetExam(exam)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between ${
                    user.targetExam === exam
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800 border border-slate-700/40'
                  }`}
                >
                  <span className="truncate">{exam}</span>
                  {user.targetExam === exam && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Settings & Appearance: Dark Mode & Main Features */}
          <div className="mt-5 space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1 mb-1">
              অ্যাপ সেটিং ও ফিচারসমূহ
            </label>

            {/* Dark Mode Toggle Button inside Menu */}
            <button
              onClick={onToggleDarkMode}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-all"
            >
              <div className="flex items-center gap-2.5">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
                <div className="text-left">
                  <span className="text-xs font-semibold block">ডার্ক মোড (Dark Mode)</span>
                  <span className="text-[10px] text-slate-400 block">
                    {isDarkMode ? 'সক্রিয় রয়েছে (Active)' : 'নিষ্ক্রিয় রয়েছে (Light)'}
                  </span>
                </div>
              </div>

              <div
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                  isDarkMode ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenChorchaAI();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 hover:from-purple-900/50 hover:to-indigo-900/50 text-purple-300 border border-purple-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-semibold">চর্চা AI অ্যাসিস্ট্যান্ট</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBookmarks();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium">আমার বুকমার্কসমূহ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWrongQuestions();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-medium">ভুল প্রশ্ন সংশোধন</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenFlashNews();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 text-slate-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium">আজকের ফ্ল্যাশনিউজ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Admin & DB Tools */}
          <div className="mt-5 space-y-1 pt-3 border-t border-slate-800">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1 mb-1">
              সিস্টেম ও এডমিন
            </label>

            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold">এডমিন প্যানেল & প্রশ্ন ইমপোর্ট</span>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSupabaseModal();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 text-slate-300 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium">Supabase SQL স্কিমা</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] font-semibold text-slate-400">তামরীন - Tamreen Exam Prep v2.0</p>
          <p className="text-[10px] text-slate-400 mt-0.5">সব চাকরি পরীক্ষার প্রস্তুতি এক জায়গায়</p>
        </div>
      </div>
    </div>
  );
};
