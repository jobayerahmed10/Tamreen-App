import React, { useState } from 'react';
import {
  Search,
  X,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Flag,
  ThumbsUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { Question } from '../types';

interface QuestionBankViewProps {
  questions: Question[];
  onToggleBookmark: (questionId: string) => void;
  onAskAIExplanation: (question: Question) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onToggleBookmark,
  onAskAIExplanation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTopicFilter, setActiveTopicFilter] = useState('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({});

  const filterTopics = [
    { id: 'all', label: 'সকল প্রশ্ন' },
    { id: ' প্রাচীন যুগ', label: 'বাংলা সাহিত্যের প্রাচীন যুগ (488)' },
    { id: 'চর্যাপদ', label: 'চর্যাপদ' },
    { id: 'সংবিধান', label: 'সংবিধান' },
    { id: 'Prepositions', label: 'Prepositions' },
  ];

  const filteredQuestions = questions.filter((q) => {
    if (activeTopicFilter !== 'all' && !q.topicNameBn?.includes(activeTopicFilter)) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.questionText.toLowerCase().includes(term) ||
      q.subjectNameBn.toLowerCase().includes(term) ||
      q.explanation.toLowerCase().includes(term) ||
      (q.sourceBadge && q.sourceBadge.toLowerCase().includes(term))
    );
  });

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setUserSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    // Auto reveal answer and explanation on click
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3 max-w-md mx-auto">
      {/* Search Input (Matching Screenshot 5) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="প্রশ্ন খুঁজুন..."
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

      {/* Horizontal Filter Tags (Matching Screenshot 5) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTopics.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveTopicFilter(tag.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTopicFilter === tag.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Question Card List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">কোনো প্রশ্ন পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400 mt-1">অন্য সার্চ ফিল্টার বা শব্দ চেষ্টা করুন</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isRevealed = revealedAnswers[q.id];
            const userAns = userSelectedAnswers[q.id];
            const isCorrect = userAns === q.correctAnswerKey;

            return (
              <div
                key={q.id}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-3 shadow-md relative"
              >
                {/* Question Header & Title */}
                <h3 className="text-sm font-bold text-white leading-relaxed font-['Hind_Siliguri']">
                  {q.questionText}
                </h3>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isThisOptionSelected = userAns === opt.key;
                    const isThisOptionCorrect = opt.key === q.correctAnswerKey;

                    let optionStyle = 'bg-slate-800/80 text-slate-200 border-slate-700/60 hover:bg-slate-700/50';

                    if (userAns) {
                      if (isThisOptionCorrect) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isThisOptionSelected && !isThisOptionCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-bold';
                      }
                    } else if (isRevealed && isThisOptionCorrect) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 active:scale-99 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-slate-700/60 text-slate-300 flex items-center justify-center font-bold text-[11px] shrink-0 border border-slate-600/50">
                            {opt.key}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>

                        {userAns && isThisOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {userAns && isThisOptionSelected && !isThisOptionCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Question Source Badge & Action Bar (Matching Screenshot 5) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  {/* Source Badge */}
                  {q.sourceBadge ? (
                    <span className="text-[10px] bg-sky-950/60 text-sky-300 px-2.5 py-1 rounded-md border border-sky-800/40 font-medium truncate max-w-[200px]">
                      {q.sourceBadge}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">{q.subjectNameBn}</span>
                  )}

                  {/* Right Actions: Bookmark, Report, Reveal Eye */}
                  <div className="flex items-center gap-1.5">
                    {/* Ask AI Helper */}
                    <button
                      onClick={() => onAskAIExplanation(q)}
                      className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-950/40 transition-colors"
                      title="AI উত্তর ব্যাখা দেখুন"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                      title="বুকমার্ক করুন"
                    >
                      {q.isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-500/20" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    {/* Report button */}
                    <button
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                      title="রিপোর্ট করুন"
                    >
                      <Flag className="w-4 h-4" />
                    </button>

                    {/* Reveal Answer Toggle (Eye icon matching Screenshot 5) */}
                    <button
                      onClick={() => toggleRevealAnswer(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isRevealed ? 'bg-emerald-600 text-white' : 'bg-slate-700/80 text-slate-300 hover:bg-slate-600'
                      }`}
                      title={isRevealed ? 'উত্তর লুকান' : 'উত্তর দেখুন'}
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Explanation Expandable Block */}
                {isRevealed && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1.5 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                      <span>সঠিক উত্তর: {q.correctAnswerKey}</span>
                      <span className="text-[10px] text-slate-400">বিশদ ব্যাখ্যা:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-['Hind_Siliguri']">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
