import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Play,
  Clock,
  Swords,
  Zap,
  CheckCircle2,
  XCircle,
  Info,
  Plus
} from 'lucide-react';
import { Question, UserProfile } from '../types';

interface PracticeViewProps {
  user?: UserProfile;
  isDarkMode?: boolean;
  onAskAIExplanation?: (q: Question) => void;
}

type PracticeModeType =
  | 'main'
  | 'topic_select'
  | 'confirm_setup'
  | 'mock_test_running'
  | 'mock_test_result'
  | 'quick_subtopics'
  | 'quick_modal'
  | 'quick_running'
  | 'quick_result';

interface SubjectItem {
  id: string;
  titleBn: string;
  hasProgress?: boolean;
  subtopics: {
    id: string;
    titleBn: string;
    items: { id: string; titleBn: string; countStr: string }[];
  }[];
}

const subjectsList: SubjectItem[] = [
  {
    id: 'current_affairs',
    titleBn: 'কারেন্ট অ্যাফেয়ার্স',
    hasProgress: true,
    subtopics: [
      {
        id: 'ca_sub_1',
        titleBn: 'বাংলাদেশ বিষয়ক',
        items: [
          { id: 'ca_1_1', titleBn: 'বাজেট স্পেশাল', countStr: '0/28' },
          { id: 'ca_1_2', titleBn: 'আগস্ট ২০২৬', countStr: '0/26' },
          { id: 'ca_1_3', titleBn: 'জুলাই ২০২৬', countStr: '0/25' },
          { id: 'ca_1_4', titleBn: 'মে ২০২৬', countStr: '0/8' },
          { id: 'ca_1_5', titleBn: 'ফেব্রুয়ারি ২০২৬', countStr: '16/28' },
          { id: 'ca_1_6', titleBn: 'জুন ২০২৬', countStr: '0/11' },
          { id: 'ca_1_7', titleBn: 'নভেম্বর ২০২৫', countStr: '0/7' },
          { id: 'ca_1_8', titleBn: 'মার্চ ২০২৬', countStr: '22/22' },
          { id: 'ca_1_9', titleBn: 'এপ্রিল ২০২৬', countStr: '19/19' },
          { id: 'ca_1_10', titleBn: 'অক্টোবর ২০২৫', countStr: '0/19' },
        ],
      },
      {
        id: 'ca_sub_2',
        titleBn: 'আন্তর্জাতিক বিষয়ক',
        items: [
          { id: 'ca_2_1', titleBn: 'আগস্ট ২০২৬', countStr: '0/32' },
          { id: 'ca_2_2', titleBn: 'জুলাই ২০২৬', countStr: '0/15' },
          { id: 'ca_2_3', titleBn: 'ফেব্রুয়ারি ২০২৬', countStr: '0/32' },
          { id: 'ca_2_4', titleBn: 'জুন ২০২৬', countStr: '0/11' },
        ],
      },
    ],
  },
  {
    id: 'bangla_lit',
    titleBn: 'বাংলা সাহিত্য',
    hasProgress: false,
    subtopics: [
      {
        id: 'blit_sub_1',
        titleBn: 'বাংলা সাহিত্যের প্রাচীন যুগ',
        items: [
          { id: 'blit_1_1', titleBn: 'চর্যাপদ', countStr: '15/310' },
          { id: 'blit_1_2', titleBn: 'চর্যাপদের পদকর্তা', countStr: '0/144' },
          { id: 'blit_1_3', titleBn: 'অন্যান্য', countStr: '0/34' },
        ],
      },
      {
        id: 'blit_sub_2',
        titleBn: 'বাংলা সাহিত্যের মধ্যযুগ',
        items: [
          { id: 'blit_2_1', titleBn: 'শ্রীকৃষ্ণকীর্তন কাব্য', countStr: '0/78' },
          { id: 'blit_2_2', titleBn: 'মঙ্গলকাব্য', countStr: '0/314' },
          { id: 'blit_2_3', titleBn: 'বৈষ্ণব পদাবলী', countStr: '0/177' },
        ],
      },
    ],
  },
  {
    id: 'bangla_lang',
    titleBn: 'বাংলা ভাষা ও ব্যাকরণ',
    hasProgress: true,
    subtopics: [
      {
        id: 'blang_sub_1',
        titleBn: 'অর্থ তত্ত্ব',
        items: [
          { id: 'blang_1_1', titleBn: 'বাগধারা ও প্রবাদ প্রবচন', countStr: '23/1.4K' },
          { id: 'blang_1_2', titleBn: 'পরিভাষা ও পারিভাষিক শব্দ', countStr: '93/849' },
          { id: 'blang_1_3', titleBn: 'সমার্থক শব্দ/প্রতিশব্দ', countStr: '38/1.6K' },
          { id: 'blang_1_4', titleBn: 'বিপরীতার্থক শব্দ', countStr: '27/782' },
          { id: 'blang_1_5', titleBn: 'শব্দজোড় ও প্রায় সমোচ্চারিত শব্দ', countStr: '5/155' },
        ],
      },
    ],
  },
  {
    id: 'eng_lit',
    titleBn: 'English Literature',
    hasProgress: false,
    subtopics: [
      {
        id: 'elit_sub_1',
        titleBn: 'The Renaissance Period',
        items: [
          { id: 'elit_1_1', titleBn: 'Elizabethan Period', countStr: '0/425' },
          { id: 'elit_1_2', titleBn: 'Jacobean Period', countStr: '0/109' },
        ],
      },
    ],
  },
  {
    id: 'eng_lang',
    titleBn: 'English Language',
    hasProgress: true,
    subtopics: [
      {
        id: 'elang_sub_1',
        titleBn: 'Grammar & Parts of Speech',
        items: [
          { id: 'elang_1_1', titleBn: 'Noun & Pronoun', countStr: '20/300' },
          { id: 'elang_1_2', titleBn: 'Preposition', countStr: '25/500' },
        ],
      },
    ],
  },
  {
    id: 'math_reasoning',
    titleBn: 'গাণিতিক যুক্তি',
    hasProgress: false,
    subtopics: [
      {
        id: 'math_sub_1',
        titleBn: 'পাটিগণিত',
        items: [
          { id: 'math_1_1', titleBn: 'বাস্তব সংখ্যা, গড় ও বর্গমূল', countStr: '32/1K' },
          { id: 'math_1_2', titleBn: 'শতকরা', countStr: '0/621' },
          { id: 'math_1_3', titleBn: 'ল.সা.গু ও গ.সা.গু', countStr: '16/403' },
        ],
      },
    ],
  },
  {
    id: 'general_science',
    titleBn: 'সাধারণ বিজ্ঞান',
    hasProgress: false,
    subtopics: [],
  },
  {
    id: 'bd_affairs',
    titleBn: 'বাংলাদেশ বিষয়াবলি',
    hasProgress: true,
    subtopics: [],
  },
  {
    id: 'intl_affairs',
    titleBn: 'আন্তর্জাতিক বিষয়াবলি',
    hasProgress: false,
    subtopics: [],
  },
  {
    id: 'geography',
    titleBn: 'ভূগোল ও দুর্যোগ ব্যবস্থাপনা',
    hasProgress: false,
    subtopics: [],
  },
  {
    id: 'ethics',
    titleBn: 'নৈতিকতা, মূল্যবোধ ও সুশাসন',
    hasProgress: false,
    subtopics: [],
  },
  {
    id: 'computer',
    titleBn: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
    hasProgress: false,
    subtopics: [],
  },
  {
    id: 'mental_ability',
    titleBn: 'মানসিক দক্ষতা',
    hasProgress: false,
    subtopics: [],
  },
];

