import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Flag,
  Award,
  RotateCcw,
  List,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, MockExam, ExamAttempt } from '../types';

interface MockExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
  questions: Question[];
  durationMinutes?: number;
  onFinishExam: (attempt: ExamAttempt) => void;
}

export const MockExamModal: React.FC<MockExamModalProps> = ({
  isOpen,
  onClose,
  examTitle,
  questions,
  durationMinutes = 20,
  onFinishExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(durationMinutes * 60);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [examAttempt, setExamAttempt] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setTimeLeftSeconds(durationMinutes * 60);
    setIsExamCompleted(false);
    setExamAttempt(null);
  }, [isOpen, durationMinutes]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isExamCompleted || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isExamCompleted, timeLeftSeconds]);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectAnswer = (key: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const wrongQs: { question: Question; selectedAnswer: string }[] = [];

    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (!selected) {
        skippedCount++;
      } else if (selected === q.correctAnswerKey) {
        correctCount++;
      } else {
        wrongCount++;
        wrongQs.push({ question: q, selectedAnswer: selected });
      }
    });

    const total = questions.length || 1;
    const score = Math.max(0, correctCount - wrongCount * 0.25);
    const accuracy = Math.round((correctCount / total) * 100);

    const attempt: ExamAttempt = {
      id: Date.now().toString(),
      examTitle,
      date: new Date().toLocaleDateString('bn-BD'),
      totalQuestions: total,
      score,
      correct: correctCount,
      wrong: wrongCount,
      skipped: skippedCount,
      accuracy,
      timeSpentSeconds: durationMinutes * 60 - timeLeftSeconds,
      wrongQuestions: wrongQs,
    };

    setExamAttempt(attempt);
    setIsExamCompleted(true);
    setShowConfirmSubmit(false);
    onFinishExam(attempt);

    // Launch celebratory confetti if score > 50%
    if (accuracy >= 50) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f19] flex flex-col justify-between animate-in fade-in">
      {/* Top Header */}
      <div className="bg-[#0f172a] border-b border-slate-800 p-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white truncate max-w-[200px]">{examTitle}</h2>
          <p className="text-[11px] text-slate-400">
            প্রশ্ন {currentIndex + 1} / {questions.length}
          </p>
        </div>

        {/* Timer */}
        {!isExamCompleted && (
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-full text-rose-400 font-mono font-bold text-sm">
            <Clock className="w-4 h-4 animate-spin text-rose-400" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {!isExamCompleted && (
            <button
              onClick={() => setShowNavigator(!showNavigator)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title="প্রশ্ন তালিকা"
            >
              <List className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QUESTION NAVIGATOR SHEET */}
      {showNavigator && !isExamCompleted && (
        <div className="bg-slate-900 border-b border-slate-800 p-4 space-y-3 animate-in slide-in-from-top">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>প্রশ্ন নেভিগেটর</span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> উত্তর দেওয়া
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> রিভিউ চিহ্নিত
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 bg-slate-700 rounded-full" /> বাকি
              </span>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto no-scrollbar">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(userAnswers[q.id]);
              const isMarked = Boolean(markedForReview[q.id]);
              const isCurrent = idx === currentIndex;

              let btnStyle = 'bg-slate-800 text-slate-300 border-slate-700';
              if (isMarked) btnStyle = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
              else if (isAnswered) btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';

              if (isCurrent) btnStyle += ' ring-2 ring-white';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowNavigator(false);
                  }}
                  className={`p-2 rounded-xl text-xs font-mono transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN BODY AREA */}
      {!isExamCompleted ? (
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar max-w-md mx-auto w-full space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-white leading-relaxed font-['Hind_Siliguri']">
                {currentQ.questionText}
              </h3>
              <button
                onClick={toggleMarkForReview}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-700/50 text-slate-400 border-slate-600/40 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {markedForReview[currentQ.id] ? 'চিহ্নিত' : 'রিভিউ'}
              </button>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectAnswer(opt.key)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 active:scale-99 ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-500 text-white font-bold ring-1 ring-emerald-400'
                        : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                          isSelected
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>

                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* RESULT SCORE CARD */
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar max-w-md mx-auto w-full space-y-4 text-center">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">পরীক্ষা সম্পন্ন হয়েছে!</h3>
              <p className="text-xs text-slate-400 mt-0.5">{examTitle}</p>
            </div>

            {/* Score Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <p className="text-[11px] text-slate-400">মোট নম্বর</p>
                <p className="text-base font-bold text-emerald-400 font-mono">
                  {examAttempt?.score.toFixed(1)} / {questions.length}
                </p>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <p className="text-[11px] text-slate-400">সঠিক উত্তর</p>
                <p className="text-base font-bold text-emerald-400 font-mono">
                  {examAttempt?.correct}টি
                </p>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <p className="text-[11px] text-slate-400">ভুল উত্তর</p>
                <p className="text-base font-bold text-rose-400 font-mono">
                  {examAttempt?.wrong}টি
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-left space-y-1">
              <div className="flex justify-between text-xs font-bold text-emerald-300">
                <span>নির্ভুলতার হার (Accuracy):</span>
                <span>{examAttempt?.accuracy}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-2"
                  style={{ width: `${examAttempt?.accuracy}%` }}
                />
              </div>
            </div>

            {/* Wrong Question Explanations */}
            {examAttempt?.wrongQuestions && examAttempt.wrongQuestions.length > 0 && (
              <div className="text-left space-y-3 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold text-rose-400">
                  ভুল উত্তরসমূহ ও ব্যাখ্যা ({examAttempt.wrongQuestions.length}টি)
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                  {examAttempt.wrongQuestions.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-rose-500/30 text-xs space-y-1.5">
                      <p className="font-bold text-white">{item.question.questionText}</p>
                      <p className="text-rose-400">আপনার উত্তর: {item.selectedAnswer}</p>
                      <p className="text-emerald-400 font-bold">
                        সঠিক উত্তর: {item.question.correctAnswerKey}
                      </p>
                      <p className="text-slate-300 text-[11px] bg-slate-800 p-2 rounded-lg">
                        {item.question.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition-all"
            >
              ফলাফল গ্রহণ করুন ও ফিরে যান
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM ACTION BAR (During active exam) */}
      {!isExamCompleted && (
        <div className="bg-[#0f172a] border-t border-slate-800 p-3 flex items-center justify-between max-w-md mx-auto w-full">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> পূর্ববর্তী
          </button>

          <button
            onClick={() => setShowConfirmSubmit(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950/50"
          >
            সাবমিট করুন
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs disabled:opacity-40 flex items-center gap-1"
          >
            পরবর্তী <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CONFIRMATION SUBMIT MODAL */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-5 max-w-xs w-full space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">পরীক্ষা জমা দিবেন?</h3>
              <p className="text-xs text-slate-400 mt-1">
                আপনি {Object.keys(userAnswers).length}টি প্রশ্নের উত্তর দিয়েছেন (মোট {questions.length}টি)
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                বাতিল
              </button>
              <button
                onClick={handleSubmitExam}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                হ্যাঁ, জমা দিন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
