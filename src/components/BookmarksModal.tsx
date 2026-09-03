import React from 'react';
import { X, Bookmark, Trash2, HelpCircle } from 'lucide-react';
import { Question } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onToggleBookmark: (id: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  questions,
  onToggleBookmark,
}) => {
  if (!isOpen) return null;

  const bookmarkedQs = questions.filter((q) => q.isBookmarked);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-amber-500/40 rounded-2xl w-full max-w-md h-[80vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Bookmark className="w-5 h-5 fill-amber-400" />
            <span>সংরক্ষিত বুকমার্কসমূহ ({bookmarkedQs.length}টি)</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-3">
          {bookmarkedQs.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <HelpCircle className="w-10 h-10 text-amber-500/40 mx-auto" />
              <p className="text-sm font-bold text-white">কোনো বুকমার্ক সংরক্ষিত নেই</p>
              <p className="text-xs">প্রশ্নব্যাংক থেকে যেকোনো প্রশ্নের বুকমার্ক আইকনে চাপ দিন।</p>
            </div>
          ) : (
            bookmarkedQs.map((q) => (
              <div
                key={q.id}
                className="p-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-white leading-relaxed">{q.questionText}</p>
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="বুকমার্ক সরান"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-emerald-400 font-bold">সঠিক উত্তর: {q.correctAnswerKey}</p>
                <p className="text-slate-300 text-[11px] bg-slate-900 p-2 rounded-xl">
                  {q.explanation}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