const SubjectIcon: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'current_affairs':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <circle cx="18" cy="18" r="15" fill="#0284c7" />
            <path d="M6 18h24M18 3a15 15 0 010 30M18 3a15 15 0 000 30" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.6" />
            <rect x="8" y="14" width="20" height="8" rx="2" fill="#0369a1" />
            <text x="18" y="20" textAnchor="middle" fill="#ffffff" fontSize="5" fontWeight="900" fontFamily="sans-serif">NEWS</text>
          </svg>
        </div>
      );
    case 'bangla_lit':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <text x="8" y="25" fill="#dc2626" fontSize="20" fontWeight="900" fontFamily="serif, sans-serif">অ</text>
            <path d="M22 10c2 3 4 8 2 12-1 2-3 4-5 4" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );
    case 'bangla_lang':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <rect x="5" y="7" width="26" height="22" rx="4" fill="#ea580c" />
            <rect x="5" y="25" width="26" height="4" rx="1" fill="#c2410c" />
            <text x="18" y="23" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="900" fontFamily="sans-serif">অ:</text>
          </svg>
        </div>
      );
    case 'eng_lit':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <text x="8" y="25" fill="#7c3aed" fontSize="20" fontWeight="900" fontFamily="sans-serif">α</text>
            <path d="M22 10l5 5-7 7h-5v-5l7-7z" fill="#6d28d9" />
          </svg>
        </div>
      );
    case 'eng_lang':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <rect x="5" y="7" width="26" height="22" rx="4" fill="#6366f1" />
            <rect x="5" y="25" width="26" height="4" rx="1" fill="#4338ca" />
            <text x="18" y="22" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">Aa</text>
          </svg>
        </div>
      );
    case 'math_reasoning':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <text x="6" y="25" fill="#c026d3" fontSize="19" fontWeight="900" fontFamily="sans-serif">√x</text>
          </svg>
        </div>
      );
    case 'general_science':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <path d="M14 7h8v5l7 13a2 2 0 01-2 3H9a2 2 0 01-2-3l7-13V7z" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M11 22h14l2 4H9l2-4z" fill="#22c55e" />
            <path d="M18 15c-2 0-3-2-3-4s3-4 3-4 3 2 3 4-1 4-3 4z" fill="#15803d" />
          </svg>
        </div>
      );
    case 'bd_affairs':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <circle cx="18" cy="18" r="14" fill="#15803d" stroke="#166534" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="6" fill="#dc2626" />
          </svg>
        </div>
      );
    case 'intl_affairs':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <circle cx="18" cy="18" r="14" fill="#db2777" />
            <path d="M10 14c2-3 5-4 9-2s5 5 8 4M8 22c4 2 7 0 10-3s6 0 8 3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      );
    case 'geography':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <circle cx="18" cy="16" r="12" fill="#2563eb" />
            <path d="M9 16c3-3 7-3 10-1s4 3 7 2M10 20c3 2 6 1 9-1s5 1 6 3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M12 29h12M18 29v-3" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 'ethics':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <path d="M18 7v20M11 27h14M9 13h18M9 13l-3 7h6l-3-7zM27 13l-3 7h6l-3-7z" stroke="#9333ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
      );
    case 'computer':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <rect x="5" y="7" width="26" height="18" rx="3" fill="url(#comp-grad-icon)" />
            <path d="M13 25l-2 6h14l-2-6" stroke="#7e22ce" strokeWidth="2" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="comp-grad-icon" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    case 'mental_ability':
      return (
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-8 h-8">
            <rect x="7" y="12" width="6" height="16" rx="2" fill="#ec4899" />
            <rect x="15" y="7" width="6" height="21" rx="2" fill="#3b82f6" />
            <rect x="23" y="16" width="6" height="12" rx="2" fill="#f59e0b" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
          📚
        </div>
      );
  }
};

