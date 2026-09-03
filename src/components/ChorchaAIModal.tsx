import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw } from 'lucide-react';
import { askChorchaAI } from '../services/geminiService';

interface ChorchaAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestionContext?: string;
}

export const ChorchaAIModal: React.FC<ChorchaAIModalProps> = ({
  isOpen,
  onClose,
  initialQuestionContext,
}) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string }[]
  >([
    {
      sender: 'ai',
      text: 'আসসালামু আলাইকুম! আমি "চর্চা AI"। বিসিএস, শিক্ষক নিবন্ধন, প্রাথমিক শিক্ষক ও ব্যাংক জবের যেকোনো প্রশ্নের ব্যাখ্যা বা শর্টকাট শিখতে আমাকে প্রশ্ন করুন!',
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;

    const userText = prompt;
    setPrompt('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    const reply = await askChorchaAI(userText, initialQuestionContext);
    setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-purple-500/40 rounded-2xl w-full max-w-md h-[85vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-3.5 bg-gradient-to-r from-purple-900/60 to-slate-900 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center shadow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                চর্চা AI টিউটর
                <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded-full border border-purple-500/30">
                  Gemini AI
                </span>
              </h3>
              <p className="text-[10px] text-purple-300/80">স্মার্ট ব্যাখ্যা ও পড়াশোনার শর্টকাট</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-3.5 overflow-y-auto no-scrollbar space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed font-['Hind_Siliguri'] ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold p-2 bg-purple-950/30 rounded-xl border border-purple-500/20 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>চর্চা AI চিন্তা করছে...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন বা বিষয় লিখুন..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!prompt.trim() || loading}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
