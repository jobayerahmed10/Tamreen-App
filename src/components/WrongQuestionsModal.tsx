import React from 'react';
import { X, AlertCircle, Bookmark, CheckCircle2 } from 'lucide-react';
import { Question } from '../types';

interface WrongQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wrongQuestions: { question: Question; selectedAnswer: string }[];
}

export const WrongQuestionsModal: React.FC<WrongQuestionsModalProps> = ({
  isOpen,
  onClose,
  wrongQuestions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-rose-500/40 rounded-2xl w-full max-w-md h-[80vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>ভুল প্রশ্ন সংশোধন ({wrongQuestions.length}টি)</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
          {wrongQuestions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">কোনো ভুল উত্তর জমা হয়নি!</p>
              <p className="text-xs">আপনার প্রস্তুতি দারুণ চলছে।</p>
            </div>
          ) : (
            wrongQuestions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2 text-xs"
              >
                <p className="font-bold text-white leading-relaxed">{item.question.questionText}</p>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-rose-400 font-semibold">
                    আপনার উত্তর: {item.selectedAnswer}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    সঠিক উত্তর: {item.question.correctAnswerKey}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 text-[11px] leading-relaxed">
                  {item.question.explanation}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