const mockPracticeQuestions: Question[] = [
  {
    id: 'pq-1',
    questionText: "Divulge শব্দের সঠিক অর্থ কোনটি?",
    options: [
      { key: 'ক', text: 'ইঙ্গিত দেয়া' },
      { key: 'খ', text: 'ছড়িয়ে দেয়া' },
      { key: 'গ', text: 'অল্প পরিমাণ' },
      { key: 'ঘ', text: 'প্রকাশ করা' },
    ],
    correctAnswerKey: 'ঘ',
    explanation: "Divulge শব্দের অর্থ হলো গোপন তথ্য বা গোপন বিষয় প্রকাশ্যে প্রকাশ করা। (To reveal or make known private information).",
    subjectId: 'english',
    subjectNameBn: 'English Language',
    difficulty: 'Medium',
  },
  {
    id: 'pq-2',
    questionText: "'Cacophony' এর পারিভাষিক শব্দ-",
    options: [
      { key: 'ক', text: 'শ্রুতিমধুর' },
      { key: 'খ', text: 'শ্রুতি-কটুশব্দ' },
      { key: 'গ', text: 'শ্রুতিকটুতা' },
      { key: 'ঘ', text: 'শ্রুতিগত' },
    ],
    correctAnswerKey: 'গ',
    explanation: "Cacophony শব্দের বাংলা পারিভাষিক অর্থ হলো 'শ্রুতিকটুতা' বা কর্কশ শব্দমালা।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা ভাষা ও ব্যাকরণ',
    difficulty: 'Easy',
  },
  {
    id: 'pq-3',
    questionText: "'Abetment' শব্দের বাংলা পরিভাষা কোনটি?",
    options: [
      { key: 'ক', text: 'অপসহায়তা' },
      { key: 'খ', text: 'উপশম' },
      { key: 'গ', text: 'স্থগিতকরণ' },
      { key: 'ঘ', text: 'হরণ' },
    ],
    correctAnswerKey: 'ক',
    explanation: "Abetment শব্দের আইনগত পারিভাষিক অর্থ হলো অপসহায়তা বা প্ররোচনা।",
    subjectId: 'bangla',
    subjectNameBn: 'বাংলা ভাষা ও ব্যাকরণ',
    difficulty: 'Medium',
  },
];

