import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Sparkles,
  Database,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Code,
} from 'lucide-react';
import { Question } from '../types';
import { SUPABASE_SCHEMA_SQL } from '../lib/supabase';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onAddQuestion: (q: Question) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  questions,
  onAddQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'parser' | 'manual' | 'sql'>('parser');
  const [rawText, setRawText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Partial<Question>[]>([]);
  const [duplicateWarnings, setDuplicateWarnings] = useState<Record<number, boolean>>({});
  const [copiedSql, setCopiedSql] = useState(false);

  // Manual Form State
  const [manualQText, setManualQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAns, setCorrectAns] = useState<'ক' | 'খ' | 'গ' | 'ঘ'>('ক');
  const [explanationText, setExplanationText] = useState('');
  const [subjectName, setSubjectName] = useState('বাংলা সাহিত্য');

  if (!isOpen) return null;

  // AI Copy-Paste Smart Parser Algorithm
  const handleParseText = () => {
    if (!rawText.trim()) return;

    const parsed: Partial<Question>[] = [];
    const dups: Record<number, boolean> = {};

    // Split text by numbered questions e.g., "1.", "2.", "১.", "২."
    const blocks = rawText.split(/(?=\d+[\.\)]|\b[১-৯]+[\.\)])/g).filter((b) => b.trim().length > 5);

    blocks.forEach((block, idx) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      const qText = lines[0];

      // Extract options like (a), (b), (c), (d) or (ক), (খ), (গ), (ঘ)
      const optionsFound: { key: 'ক' | 'খ' | 'গ' | 'ঘ'; text: string }[] = [];
      let foundAnsKey: 'ক' | 'খ' | 'গ' | 'ঘ' = 'ক';

      lines.forEach((line) => {
        if (/^\(?[aAক1]\)?[\.\s-]/i.test(line)) {
          optionsFound.push({ key: 'ক', text: line.replace(/^\(?[aAক1]\)?[\.\s-]*/i, '') });
        } else if (/^\(?[bBখ2]\)?[\.\s-]/i.test(line)) {
          optionsFound.push({ key: 'খ', text: line.replace(/^\(?[bBখ2]\)?[\.\s-]*/i, '') });
        } else if (/^\(?[cCগ3]\)?[\.\s-]/i.test(line)) {
          optionsFound.push({ key: 'গ', text: line.replace(/^\(?[cCগ3]\)?[\.\s-]*/i, '') });
        } else if (/^\(?[dDঘ4]\)?[\.\s-]/i.test(line)) {
          optionsFound.push({ key: 'ঘ', text: line.replace(/^\(?[dDঘ4]\)?[\.\s-]*/i, '') });
        } else if (/ans|উত্তর/i.test(line)) {
          if (/(a|ক|১)/i.test(line)) foundAnsKey = 'ক';
          if (/(b|খ|২)/i.test(line)) foundAnsKey = 'খ';
          if (/(c|গ|৩)/i.test(line)) foundAnsKey = 'গ';
          if (/(d|ঘ|৪)/i.test(line)) foundAnsKey = 'ঘ';
        }
      });

      // Default 4 fallback options if missing regex match
      if (optionsFound.length < 4) {
        optionsFound.push({ key: 'ক', text: 'অপশন ১' });
        optionsFound.push({ key: 'খ', text: 'অপশন ২' });
        optionsFound.push({ key: 'গ', text: 'অপশন ৩' });
        optionsFound.push({ key: 'ঘ', text: 'অপশন ৪' });
      }

      // Check Duplicate
      const isDup = questions.some(
        (ex) => ex.questionText.replace(/\s+/g, '') === qText.replace(/\s+/g, '')
      );
      if (isDup) dups[idx] = true;

      parsed.push({
        id: `Q-AUTO-${Date.now()}-${idx}`,
        questionText: qText,
        options: optionsFound.slice(0, 4),
        correctAnswerKey: foundAnsKey,
        explanation: 'উক্ত প্রশ্নটি AI টেক্সট পার্সারের সাহায্যে ডেটাবেজে যুক্ত করা হয়েছে।',
        sourceBadge: 'এডমিন দ্রুত ইমপোর্ট',
        subjectNameBn: subjectName,
        difficulty: 'Medium',
      });
    });

    setParsedPreview(parsed);
    setDuplicateWarnings(dups);
  };

  const handlePublishParsed = () => {
    parsedPreview.forEach((q) => {
      onAddQuestion(q as Question);
    });
    alert(`${parsedPreview.length}টি প্রশ্ন সফলভাবে ডেটাবেজে যুক্ত হয়েছে!`);
    setParsedPreview([]);
    setRawText('');
  };

  const handleAddManual = () => {
    if (!manualQText || !optA || !optB) {
      alert('অনুগ্রহ করে প্রশ্ন ও অপশনসমূহ পূরণ করুন।');
      return;
    }

    const newQ: Question = {
      id: `Q-MANUAL-${Date.now()}`,
      questionText: manualQText,
      options: [
        { key: 'ক', text: optA },
        { key: 'খ', text: optB },
        { key: 'গ', text: optC || 'অপশন ৩' },
        { key: 'ঘ', text: optD || 'অপশন ৪' },
      ],
      correctAnswerKey: correctAns,
      explanation: explanationText || 'কোনো বিশদ ব্যাখ্যা প্রদান করা হয়নি।',
      subjectId: 'custom',
      subjectNameBn: subjectName,
      difficulty: 'Medium',
      sourceBadge: 'এডমিন এন্ট্রি',
    };

    onAddQuestion(newQ);
    alert('প্রশ্নটি প্রশ্নব্যাংকে যুক্ত করা হয়েছে!');
    setManualQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanationText('');
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-[#0f172a] border border-emerald-500/40 rounded-2xl w-full max-w-lg h-[90vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">তামরীন এডমিন প্যানেল</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 p-1">
          <button
            onClick={() => setActiveTab('parser')}
            className={`flex-1 py-2 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'parser'
                ? 'bg-emerald-600 text-white rounded-xl'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI পার্সার
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'manual'
                ? 'bg-emerald-600 text-white rounded-xl'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" /> ম্যানুয়াল
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex-1 py-2 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
              activeTab === 'sql'
                ? 'bg-emerald-600 text-white rounded-xl'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> Supabase SQL
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
          {/* TAB 1: AI COPY-PASTE PARSER */}
          {activeTab === 'parser' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                <p className="font-bold">💡 স্মার্ট এআই পার্সিং নির্দেশিকা:</p>
                <p className="mt-1 text-[11px] text-emerald-200/80">
                  যেকোনো ফরমেটের প্রশ্ন টেক্সট সরাসরি কপি করে নিচে পেস্ট করুন। সিস্টেম স্বয়ংক্রিয়ভাবে অপশন ও সঠিক উত্তর আলাদা করে প্রিভিউ দেখাবে!
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  কপি-পেস্ট ইমপোর্ট টেক্সট:
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder={`উদাহরণ:\n1. He has abhorrence --- war.\n(a) of\n(b) to\n(c) for\n(d) in\nAns: (a) of`}
                  className="w-full h-36 bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={handleParseText}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow"
              >
                টেক্সট পার্স করুন ও ডুপ্লিকেট চেক করুন
              </button>

              {/* PARSED PREVIEW & DUPLICATE WARNINGS */}
              {parsedPreview.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      পার্সকৃত প্রশ্ন ({parsedPreview.length}টি)
                    </span>
                    <button
                      onClick={handlePublishParsed}
                      className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow"
                    >
                      সবগুলো পাবলিশ করুন
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                    {parsedPreview.map((pq, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{pq.questionText}</span>
                          {duplicateWarnings[idx] ? (
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                              <AlertTriangle className="w-3 h-3" /> ডুপ্লিকেট ওয়ার্নিং
                            </span>
                          ) : (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> নতুন
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-[11px]">
                          সঠিক উত্তর: <span className="text-emerald-400 font-bold">{pq.correctAnswerKey}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MANUAL QUESTION FORM */}
          {activeTab === 'manual' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">বিষয় নির্বাচন:</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">প্রশ্ন টেক্সট:</label>
                <textarea
                  value={manualQText}
                  onChange={(e) => setManualQText(e.target.value)}
                  placeholder="যেমন: বাংলা সাহিত্যের আদি নিদর্শন কোনটি?"
                  className="w-full h-20 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">অপশন (ক):</label>
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">অপশন (খ):</label>
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">অপশন (গ):</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">অপশন (ঘ):</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">সঠিক উত্তর নির্বাচন:</label>
                <div className="flex gap-2">
                  {(['ক', 'খ', 'গ', 'ঘ'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setCorrectAns(k)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        correctAns === k
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">ব্যাখ্যা (Explanation):</label>
                <textarea
                  value={explanationText}
                  onChange={(e) => setExplanationText(e.target.value)}
                  className="w-full h-16 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <button
                onClick={handleAddManual}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow"
              >
                প্রশ্নব্যাংকে যুক্ত করুন
              </button>
            </div>
          )}

          {/* TAB 3: SUPABASE SQL MIGRATION SCRIPT */}
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Supabase SQL Schema Script</span>
                <button
                  onClick={copySql}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSql ? 'কপি হয়েছে' : 'কপি করুন'}
                </button>
              </div>

              <pre className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-mono text-emerald-300 overflow-x-auto h-64 no-scrollbar">
                {SUPABASE_SCHEMA_SQL}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
