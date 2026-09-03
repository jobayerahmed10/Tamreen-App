import React from 'react';
import { X, Newspaper, Calendar, ExternalLink } from 'lucide-react';
import { FlashNewsItem } from '../types';

interface FlashNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItems: FlashNewsItem[];
}

export const FlashNewsModal: React.FC<FlashNewsModalProps> = ({ isOpen, onClose, newsItems }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md h-[80vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Newspaper className="w-5 h-5" />
            <span>আজকের ফ্ল্যাশনিউজ & নিয়োগ বিজ্ঞপ্তি</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-md border border-indigo-500/30">
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-['Hind_Siliguri']">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
