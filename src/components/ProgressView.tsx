import React, { useState } from 'react';
import {
  Star,
  Edit2,
  Trophy,
  Flame,
  ChevronDown,
  ChevronUp,
  Share2,
  Settings,
  Bell,
  Award,
  TrendingUp,
} from 'lucide-react';
import { UserProfile, Subject } from '../types';

interface ProgressViewProps {
  user: UserProfile;
  subjects: Subject[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user, subjects }) => {
  const [openSubjectAccordion, setOpenSubjectAccordion] = useState<string | null>('current-affairs');

  const toggleAccordion = (id: string) => {
    setOpenSubjectAccordion(openSubjectAccordion === id ? null : id);
  };

  // Mock weekly point data matching Screenshot 6
  const weeklyData = [
    { day: '30 S', value: 0 },
    { day: '31 M', value: 0 },
    { day: '1 T', value: 3.0 },
    { day: '2 W', value: 0 },
    { day: '3 T', value: 0 },
    { day: '4 F', value: 0 },
    { day: '5 S', value: 0 },
  ];

  return (
    <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
      {/* User Banner Header (Matching Screenshot 6) */}
      <div className="bg-gradient-to-b from-emerald-600/30 via-emerald-950/20 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden">
        {/* Top Header Actions */}
        <div className="flex items-center justify-end gap-2 text-slate-300">
          <button className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-slate-300" />
          </button>
          <button className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center">
            <Settings className="w-4 h-4 text-slate-300" />
          </button>
          <button className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-slate-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
        </div>

        {/* User Large Avatar */}
        <div className="relative inline-block">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500/60 shadow-xl mx-auto"
          />
          <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full text-xs shadow-md">
            <Award className="w-4 h-4" />
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">{user.name}</h2>
          <p className="text-xs text-emerald-400 font-medium mt-0.5">
            {user.targetExam} from {user.university || 'University of Dhaka'}
          </p>
        </div>

        {/* 4 Stats Cards Row (Matching Screenshot 6) */}
        <div className="grid grid-cols-4 gap-1.5 pt-2">
          <div className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl text-center">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white font-mono">{user.totalPoints}</p>
            <p className="text-[10px] text-slate-400">পয়েন্ট</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl text-center">
            <Edit2 className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white font-mono">{user.testsTaken}</p>
            <p className="text-[10px] text-slate-400">পরীক্ষা</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl text-center">
            <Trophy className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-white font-mono">{user.rank}</p>
            <p className="text-[10px] text-slate-400">র‍্যাংক</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-xl text-center">
            <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400 mx-auto mb-1 animate-pulse" />
            <p className="text-xs font-bold text-white font-mono">{user.streakDays}</p>
            <p className="text-[10px] text-slate-400">স্ট্রিক</p>
          </div>
        </div>
      </div>

      {/* "দৈনিক পয়েন্ট" Line Chart Section (Matching Screenshot 6) */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">দৈনিক পয়েন্ট</h3>
            <p className="text-[11px] text-slate-400">আগস্ট ৩০ - সেপ্ট ৫</p>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
            ৩.০০ পয়েন্ট
          </span>
        </div>

        {/* Custom Point Chart Visualization */}
        <div className="pt-4 pb-2 px-2">
          <div className="flex items-end justify-between h-28 border-b border-slate-700/60 pb-2 relative">
            {/* Value Line */}
            <div className="absolute left-0 right-0 top-1/2 border-b border-dashed border-slate-700/50" />

            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 z-10">
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {d.value > 0 ? `${d.value}` : ''}
                </span>

                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-3.5 rounded-t-full transition-all duration-700 ${
                      d.value > 0
                        ? 'bg-gradient-to-t from-amber-500 to-yellow-300 h-16 ring-2 ring-amber-400/40 shadow-lg'
                        : 'bg-slate-700/50 h-2'
                    }`}
                  />
                  {d.value > 0 && (
                    <div className="w-2.5 h-2.5 bg-yellow-300 rounded-full absolute -top-1 shadow" />
                  )}
                </div>

                <span
                  className={`text-[10px] font-medium ${
                    d.value > 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "সাবজেক্ট ভিত্তিক রিপোর্ট" Accordion List (Matching Screenshot 6) */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
        <h3 className="text-sm font-bold text-white">সাবজেক্ট ভিত্তিক রিপোর্ট</h3>

        <div className="space-y-2">
          {subjects.map((sub) => {
            const isOpen = openSubjectAccordion === sub.id;

            return (
              <div
                key={sub.id}
                className="bg-slate-800/80 border border-slate-700/60 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(sub.id)}
                  className="w-full p-3 flex items-center justify-between text-xs font-bold text-white hover:bg-slate-700/40 transition-colors"
                >
                  <span className="truncate">{sub.nameBn}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-emerald-400 font-mono">{sub.progressPercent}%</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Progress Bar under header */}
                <div className="w-full bg-slate-700/40 h-1">
                  <div
                    className="bg-emerald-500 h-1 transition-all duration-500"
                    style={{ width: `${sub.progressPercent}%` }}
                  />
                </div>

                {isOpen && (
                  <div className="p-3 bg-slate-900/60 text-[11px] text-slate-300 space-y-2 border-t border-slate-700/40 animate-in fade-in">
                    <div className="flex justify-between">
                      <span className="text-slate-400">মোট প্রশ্ন প্রস্তুত:</span>
                      <span className="font-semibold text-white">{sub.questionCount}টি</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">আপনার সমাধানকৃত:</span>
                      <span className="font-semibold text-emerald-400">
                        {Math.round((sub.questionCount * sub.progressPercent) / 100)}টি
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">সঠিকের হার (Accuracy):</span>
                      <span className="font-semibold text-emerald-400">৭৮%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