export const PracticeView: React.FC<PracticeViewProps> = ({
  user,
  isDarkMode = false,
  onAskAIExplanation,
}) => {
  const [subTab, setSubTab] = useState<'mock' | 'quick'>('mock');
  const [viewMode, setViewMode] = useState<PracticeModeType>('main');

  const [selectedSubject, setSelectedSubject] = useState<SubjectItem>(subjectsList[0]);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>(['ca_1_1']);
  const [questionCountInput, setQuestionCountInput] = useState<number>(25);
  const [isQuestionCountModalOpen, setIsQuestionCountModalOpen] = useState(false);

  const [negativeMarkingEnabled, setNegativeMarkingEnabled] = useState(true);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [mockUserAnswers, setMockUserAnswers] = useState<Record<string, string>>({});
  const [quickUserAnswers, setQuickUserAnswers] = useState<Record<string, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
  const [selectedQuickItemTitle, setSelectedQuickItemTitle] = useState('');

  const [expandedSubtopicAccordions, setExpandedSubtopicAccordions] = useState<Record<string, boolean>>({
    ca_sub_1: true,
  });

  const toggleSubtopicAccordion = (id: string) => {
    setExpandedSubtopicAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubtopicCheckbox = (id: string) => {
    if (selectedSubtopics.includes(id)) {
      setSelectedSubtopics((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedSubtopics((prev) => [...prev, id]);
    }
  };

  const handleSubjectClickInMock = (subj: SubjectItem) => {
    setSelectedSubject(subj);
    setViewMode('topic_select');
  };

  const handleSubjectClickInQuick = (subj: SubjectItem) => {
    setSelectedSubject(subj);
    if (subj.subtopics.length > 0) {
      setViewMode('quick_subtopics');
    } else {
      setSelectedQuickItemTitle(subj.titleBn);
      setIsChoiceModalOpen(true);
    }
  };

  const handleQuickSubitemClick = (title: string) => {
    setSelectedQuickItemTitle(title);
    setIsChoiceModalOpen(true);
  };

  const startQuickSoloPractice = () => {
    setIsChoiceModalOpen(false);
    setCurrentQuestionIdx(0);
    setQuickUserAnswers({});
    setIsAnswerSubmitted(false);
    setEarnedPoints(0);
    setViewMode('quick_running');
  };

  const handleMockAnswerSelect = (qId: string, optKey: string) => {
    setMockUserAnswers((prev) => ({ ...prev, [qId]: optKey }));
  };

  const handleQuickAnswerSelect = (qId: string, optKey: string) => {
    if (isAnswerSubmitted) return;
    setQuickUserAnswers((prev) => ({ ...prev, [qId]: optKey }));
    setIsAnswerSubmitted(true);

    const currentQ = mockPracticeQuestions[currentQuestionIdx];
    if (optKey === currentQ.correctAnswerKey) {
      setEarnedPoints((prev) => prev + 1);
    }
  };

  const handleNextQuickQuestion = () => {
    if (currentQuestionIdx < mockPracticeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      setViewMode('quick_result');
    }
  };

  const currentQuestion = mockPracticeQuestions[currentQuestionIdx] || mockPracticeQuestions[0];

  // 1. MAIN PRACTICE SCREEN (Matching User Screenshots 100%)
  if (viewMode === 'main') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-2 md:pt-4 max-w-md md:max-w-2xl mx-auto transition-colors">
        {/* Top 2 Sub-Tabs Switcher ("মক পরীক্ষা" & "দ্রুত প্র্যাকটিস") */}
        <div className="flex items-center justify-center gap-10 pt-2 pb-1 border-b border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setSubTab('mock')}
            className="flex flex-col items-center cursor-pointer transition-all"
          >
            <span
              className={`text-base md:text-lg font-black tracking-tight ${
                subTab === 'mock'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
              }`}
            >
              মক পরীক্ষা
            </span>
            {subTab === 'mock' && (
              <div className="w-20 h-1 bg-emerald-600 rounded-full mt-1.5" />
            )}
          </button>

          <button
            onClick={() => setSubTab('quick')}
            className="flex flex-col items-center cursor-pointer transition-all"
          >
            <span
              className={`text-base md:text-lg font-black tracking-tight ${
                subTab === 'quick'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
              }`}
            >
              দ্রুত প্র্যাকটিস
            </span>
            {subTab === 'quick' && (
              <div className="w-24 h-1 bg-emerald-600 rounded-full mt-1.5" />
            )}
          </button>
        </div>

        {/* SUB-TAB 1: "মক পরীক্ষা" 2-Column Grid (Matching Screenshot 1) */}
        {subTab === 'mock' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Title */}
            <h3 className={`text-center text-xs md:text-sm font-black my-3.5 tracking-tight ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}>
              বিষয় ভিত্তিক
            </h3>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3">
              {subjectsList.map((subj) => (
                <div
                  key={subj.id}
                  onClick={() => handleSubjectClickInMock(subj)}
                  className={`relative p-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] active:scale-98 flex items-center gap-3 min-h-[72px] border ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white shadow-sm'
                      : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <SubjectIcon id={subj.id} />
                  <span className={`text-xs font-bold leading-tight line-clamp-2 ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-800'
                  }`}>
                    {subj.titleBn}
                  </span>

                  {/* Bottom-left green progress strip if present */}
                  {subj.hasProgress && (
                    <div className="absolute bottom-0 left-3.5 w-7 h-1 bg-emerald-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Section: "প্রিসেট পরীক্ষা ⓘ" */}
            <div className="pt-6 pb-2 space-y-3">
              <div className={`flex items-center justify-center gap-1 text-xs font-bold ${
                isDarkMode ? 'text-slate-200' : 'text-slate-800'
              }`}>
                <span>প্রিসেট পরীক্ষা</span>
                <Info className="w-3.5 h-3.5 text-slate-500" />
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['BCS Preli', 'প্রাথমিক প্রধান শিক্ষক', 'শিক্ষক নিবন্ধন'].map((preset) => (
                  <button
                    key={preset}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-2xs transition-all active:scale-95 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-TAB 2: "দ্রুত প্র্যাকটিস" Single Column List (Matching Screenshot 2) */}
        {subTab === 'quick' && (
          <div className="space-y-3 mt-4 animate-fadeIn">
            {subjectsList.map((subj) => (
              <div
                key={subj.id}
                onClick={() => handleSubjectClickInQuick(subj)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] active:scale-98 flex items-center gap-3.5 border ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white shadow-sm'
                    : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs hover:shadow-xs'
                }`}
              >
                <SubjectIcon id={subj.id} />
                <span className={`text-xs font-bold flex-1 ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-800'
                }`}>
                  {subj.titleBn}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 2. MOCK EXAM STEP 1: TOPIC SELECTOR ("টপিক সিলেক্ট করুন 1/2 স্টেপস")
  if (viewMode === 'topic_select') {
    return (
      <div className="space-y-4 pb-28 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-2xl mx-auto transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setViewMode('main')}
              className={`p-1.5 rounded-xl transition-all ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className={`text-base font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              টপিক সিলেক্ট করুন
            </h2>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            1/2 স্টেপস
          </span>
        </div>

        <div className="w-full h-1.5 bg-slate-500/20 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-emerald-500 transition-all duration-300" />
        </div>

        <div className="space-y-3 pt-1">
          {selectedSubject.subtopics.map((group) => {
            const isExpanded = expandedSubtopicAccordions[group.id] !== false;

            return (
              <div
                key={group.id}
                className={`rounded-2xl border overflow-hidden ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div
                  onClick={() => toggleSubtopicAccordion(group.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-500/5 transition-colors border-b border-slate-500/10"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedSubtopics.includes(group.id)}
                      onChange={() => toggleSubtopicCheckbox(group.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                    />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {group.titleBn}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      100/487 টি প্রশ্ন
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-3 space-y-2.5 bg-slate-500/5">
                    {group.items.map((subItem) => {
                      const isChecked = selectedSubtopics.includes(subItem.id);
                      return (
                        <div
                          key={subItem.id}
                          onClick={() => toggleSubtopicCheckbox(subItem.id)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-500/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                            />
                            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              {subItem.titleBn}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono text-slate-400 font-bold">
                            {subItem.countStr}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-14 md:bottom-2 left-0 right-0 max-w-md md:max-w-2xl mx-auto px-4 py-3 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 z-30 flex items-center justify-between gap-3 text-white">
          <button
            onClick={() => setIsQuestionCountModalOpen(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-bold transition-all"
          >
            <span>প্রশ্নের সংখ্যা</span>
            <span className="bg-emerald-600 text-white font-mono px-2 py-0.5 rounded-md">
              {questionCountInput}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 transition-all flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> আরেকটি বিষয়
            </button>

            <button
              onClick={() => setViewMode('confirm_setup')}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all"
            >
              এগিয়ে যান
            </button>
          </div>
        </div>

        {isQuestionCountModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
            <div className={`w-full max-w-xs p-4 rounded-3xl space-y-4 animate-in slide-in-from-bottom ${
              isDarkMode ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-white text-slate-900 shadow-xl'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold">প্রশ্নের সংখ্যা</h4>
                <button onClick={() => setIsQuestionCountModalOpen(false)} className="text-slate-400">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <input
                type="number"
                value={questionCountInput}
                onChange={(e) => setQuestionCountInput(Number(e.target.value))}
                className={`w-full p-3 rounded-2xl border text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />

              <button
                onClick={() => setIsQuestionCountModalOpen(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-2xl text-xs transition-all"
              >
                কনফার্ম করুন
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. MOCK EXAM STEP 2: CONFIRM SETUP ("নিশ্চিত করুন 2/2 স্টেপস")
  if (viewMode === 'confirm_setup') {
    return (
      <div className="space-y-5 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-2xl mx-auto transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setViewMode('topic_select')}
              className={`p-1.5 rounded-xl transition-all ${
                isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className={`text-base font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              নিশ্চিত করুন
            </h2>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            2/2 স্টেপস
          </span>
        </div>

        <div className="w-full h-1.5 bg-emerald-500 rounded-full" />

        <div className={`p-4 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <div className="text-xs font-extrabold text-slate-400">সিলেক্টেড বিষয় (১)</div>
          <div className="p-3 rounded-xl bg-slate-500/10 flex items-center justify-between font-bold text-xs">
            <span>{selectedSubject.titleBn}</span>
            <span className="text-emerald-500 font-mono">{questionCountInput} টি প্রশ্ন</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border space-y-4 ${
          isDarkMode ? 'bg-slate-800/60 border-slate-700/80' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400">মোট সময়</span>
            <span className="font-mono text-sm">{questionCountInput} মিনিট</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-500/10">
            <div>
              <span className="text-xs font-bold block">নেগেティブ মার্কিং</span>
              <span className="text-[10px] text-rose-500 font-semibold block">প্রতি ভুলের জন্য ০.৫ মার্ক কাটা যাবে</span>
            </div>

            <button
              onClick={() => setNegativeMarkingEnabled(!negativeMarkingEnabled)}
              className={`w-10 h-6 rounded-full p-1 transition-colors ${
                negativeMarkingEnabled ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                negativeMarkingEnabled ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentQuestionIdx(0);
            setMockUserAnswers({});
            setViewMode('mock_test_running');
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-current" />
          পরীক্ষা শুরু করুন
        </button>
      </div>
    );
  }

  // 4. MOCK TEST RUNNING
  if (viewMode === 'mock_test_running') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-2xl mx-auto transition-colors">
        <div className="sticky top-14 z-30 p-3 rounded-2xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 flex items-center justify-between shadow-lg text-white">
          <div className="text-xs font-bold">মক পরীক্ষা (সময়: {questionCountInput} মিনিট)</div>
          <button
            onClick={() => setViewMode('mock_test_result')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-xl text-xs transition-all"
          >
            সাবমিট করুন
          </button>
        </div>

        <div className="space-y-4">
          {mockPracticeQuestions.map((q) => (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border space-y-3 ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
              }`}
            >
              <h4 className="text-xs font-extrabold leading-relaxed">{q.questionText}</h4>
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = mockUserAnswers[q.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleMockAnswerSelect(q.id, opt.key)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center gap-2.5 transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold border-emerald-500'
                          : isDarkMode
                          ? 'bg-slate-900/60 border-slate-700 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
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

  // 5. MOCK TEST RESULT SCREEN
  if (viewMode === 'mock_test_result') {
    return (
      <div className="space-y-5 pb-24 md:pb-12 px-4 pt-6 max-w-md md:max-w-2xl mx-auto text-center transition-colors">
        <div className="py-4 space-y-3">
          <div className="w-24 h-24 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-4xl animate-bounce">
            😭
          </div>
          <p className="text-sm font-extrabold text-slate-400">
            তোমার পয়েন্ট দেখে তো চোখে পানি এসে গেল।
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <span className="text-[10px] font-bold block">পয়েন্ট</span>
            <span className="text-base font-mono font-black">⭐ 0</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
            <span className="text-[10px] font-bold block">মার্কস</span>
            <span className="text-base font-mono font-black">🎯 0/2</span>
          </div>

          <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-500">
            <span className="text-[10px] font-bold block">সময়</span>
            <span className="text-base font-mono font-black">⏱ 0 মিনিট</span>
          </div>
        </div>

        <button
          onClick={() => setViewMode('main')}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md"
        >
          এগিয়ে যান
        </button>
      </div>
    );
  }

  // 6. QUICK PRACTICE SUBTOPICS LIST
  if (viewMode === 'quick_subtopics') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-2xl mx-auto transition-colors">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-500/20">
          <button
            onClick={() => setViewMode('main')}
            className={`p-1.5 rounded-xl transition-all ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className={`text-base font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {selectedSubject.titleBn}
          </h2>
        </div>

        <div className="space-y-2.5">
          {selectedSubject.subtopics.map((group) => (
            <div
              key={group.id}
              onClick={() => handleQuickSubitemClick(group.titleBn)}
              className={`p-4 rounded-2xl border cursor-pointer hover:border-emerald-500/50 transition-all active:scale-98 shadow-2xs ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <h4 className="text-xs font-bold">{group.titleBn}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. QUICK PRACTICE RUNNING
  if (viewMode === 'quick_running') {
    return (
      <div className="space-y-4 pb-24 md:pb-12 px-4 pt-3 md:pt-6 max-w-md md:max-w-2xl mx-auto transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-slate-500/20">
          <button
            onClick={() => setViewMode('main')}
            className={`p-1.5 rounded-xl transition-all ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold text-slate-400">{selectedQuickItemTitle}</span>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-500">
            ⭐ {earnedPoints}
          </div>
        </div>

        <div className={`p-4 rounded-2xl border space-y-4 ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
        }`}>
          <h4 className="text-sm font-extrabold leading-relaxed">
            {currentQuestion.questionText}
          </h4>

          <div className="space-y-2.5">
            {currentQuestion.options.map((opt) => {
              const selectedOptKey = quickUserAnswers[currentQuestion.id];
              const isSelected = selectedOptKey === opt.key;
              const isCorrect = currentQuestion.correctAnswerKey === opt.key;

              let btnStyle = isDarkMode
                ? 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-500 font-bold ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-500 font-bold ring-2 ring-rose-500/30';
                }
              }

              return (
                <button
                  key={opt.key}
                  onClick={() => handleQuickAnswerSelect(currentQuestion.id, opt.key)}
                  className={`w-full p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-extrabold">
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-2 animate-fadeIn ${
              isDarkMode ? 'bg-slate-900/90 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center justify-between font-bold text-emerald-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI ব্যাখ্যা
                </span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {isAnswerSubmitted && (
          <button
            onClick={handleNextQuickQuestion}
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-md transition-all"
          >
            পরের প্রশ্ন →
          </button>
        )}
      </div>
    );
  }

  // 8. QUICK PRACTICE CHOICE MODAL
  return (
    <>
      {isChoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-4">
          <div className={`w-full max-w-sm p-5 rounded-3xl space-y-4 animate-in slide-in-from-bottom relative ${
            isDarkMode ? 'bg-slate-900 border border-slate-800 text-white' : 'bg-white text-slate-900 shadow-2xl'
          }`}>
            <button
              onClick={() => setIsChoiceModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-200"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-extrabold text-center pt-2">
              {selectedQuickItemTitle}
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={startQuickSoloPractice}
                className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex flex-col items-center justify-center text-center space-y-2 hover:bg-purple-500/20 transition-all active:scale-95"
              >
                <Swords className="w-7 h-7 text-purple-500" />
                <span className="text-xs font-black block">ব্যাটল</span>
                <span className="text-[10px] text-slate-400 font-medium block">প্রতিযোগীতা করুন</span>
              </button>

              <button
                onClick={startQuickSoloPractice}
                className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center text-center space-y-2 hover:bg-amber-500/20 transition-all active:scale-95"
              >
                <Zap className="w-7 h-7 text-amber-500" />
                <span className="text-xs font-black block">দ্রুত প্র্যাকটিস</span>
                <span className="text-[10px] text-slate-400 font-medium block">একা নিজে প্র্যাকটিস করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
