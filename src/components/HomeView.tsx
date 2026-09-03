import React, { useState } from 'react';
import {
  FolderArchive,
  Zap,
  Edit3,
  Sparkles,
  Target,
  BookOpenCheck,
  History,
  Newspaper,
  Clock,
  Play,
  Plus,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Bookmark,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, MockExam, PreparationTarget, FlashNewsItem } from '../types';
import { TabType } from './BottomNavigation';

interface HomeViewProps {
  user: UserProfile;
  mockExams: MockExam[];
  preparationTargets: PreparationTarget[];
  flashNews: FlashNewsItem[];
  isDarkMode?: boolean;
  onChangeTab: (tab: TabType) => void;
  onStartExam: (exam: MockExam) => void;
  onOpenChorchaAI: () => void;
  onOpenFlashNews: () => void;
  onOpenHistory: () => void;
  onOpenNewTargetModal: () => void;
}

// Sample daily MCQ questions including the exact one requested from screenshot
const dailyQuestions = [
  {
    id: 'mcq-1',
    question: 'এস ওয়াজেদ আলী সম্পাদিত পত্রিকা ছিল কোনটি?',
    options: [
      { key: 'ক', text: 'দৈনিক স্টেটস্ম্যান' },
      { key: 'খ', text: 'গুলিস্তাাঁ' },
      { key: 'গ', text: 'দৈনিক মিল্লাত' },
      { key: 'ঘ', text: 'দৈনিক আজাদ' },
    ],
    correctKey: 'গ',
    explanation: "এস ওয়াজেদ আলী কর্তৃক ১৯৪১ সালে কোলকাতা থেকে 'দৈনিক মিল্লাত' পত্রিকা প্রকাশিত ও সম্পাদিত হয়। এটি মূলত একটি প্রগতিশীল সাহিত্য ও রাজনীতি বিষয়ক পত্রিকা ছিল।",
  },
  {
    id: 'mcq-2',
    question: 'চর্যাপদের সবচেয়ে বেশি পদ কে রচনা করেছেন?',
    options: [
      { key: 'ক', text: 'লুইপা' },
      { key: 'খ', text: 'কুক্কুরীপা' },
      { key: 'গ', text: 'কাহ্নপা' },
      { key: 'ঘ', text: 'ভুসুকুপা' },
    ],
    correctKey: 'গ',
    explanation: 'চর্যাপদের ২৪ জন পদকর্তার মধ্যে সবচেয়ে বেশি ১৩টি পদ রচনা করেন কাহ্নপা।',
  },
  {
    id: 'mcq-3',
    question: 'বাংলাদেশের একমাত্র সামুদ্রিক প্রবাল দ্বীপ কোনটি?',
    options: [
      { key: 'ক', text: 'সেন্টমার্টিন' },
      { key: 'খ', text: 'মহেশখালী' },
      { key: 'গ', text: 'সন্দ্বীপ' },
      { key: 'ঘ', text: 'হাতিয়া' },
    ],
    correctKey: 'ক',
    explanation: 'কক্সবাজার জেলার টেকনাফ উপজেলায় অবস্থিত সেন্টমার্টিন দ্বীপ হলো বাংলাদেশের একমাত্র সামুদ্রিক প্রবাল দ্বীপ।',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  mockExams,
  preparationTargets,
  flashNews,
  isDarkMode = false,
  onChangeTab,
  onStartExam,
  onOpenChorchaAI,
  onOpenFlashNews,
  onOpenHistory,
  onOpenNewTargetModal,
}) => {
  // State for daily interactive MCQ question
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});

  const currentMcq = dailyQuestions[currentQuestionIdx];
  const selectedKey = selectedAnswers[currentMcq.id];
  const isAnswered = Boolean(selectedKey);
  const isCorrect = selectedKey === currentMcq.correctKey;

  const handleOptionClick = (key: string) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentMcq.id]: key }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIdx((prev) => (prev + 1) % dailyQuestions.length);
  };

  const toggleBookmark = (id: string) => {
    setIsBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Dynamic theme styling helper variables
  const cardContainerClass = isDarkMode
    ? 'bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3'
    : 'bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs';

  const headingTextClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const mutedTextClass = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const gridBtnClass = isDarkMode
    ? 'flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 text-slate-200 transition-all active:scale-95 group'
    : 'flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#f1f5f9] hover:bg-slate-200/80 border border-slate-200/80 text-slate-900 font-bold transition-all active:scale-95 group shadow-2xs';

  return (
    <div className="space-y-5 md:space-y-6 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto">
      {/* 1. Weekly Exams Carousel ("এই সপ্তাহের পরীক্ষাসমূহ") */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className={`text-sm font-bold flex items-center gap-1.5 ${headingTextClass}`}>
            এই সপ্তাহের পরীক্ষাসমূহ
          </h3>
          <button
            onClick={() => onChangeTab('practice')}
            className={`text-xs font-medium transition-colors ${mutedTextClass} hover:text-emerald-500`}
          >
            রুটিন দেখুন
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {mockExams.map((exam) => (
            <div
              key={exam.id}
              className={`min-w-[270px] max-w-[290px] rounded-2xl p-3.5 shadow-md flex flex-col justify-between relative group transition-all ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50'
                  : 'bg-white border border-slate-200/90 hover:border-emerald-500/50 shadow-xs'
              }`}
            >
              {exam.badge && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  {exam.badge}
                </div>
              )}

              <div>
                <p className="text-[11px] font-semibold text-emerald-600">{exam.title}</p>
                <h4 className={`text-sm font-bold mt-0.5 line-clamp-1 ${headingTextClass}`}>{exam.subtitle}</h4>

                <div className={`flex items-center gap-2 mt-2 text-[11px] ${mutedTextClass}`}>
                  <span className="flex items-center gap-1 text-rose-500 font-medium">
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
                className="mt-3.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all active:scale-98"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                পরীক্ষা দিন
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 8 Quick Action Grid Buttons (Responsive 4 cols on mobile, 8 cols on desktop) */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2.5 md:gap-3">
        <button onClick={() => onChangeTab('archive')} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
            <FolderArchive className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>আর্কাইভ</span>
        </button>

        <button onClick={() => onChangeTab('practice')} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
            <Zap className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>দ্রুত প্র্যাকটিস</span>
        </button>

        <button onClick={() => onChangeTab('practice')} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700'}`}>
            <Edit3 className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>মক পরীক্ষা</span>
        </button>

        <button onClick={onOpenChorchaAI} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>চর্চা AI</span>
        </button>

        <button onClick={onOpenNewTargetModal} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
            <Target className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>আমার প্রস্তুতি</span>
        </button>

        <button onClick={() => onChangeTab('qbank')} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700'}`}>
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>প্রশ্নব্যাংক</span>
        </button>

        <button onClick={onOpenHistory} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-700'}`}>
            <History className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>হিস্ট্রি</span>
        </button>

        <button onClick={onOpenFlashNews} className={gridBtnClass}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'}`}>
            <Newspaper className="w-5 h-5" />
          </div>
          <span className={`text-[11px] ${isDarkMode ? 'text-slate-300 font-medium' : 'text-slate-800 font-bold'}`}>ফ্ল্যাশনিউজ</span>
        </button>
      </div>

      {/* 3. "আমার প্রস্তুতি" Arc Progress Section */}
      <div className={cardContainerClass}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold flex items-center gap-1.5 ${headingTextClass}`}>
            আমার প্রস্তুতি
          </h3>
          <button
            onClick={onOpenNewTargetModal}
            className={`text-xs font-medium transition-colors ${mutedTextClass} hover:text-emerald-500`}
          >
            সবগুলো দেখুন
          </button>
        </div>

        {/* Semi-circle Gauge Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {preparationTargets.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-2.5 flex flex-col items-center text-center justify-between min-h-[110px] border ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="relative w-16 h-10 flex items-end justify-center overflow-hidden">
                <svg className="w-16 h-16 transform -rotate-180" viewBox="0 0 36 36">
                  <path
                    className={isDarkMode ? 'text-slate-700' : 'text-slate-200'}
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="transition-all duration-1000 ease-out text-emerald-500"
                    strokeDasharray={`${item.progressPercent * 0.5}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className={`absolute bottom-0 text-xs font-bold font-mono ${headingTextClass}`}>
                  {item.progressPercent}%
                </span>
              </div>

              <p className={`text-[11px] font-semibold mt-1 line-clamp-2 leading-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onOpenNewTargetModal}
          className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 rounded-xl py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          নতুন প্রস্তুতি যোগ করুন
        </button>
      </div>

      {/* 4. "আজকের ফ্ল্যাশনিউজ" Card Feed */}
      <div className={cardContainerClass}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold flex items-center gap-1.5 ${headingTextClass}`}>
            আজকের ফ্ল্যাশনিউজ
          </h3>
          <button
            onClick={onOpenFlashNews}
            className={`text-xs font-medium transition-colors ${mutedTextClass} hover:text-emerald-500`}
          >
            সবগুলো দেখুন
          </button>
        </div>

        {flashNews.slice(0, 1).map((item) => (
          <div
            key={item.id}
            onClick={onOpenFlashNews}
            className={`cursor-pointer rounded-xl overflow-hidden border transition-all group ${
              isDarkMode
                ? 'bg-slate-800/80 border-slate-700/60 hover:border-slate-600'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="h-28 bg-gradient-to-r from-emerald-800/80 to-teal-900 flex items-center justify-center p-4 relative">
              <Newspaper className="w-12 h-12 text-emerald-400/30 absolute right-4 bottom-2" />
              <div className="relative z-10">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-white mt-1.5 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
            <div className={`p-3 flex items-center justify-between text-[11px] border-t ${
              isDarkMode ? 'border-slate-700/40 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>{item.date}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                বিস্তারিত পড়ুন <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Interactive MCQ Question Section */}
      <div className={cardContainerClass}>
        <div className={`flex items-center justify-between border-b pb-2.5 ${isDarkMode ? 'border-slate-700/40' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className={`text-sm font-bold ${headingTextClass}`}>আজকের চর্চা প্রশ্ন (MCQ)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(currentMcq.id)}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked[currentMcq.id]
                  ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                  : isDarkMode
                  ? 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200'
              }`}
              title="বুকমার্ক করুন"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {currentQuestionIdx + 1}/{dailyQuestions.length}
            </span>
          </div>
        </div>

        {/* Question Title */}
        <div className="pt-1">
          <h4 className={`text-base font-bold leading-relaxed ${headingTextClass}`}>
            {currentMcq.question}
          </h4>
        </div>

        {/* MCQ Options matching screenshot design (ক, খ, গ, ঘ) */}
        <div className="space-y-2 pt-1">
          {currentMcq.options.map((opt) => {
            const isOptSelected = selectedKey === opt.key;
            const isOptCorrect = currentMcq.correctKey === opt.key;

            let cardStyle = isDarkMode
              ? 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
              : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50 shadow-2xs';
            let circleStyle = isDarkMode
              ? 'bg-slate-700/60 text-slate-300 border-slate-600/50'
              : 'bg-slate-100 text-slate-700 border-slate-300/80';

            if (isAnswered) {
              if (isOptCorrect) {
                cardStyle = isDarkMode
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                circleStyle = 'bg-emerald-500 text-white border-emerald-400 font-bold';
              } else if (isOptSelected && !isOptCorrect) {
                cardStyle = isDarkMode
                  ? 'bg-rose-500/20 border-rose-500/60 text-rose-200 font-semibold'
                  : 'bg-rose-50 border-rose-500 text-rose-900 font-semibold';
                circleStyle = 'bg-rose-500 text-white border-rose-400 font-bold';
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleOptionClick(opt.key)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all active:scale-[0.99] ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${circleStyle}`}
                  >
                    {opt.key}
                  </div>
                  <span className="text-sm">{opt.text}</span>
                </div>

                {isAnswered && isOptCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                )}
                {isAnswered && isOptSelected && !isOptCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation & AI Assistant Action */}
        {isAnswered && (
          <div className={`mt-3 p-3.5 border rounded-xl space-y-2.5 animate-in fade-in ${
            isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  isCorrect
                    ? 'bg-emerald-500/20 text-emerald-700 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-700 border-rose-500/40'
                }`}
              >
                {isCorrect ? '✓ সঠিক উত্তর!' : '✕ ভুল উত্তর'}
              </span>

              <button
                onClick={onOpenChorchaAI}
                className="text-xs text-purple-600 font-bold flex items-center gap-1 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-lg transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                AI ব্যাখ্যা দেখুন
              </button>
            </div>

            <p className={`text-xs leading-relaxed pt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <span className={`font-bold ${headingTextClass}`}>ব্যাখ্যা: </span>
              {currentMcq.explanation}
            </p>

            <button
              onClick={handleNextQuestion}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>পরবর্তী প্রশ্ন দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

