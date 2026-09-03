import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Paperclip,
  Check,
  ArrowLeft,
  Eye,
  Play,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Flag,
  Trophy,
  Sparkles,
  Download,
  Share2,
  CheckCircle2,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { ExamCategory, Question, UserProfile, ExamAttempt } from '../types';

interface ArchiveViewProps {
  categories: ExamCategory[];
  user: UserProfile;
  isDarkMode?: boolean;
  onAskAIExplanation?: (q: Question) => void;
  onFinishExam?: (attempt: ExamAttempt) => void;
}

type ArchiveViewMode = 'archive_home' | 'subcategory_list' | 'exam_detail' | 'view_questions' | 'live_exam';

interface SubExam {
  id: string;
  title: string;
  duration: string;
  questionCount: number;
  isChecked?: boolean;
}

const mockBcsExams: SubExam[] = [
  { id: 'bcs-50', title: '50th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-49', title: '49th BCS(General) Preli', duration: '২ ঘণ্টা', questionCount: 200, isChecked: true },
  { id: 'bcs-48', title: '48th BSC(Special) Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-47', title: '47th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-46', title: '46th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-45', title: '45th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-44', title: '44th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-43', title: '43rd BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-42', title: '42nd BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-41', title: '41st BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-40', title: '40th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-39', title: '39th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-38', title: '38th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-37', title: '37th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-36', title: '36th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-35', title: '35th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
  { id: 'bcs-34', title: '34th BCS Preli', duration: '২ ঘণ্টা', questionCount: 200 },
];

const archiveQuestionsSample: Question[] = [
  {
    id: 'arch-q1',
    questionText: "১. 'লুই ভাই শুরু পুঞ্জি জানা' এখানে 'ডভই' শব্দের অর্থ কী?",
    options: [
      { key: 'ক', text: 'বলে' },
      { key: 'খ', text: 'ভাবে' },
      { key: 'গ', text: 'চায়' },
      { key: 'ঘ', text: 'দেখে' },
    ],
    correctAnswerKey: 'ক',
    explanation: "'লুই ভাই শুরু পুঞ্জি জানা' চর্যাপদের প্রারম্ভিক পদ। এখানে 'ডভই' শব্দের অর্থ বলে বা প্রকাশ করে।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা সাহিত্য',
    difficulty: 'Easy',
  },
  {
    id: 'arch-q2',
    questionText: "২. 'শ্রীকৃষ্ণকীর্তন' কাব্যের অংশ নয় কোনটি?",
    options: [
      { key: 'ক', text: 'নৌকা খণ্ড' },
      { key: 'খ', text: 'হার খণ্ড' },
      { key: 'গ', text: 'রাধা বিরহ' },
      { key: 'ঘ', text: 'প্রণয় খণ্ড' },
    ],
    correctAnswerKey: 'ঘ',
    explanation: "বরু চণ্ডীদাস রচিত 'শ্রীকৃষ্ণকীর্তন' কাব্যে মোট ১৩টি খণ্ড রয়েছে। 'প্রণয় খণ্ড' নামে কোনো খণ্ড নেই।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা সাহিত্য',
    difficulty: 'Medium',
  },
  {
    id: 'arch-q3',
    questionText: "৩. 'আলালের ঘরের দুলাল' প্রথমে কোন পত্রিকায় ধারাবাহিকভাবে প্রকাশিত হয়?",
    options: [
      { key: 'ক', text: 'বিবিধার্থ সংগ্রহ' },
      { key: 'খ', text: 'সংবাদ প্রভাকর' },
      { key: 'গ', text: 'মাসিক পত্রিকা' },
      { key: 'ঘ', text: 'বঙ্গদর্শন' },
    ],
    correctAnswerKey: 'গ',
    explanation: "'আলালের ঘরের দুলাল' উপন্যাসটি প্রথম মাসিক পত্রিকা-য় প্রকাশিত হয়। এটি ১৮৫৮ সালে টেকচাঁদ ঠাকুর (প্যারীচাঁদ মিত্র) ছদ্মনামে প্রকাশিত হয়।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা সাহিত্য',
    difficulty: 'Easy',
  },
  {
    id: 'arch-q4',
    questionText: "৪. 'সকলের তরে সকলে আমরা/প্রত্যেকে আমরা পরের তরে।' কোন কবিতার অংশ?",
    options: [
      { key: 'ক', text: 'পরার্থে' },
      { key: 'খ', text: 'পাছে লোকে কিছু বলে' },
      { key: 'গ', text: 'বড় কে' },
      { key: 'ঘ', text: 'সুখ' },
    ],
    correctAnswerKey: 'ক',
    explanation: "কামিনী রায় রচিত 'পরার্থে' কবিতার বিখ্যাত চরণ: 'সকলের তরে সকলে আমরা, প্রত্যেকে আমরা পরের তরে'।" ,
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা সাহিত্য',
    difficulty: 'Easy',
  },
  {
    id: 'arch-q5',
    questionText: "৫. কাজী নজরুল ইসলামের কোন গ্রন্থটি বাজেয়াপ্ত হয়নি?",
    options: [
      { key: 'ক', text: 'অগ্নিবীণা' },
      { key: 'খ', text: 'বিষের বাঁশী' },
      { key: 'গ', text: 'ভাঙ্গার গান' },
      { key: 'ঘ', text: 'চন্দ্রবিন্দু' },
    ],
    correctAnswerKey: 'ক',
    explanation: "কাজী নজরুল ইসলামের 'অগ্নিবীণা' কাব্যগ্রন্থটি ব্রিটিশ সরকার কর্তৃক বাজেয়াপ্ত হয়নি। বিষের বাঁশী, ভাঙ্গার গান, চন্দ্রবিন্দু, প্রলয়শিখা, যুগবাণী বাজেয়াপ্ত হয়েছিল।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা সাহিত্য',
    difficulty: 'Medium',
  },
  {
    id: 'arch-q6',
    questionText: "6. Tell me frankly why you did this, the underlined part is a/an—",
    options: [
      { key: 'ক', text: 'adjective clause' },
      { key: 'খ', text: 'noun clause' },
      { key: 'গ', text: 'adverbial clause' },
      { key: 'ঘ', text: 'adverbial phrase' },
    ],
    correctAnswerKey: 'গ',
    explanation: "'why you did this' acts as an adverbial clause of reason modifying the verb 'tell'.",
    subjectId: 'english',
    subjectNameBn: 'English Language',
    difficulty: 'Medium',
  },
  {
    id: 'arch-q7',
    questionText: "7. ১০০ টাকা ১০% হারে ৫ বছরের জন্য বিনিয়োগ করা হলে, সরল ও চক্রবৃদ্ধি মুনাফার পার্থক্য কত?",
    options: [
      { key: 'ক', text: '10.05 টাকা' },
      { key: 'খ', text: '11.05 টাকা' },
      { key: 'গ', text: '12.05 টাকা' },
      { key: 'ঘ', text: '13.05 টাকা' },
    ],
    correctAnswerKey: 'খ',
    explanation: "সরল মুনাফা = ১০০×১০%×৫ = ৫০ টাকা। চক্রবৃদ্ধি মুনাফা = ১০০×(১.১)^৫ - ১০০ = ৬১.০৫ টাকা। পার্থক্য = ৬১.০৫ - ৫০ = ১১.০৫ টাকা।",
    subjectId: 'math',
    subjectNameBn: 'গাণিতিক যুক্তি',
    difficulty: 'Hard',
  },
  {
    id: 'arch-q8',
    questionText: "8. Who wrote the novella 'Heart of Darkness'?",
    options: [
      { key: 'ক', text: 'Joseph Conrad' },
      { key: 'খ', text: 'Doris Lessing' },
      { key: 'গ', text: 'John Osborne' },
      { key: 'ঘ', text: 'Thomas Hardy' },
    ],
    correctAnswerKey: 'ক',
    explanation: "'Heart of Darkness' was written by Polish-English novelist Joseph Conrad in 1899.",
    subjectId: 'english',
    subjectNameBn: 'English Literature',
    difficulty: 'Medium',
  },
  {
    id: 'arch-q9',
    questionText: "9. জুলাই শহীদ দিবস কোনটি?",
    options: [
      { key: 'ক', text: '০১ জুলাই' },
      { key: 'খ', text: '২৯ জুলাই' },
      { key: 'গ', text: '০৫ আগস্ট' },
      { key: 'ঘ', text: '১৬ জুলাই' },
    ],
    correctAnswerKey: 'গ',
    explanation: "বৈষম্যবিরোধী ছাত্র আন্দোলনে ০৫ আগস্ট বিপ্লব ও ছাত্র-জনতার বিজয় অর্জিত হয়।",
    subjectId: 'bangladesh',
    subjectNameBn: 'বাংলাদেশ বিষয়াবলি',
    difficulty: 'Easy',
  },
];

const mockLeaderboard = [
  { rank: 1, name: 'MD KHALID', score: 198, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
  { rank: 2, name: 'Saddem', uni: 'National University Bangladesh', score: 184.5, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100' },
  { rank: 3, name: 'SHAMIM', uni: 'Jatiya Kabi Kazi Nazrul Isla...', score: 174.5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' },
  { rank: 4, name: 'Lubna Iqbal', uni: 'Northern university of busine...', score: 162, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { rank: 5, name: 'sajjad', uni: 'National University Bangladesh...', score: 161.5, avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100' },
];

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  categories,
  user,
  isDarkMode = false,
  onAskAIExplanation,
  onFinishExam,
}) => {
  const [viewMode, setViewMode] = useState<ArchiveViewMode>('archive_home');
  const [searchTerm, setSearchTerm] = useState('');
  const [subSearchTerm, setSubSearchTerm] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState<{ id: string; title: string }>({ id: 'bcs-preli', title: 'BCS Preli' });
  const [selectedExam, setSelectedExam] = useState<SubExam>(mockBcsExams[1]); // Default 49th BCS
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [subCatActiveTab, setSubCatActiveTab] = useState<'exam' | 'topic' | 'practice'>('exam');

  // Question reader state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Live Exam state
  const [timerSeconds, setTimerSeconds] = useState(7200); // 120 mins
  const [liveAnswers, setLiveAnswers] = useState<Record<string, string>>({});
  const [attemptsHistory, setAttemptsHistory] = useState<Array<{ id: number; marks: number; pos: number; date: string }>>([
    { id: 1, marks: 0, pos: 472, date: '২ সেপ্টেম্বর ২০২৬' },
    { id: 2, marks: 0, pos: 472, date: '২ সেপ্টেম্বর ২০২৬' },
  ]);

  const categorySectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    let interval: any;
    if (viewMode === 'live_exam') {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [viewMode]);

  const handleSelectSubCategoryCard = (subCatId: string, title: string) => {
    setSelectedSubCat({ id: subCatId, title: title });
    setViewMode('subcategory_list');
  };

  const handleSelectExamFromList = (exam: SubExam) => {
    setSelectedExam(exam);
    setViewMode('exam_detail');
  };

  const handleFilterPillClick = (catId: string) => {
    setActiveFilter(catId);
    if (catId !== 'all' && categorySectionRefs.current[catId]) {
      categorySectionRefs.current[catId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUserSelectOption = (questionId: string, optionKey: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    // Automatically expand explanation upon answer attempt
    setExpandedExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleLiveAnswerSelect = (qId: string, optionKey: string) => {
    setLiveAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmitLiveExam = () => {
    // Calculate score
    let score = 0;
    archiveQuestionsSample.forEach((q) => {
      if (liveAnswers[q.id] === q.correctAnswerKey) {
        score += 1;
      } else if (liveAnswers[q.id]) {
        score -= 0.25;
      }
    });

    const newAttempt = {
      id: Date.now(),
      marks: Math.max(0, score),
      pos: Math.floor(Math.random() * 200) + 10,
      date: '৩ সেপ্টেম্বর ২০২৬',
    };

    setAttemptsHistory((prev) => [newAttempt, ...prev]);

    if (onFinishExam) {
      onFinishExam({
        id: `arch-exam-${Date.now()}`,
        examTitle: selectedExam.title,
        date: '৩ সেপ্টেম্বর ২০২৬',
        totalQuestions: archiveQuestionsSample.length,
        score: score,
        correct: score > 0 ? score : 0,
        wrong: 0,
        skipped: archiveQuestionsSample.length - Object.keys(liveAnswers).length,
        accuracy: 80,
        timeSpentSeconds: 7200 - timerSeconds,
        wrongQuestions: [],
      });
    }

    setViewMode('exam_detail');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filterTabs = [
    { id: 'bcs-cat', label: 'বিসিএস' },
    { id: 'teacher-cat', label: 'টিচার রিক্রুটমেন্ট' },
    { id: 'bank-cat', label: 'ব্যাংক জব' },
    { id: 'iba-cat', label: 'আইবিএ' },
    { id: 'grade-9-20', label: '৯-২০ গ্রেড' },
    { id: 'others-cat', label: 'অন্যান্য' },
  ];

  // 1. ROOT ARCHIVE HOME VIEW (Matching Video 00:13 - 00:21)
  if (viewMode === 'archive_home') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto transition-colors">
        {/* Top Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="প্রশ্নব্যাংক খুঁজুন"
            className={`w-full rounded-2xl pl-10 pr-9 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xs ${
              isDarkMode
                ? 'bg-slate-800/90 border border-slate-700/80 text-white placeholder-slate-400'
                : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400 shadow-xs'
            }`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Group List */}
        <div className="space-y-5">
          {categories.map((cat) => {
            if (
              activeFilter !== 'all' &&
              activeFilter !== cat.id &&
              !searchTerm.trim()
            ) {
              return null;
            }

            const matchingItems = cat.items.filter((item) =>
              item.titleBn.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm.trim() && matchingItems.length === 0) return null;

            return (
              <div
                key={cat.id}
                ref={(el) => (categorySectionRefs.current[cat.id] = el)}
                className="space-y-2.5"
              >
                <h3
                  className={`text-sm font-extrabold tracking-wide px-1 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  {cat.titleBn}
                </h3>

                {/* 2-Column Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(searchTerm.trim() ? matchingItems : cat.items).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSubCategoryCard(item.id, item.titleBn)}
                      className={`bg-gradient-to-br ${item.color} p-4 rounded-3xl cursor-pointer hover:scale-[1.02] active:scale-98 transition-all shadow-md relative flex flex-col justify-between min-h-[125px] group text-white border border-white/10`}
                    >
                      {/* Top Checkmark Badge */}
                      {item.badgeText === 'checked' && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500/30 backdrop-blur-md flex items-center justify-center text-emerald-300 border border-emerald-400/30">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Card Title */}
                      <h4 className="text-sm font-black leading-snug tracking-tight drop-shadow-xs pr-4">
                        {item.titleBn}
                      </h4>

                      {/* Bottom Pin Badge */}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[11px] bg-white/20 backdrop-blur-md text-white font-bold px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-2xs">
                          <Paperclip className="w-3 h-3 rotate-45" /> {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Filter Pills Bar (Matching Video 00:14) */}
        <div className="sticky bottom-16 md:bottom-2 z-20 py-2 backdrop-blur-md bg-transparent border-t border-slate-500/20">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterPillClick(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs active:scale-95 ${
                  activeFilter === tab.id
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-500/50'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 border border-slate-300/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. SUBCATEGORY EXAM LIST VIEW (Matching Video 00:22 - 00:29)
  if (viewMode === 'subcategory_list') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto transition-colors">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setViewMode('archive_home')}
              className={`p-1.5 rounded-xl transition-all ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {selectedSubCat.title}
            </h2>
          </div>

          <button className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input inside Subcategory */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={subSearchTerm}
            onChange={(e) => setSubSearchTerm(e.target.value)}
            placeholder="পরীক্ষা খুঁজে বের করুন"
            className={`w-full rounded-2xl pl-10 pr-9 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
              isDarkMode
                ? 'bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400'
                : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400 shadow-2xs'
            }`}
          />
        </div>

        {/* Exams List */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {mockBcsExams
            .filter((e) => e.title.toLowerCase().includes(subSearchTerm.toLowerCase()))
            .map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleSelectExamFromList(exam)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between hover:border-emerald-500/60 group shadow-2xs ${
                  isDarkMode
                    ? 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-900'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold tracking-tight group-hover:text-emerald-500 transition-colors">
                    {exam.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium mt-1">
                    <span className="flex items-center gap-1 text-rose-400 font-semibold">
                      <Clock className="w-3 h-3" /> {exam.duration}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                      <FileText className="w-3 h-3" /> {exam.questionCount}টি প্রশ্ন
                    </span>
                  </div>
                </div>

                {exam.isChecked && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                    checked <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            ))}
        </div>

        {/* Bottom Tab Bar inside Subcategory view (Matching Video 00:23) */}
        <div className={`flex justify-around p-1 rounded-2xl border ${
          isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setSubCatActiveTab('exam')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              subCatActiveTab === 'exam'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            পরীক্ষা
          </button>
          <button
            onClick={() => setSubCatActiveTab('topic')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              subCatActiveTab === 'topic'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            টপিক ভিত্তিক প্রশ্ন
          </button>
          <button
            onClick={() => setSubCatActiveTab('practice')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              subCatActiveTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            প্র্যাকটিস
          </button>
        </div>
      </div>
    );
  }

  // 3. EXAM DETAIL SUMMARY VIEW (Matching Video 00:30 - 00:36)
  if (viewMode === 'exam_detail') {
    return (
      <div className="space-y-5 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto transition-colors">
        {/* Header Bar */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-500/20">
          <button
            onClick={() => setViewMode('subcategory_list')}
            className={`p-1.5 rounded-xl transition-all ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {selectedExam.title}
          </h2>
        </div>

        {/* Top Metadata Badge */}
        <div className="flex items-center justify-center gap-6 text-sm font-bold py-2 px-4 bg-slate-500/10 rounded-2xl border border-slate-500/20">
          <span className="flex items-center gap-1.5 text-rose-500">
            <Clock className="w-4 h-4" /> {selectedExam.duration}
          </span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center gap-1.5 text-emerald-500">
            <FileText className="w-4 h-4" /> {selectedExam.questionCount}টি প্রশ্ন
          </span>
        </div>

        {/* Topics Accordion preview */}
        <div className={`p-3.5 rounded-2xl border space-y-2 ${
          isDarkMode ? 'bg-slate-800/40 border-slate-700/80 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
        }`}>
          <div className="text-xs font-semibold text-slate-400 mb-1">পরীক্ষার টপিক ও রিসোর্সসমূহ</div>
          <div className="flex items-center justify-between text-xs font-bold py-1 border-b border-slate-500/10">
            <span className="flex items-center gap-2 text-rose-400">🎯 Bangla</span>
            <span className="text-slate-400">১০ টি প্রশ্ন v</span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold py-1">
            <span className="flex items-center gap-2 text-sky-400">🎯 General Knowledge</span>
            <span className="text-slate-400">১০ টি প্রশ্ন v</span>
          </div>
        </div>

        {/* Primary Action Buttons (Matching Video 00:31) */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => setViewMode('live_exam')}
            className="w-full bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 text-sm transition-all"
          >
            পরীক্ষা শুরু করুন
          </button>

          <button
            onClick={() => setViewMode('view_questions')}
            className="w-full border-2 border-emerald-600 hover:bg-emerald-600/10 active:scale-98 text-emerald-600 dark:text-emerald-400 font-extrabold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all"
          >
            <Eye className="w-4 h-4" /> প্রশ্ন দেখুন
          </button>
        </div>

        {/* "আমার প্রস্তুতিসমূহ" Attempt History (Matching Video 00:31) */}
        <div className="space-y-2.5">
          <h3 className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            আমার প্রস্তুতিসমূহ
          </h3>

          <div className="space-y-2">
            {attemptsHistory.map((att, idx) => (
              <div
                key={att.id}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-slate-400 text-[11px] block">প্রাপ্ত মার্কস</span>
                    <span className="font-bold text-emerald-500 text-sm">{att.marks}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] block">পজিশন</span>
                  <span className="font-bold">{att.pos}</span>
                </div>

                <div className="text-right text-slate-400 text-[11px]">
                  {att.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "লিডারবোর্ড" Section (Matching Video 00:32) */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Trophy className="w-4 h-4 text-amber-500" /> লিডারবোর্ড
            </h3>
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              →
            </span>
          </div>

          <div className="space-y-2">
            {mockLeaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/60 border-slate-700/80 text-white'
                    : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold">{item.name}</h4>
                    {item.uni && <p className="text-[10px] text-slate-400 font-medium">{item.uni}</p>}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-500 font-black text-sm">#{item.rank}</span>
                  <p className="text-[10px] text-slate-400 font-bold">{item.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. QUESTION READER VIEW ("প্রশ্ন দেখুন") (Matching Video 00:41 - 01:02)
  if (viewMode === 'view_questions') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto transition-colors">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setViewMode('exam_detail')}
              className={`p-1.5 rounded-xl transition-all ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className={`text-base font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {selectedExam.title}
            </h2>
          </div>

          <button className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Exam Instructions Banner (Matching Video 00:43) */}
        <div className="bg-slate-500/10 p-3 rounded-2xl border border-slate-500/20 text-center space-y-1">
          <div className="text-xs font-bold text-slate-400">সময়: 120 মিনিট</div>
          <div className="text-[11px] text-slate-400 leading-tight">
            প্রতিটি প্রশ্নের পূর্ণমান প্রশ্নের পাশে লেখা আছে এবং ভুলপ্রতির জন্য 0.25 মার্ক কাটা যাবে
          </div>
        </div>

        {/* Subject Header */}
        <h3 className="text-sm font-black text-slate-400 tracking-wide pt-1">
          বাংলা সাহিত্য (22)
        </h3>

        {/* Questions List */}
        <div className="space-y-4">
          {archiveQuestionsSample.map((q, qIndex) => {
            const selectedOpt = userAnswers[q.id];

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border space-y-3 transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/80 border-slate-700 text-white'
                    : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                }`}
              >
                {/* Question Header & Points */}
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs font-extrabold leading-relaxed">
                    {q.questionText}
                  </h4>
                  <span className="w-5 h-5 rounded-full bg-slate-500/20 text-slate-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = selectedOpt === opt.key;
                    const isCorrect = q.correctAnswerKey === opt.key;

                    let btnStyle = isDarkMode
                      ? 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                    if (selectedOpt) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-500 font-bold ring-1 ring-emerald-500/30';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-500 font-bold ring-1 ring-rose-500/30';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleUserSelectOption(q.id, opt.key)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center gap-2.5 transition-all ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Expandable "AI ব্যাখ্যা v" Button (Matching Video 00:53) */}
                {selectedOpt && (
                  <div className="pt-1 space-y-2">
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI ব্যাখ্যা</span>
                      {expandedExplanations[q.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {expandedExplanations[q.id] && (
                      <div className={`p-3 rounded-xl text-xs leading-relaxed border animate-fadeIn ${
                        isDarkMode ? 'bg-slate-900/90 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Bottom Controls (Bookmark & Flag) */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-500/10 text-slate-400">
                  <button className="hover:text-amber-400 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="hover:text-rose-400 transition-colors">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. LIVE EXAM INTERFACE ("পরীক্ষা শুরু করুন") (Matching Video 01:05 - 01:21)
  if (viewMode === 'live_exam') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto transition-colors">
        {/* Fixed Top Exam Control Bar */}
        <div className="sticky top-14 z-30 p-3 rounded-2xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 flex items-center justify-between shadow-lg text-white">
          <div className="flex items-center gap-2 font-mono font-black text-sm text-emerald-400">
            <Clock className="w-4 h-4" /> {formatTimer(timerSeconds)}
          </div>

          <button
            onClick={handleSubmitLiveExam}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold px-4 py-1.5 rounded-xl text-xs shadow-md transition-all"
          >
            সাবমিট করুন
          </button>

          <div className="bg-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30">
            {Object.keys(liveAnswers).length}/{archiveQuestionsSample.length}
          </div>
        </div>

        {/* Notice */}
        <div className="bg-slate-500/10 p-3 rounded-2xl border border-slate-500/20 text-center text-xs text-slate-400 font-semibold">
          সময়: 120 মিনিট | প্রতিটি প্রশ্নের মান ১.০, ভুল উত্তরের জন্য ০.২৫ কাটা যাবে
        </div>

        {/* Live Questions List */}
        <div className="space-y-4">
          {archiveQuestionsSample.map((q, qIdx) => (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <h4 className="text-xs font-extrabold leading-relaxed">{q.questionText}</h4>
                <span className="w-5 h-5 rounded-full bg-slate-500/20 text-slate-400 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                  1
                </span>
              </div>

              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = liveAnswers[q.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleLiveAnswerSelect(q.id, opt.key)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center gap-2.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500 ring-2 ring-emerald-400/40'
                          : isDarkMode
                          ? 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-extrabold">
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
