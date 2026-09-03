import React, { useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { BottomNavigation, TabType } from './components/BottomNavigation';
import { MenuDrawer } from './components/MenuDrawer';
import { HomeView } from './components/HomeView';
import { ArchiveView } from './components/ArchiveView';
import { PracticeView } from './components/PracticeView';
import { QuestionBankView } from './components/QuestionBankView';
import { ProgressView } from './components/ProgressView';

// Modals
import { MockExamModal } from './components/MockExamModal';
import { ChorchaAIModal } from './components/ChorchaAIModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { FlashNewsModal } from './components/FlashNewsModal';
import { WrongQuestionsModal } from './components/WrongQuestionsModal';
import { BookmarksModal } from './components/BookmarksModal';
import { TargetExamModal } from './components/TargetExamModal';

// Mock Data
import {
  initialUserProfile,
  subjectsData,
  examCategoriesData,
  mockExamsData,
  preparationTargetsData,
  flashNewsData,
  sampleQuestions,
} from './data/mockData';
import { Question, MockExam, ExamAttempt, Subject, PreparationTarget } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [user, setUser] = useState(initialUserProfile);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [subjects, setSubjects] = useState<Subject[]>(subjectsData);
  const [prepTargets, setPrepTargets] = useState<PreparationTarget[]>(preparationTargetsData);
  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([]);

  // Modals visibility state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMockExamOpen, setIsMockExamOpen] = useState(false);
  const [currentMockExam, setCurrentMockExam] = useState<MockExam | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>(sampleQuestions);
  const [isChorchaAIOpen, setIsChorchaAIOpen] = useState(false);
  const [aiContext, setAiContext] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFlashNewsOpen, setIsFlashNewsOpen] = useState(false);
  const [isWrongQuestionsOpen, setIsWrongQuestionsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);

  // Toggle Bookmark for a question
  const handleToggleBookmark = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  // Add new question from admin
  const handleAddQuestion = (newQ: Question) => {
    setQuestions((prev) => [newQ, ...prev]);
  };

  // Start exam from carousel or subject practice
  const handleStartExam = (exam: MockExam) => {
    setCurrentMockExam(exam);
    // Shuffle or pick questions for exam
    setExamQuestions(questions.slice(0, exam.totalQuestions || 10));
    setIsMockExamOpen(true);
  };

  const handleStartSubjectPractice = (
    subject: Subject,
    mode: 'mock' | 'quick',
    options?: { count: number; difficulty: string }
  ) => {
    const filtered = questions.filter((q) => q.subjectId === subject.id || q.subjectNameBn === subject.nameBn);
    const qsToUse = filtered.length > 0 ? filtered : questions;
    const count = options?.count || 10;

    const customExam: MockExam = {
      id: `practice-${subject.id}-${Date.now()}`,
      title: `${subject.nameBn} (${mode === 'quick' ? 'দ্রুত প্র্যাকটিস' : 'মক পরীক্ষা'})`,
      category: subject.nameBn,
      remainingTime: '৩০ মিনিট',
      totalQuestions: Math.min(count, qsToUse.length),
      durationMinutes: 20,
      totalMarks: count,
      negativeMark: 0.25,
    };

    setCurrentMockExam(customExam);
    setExamQuestions(qsToUse.slice(0, count));
    setIsMockExamOpen(true);
  };

  const handleFinishExam = (attempt: ExamAttempt) => {
    setExamHistory((prev) => [attempt, ...prev]);
    // Update user stats
    setUser((prev) => ({
      ...prev,
      testsTaken: prev.testsTaken + 1,
      totalPoints: parseFloat((prev.totalPoints + attempt.score * 0.1).toFixed(1)),
    }));
  };

  const handleAskAIExplanation = (q: Question) => {
    setAiContext(`প্রশ্ন: ${q.questionText}\nসঠিক উত্তর: ${q.correctAnswerKey}\nব্যাখ্যা: ${q.explanation}`);
    setIsChorchaAIOpen(true);
  };

  const handleSelectSubCategoryArchive = (subCatId: string, title: string) => {
    setActiveTab('qbank');
  };

  const handleSelectTarget = (target: string) => {
    setUser((prev) => ({ ...prev, targetExam: target }));
  };

  const handleAddCustomTarget = (title: string) => {
    const newTarget: PreparationTarget = {
      id: `target-${Date.now()}`,
      title,
      progressPercent: 0,
      color: '#10b981',
    };
    setPrepTargets((prev) => [...prev, newTarget]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-['Hind_Siliguri'] flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Header with App Name 'তামরীন' on left and Menu Drawer trigger on right */}
      <TopHeader
        appName="তামরীন"
        targetExam={user.targetExam}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setActiveTab('qbank')}
        onOpenNotifications={() => setIsFlashNewsOpen(true)}
        onOpenTargetModal={() => setIsTargetModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            mockExams={mockExamsData}
            preparationTargets={prepTargets}
            flashNews={flashNewsData}
            onChangeTab={setActiveTab}
            onStartExam={handleStartExam}
            onOpenChorchaAI={() => setIsChorchaAIOpen(true)}
            onOpenFlashNews={() => setIsFlashNewsOpen(true)}
            onOpenHistory={() => setIsWrongQuestionsOpen(true)}
            onOpenNewTargetModal={() => setIsTargetModalOpen(true)}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveView
            categories={examCategoriesData}
            onSelectSubCategory={handleSelectSubCategoryArchive}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            subjects={subjects}
            onSelectSubjectPractice={handleStartSubjectPractice}
          />
        )}

        {activeTab === 'qbank' && (
          <QuestionBankView
            questions={questions}
            onToggleBookmark={handleToggleBookmark}
            onAskAIExplanation={handleAskAIExplanation}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressView user={user} subjects={subjects} />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Slide-Out Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChorchaAI={() => setIsChorchaAIOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenWrongQuestions={() => setIsWrongQuestionsOpen(true)}
        onOpenFlashNews={() => setIsFlashNewsOpen(true)}
        onOpenSupabaseModal={() => setIsAdminOpen(true)}
        onSelectTargetExam={handleSelectTarget}
      />

      {/* Real-time Interactive Timed Mock Exam Modal */}
      {currentMockExam && (
        <MockExamModal
          isOpen={isMockExamOpen}
          onClose={() => setIsMockExamOpen(false)}
          examTitle={currentMockExam.title}
          questions={examQuestions}
          durationMinutes={currentMockExam.durationMinutes}
          onFinishExam={handleFinishExam}
        />
      )}

      {/* "চর্চা AI" Study Assistant Modal */}
      <ChorchaAIModal
        isOpen={isChorchaAIOpen}
        onClose={() => setIsChorchaAIOpen(false)}
        initialQuestionContext={aiContext}
      />

      {/* Admin Panel & AI Copy-Paste Question Parser Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        questions={questions}
        onAddQuestion={handleAddQuestion}
      />

      {/* Flash News Modal */}
      <FlashNewsModal
        isOpen={isFlashNewsOpen}
        onClose={() => setIsFlashNewsOpen(false)}
        newsItems={flashNewsData}
      />

      {/* Review Wrong Questions Modal */}
      <WrongQuestionsModal
        isOpen={isWrongQuestionsOpen}
        onClose={() => setIsWrongQuestionsOpen(false)}
        wrongQuestions={examHistory.flatMap((h) => h.wrongQuestions)}
      />

      {/* Bookmarks Manager Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        questions={questions}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Target Exam Switcher Modal */}
      <TargetExamModal
        isOpen={isTargetModalOpen}
        onClose={() => setIsTargetModalOpen(false)}
        currentTarget={user.targetExam}
        onSelectTarget={handleSelectTarget}
        onAddCustomTarget={handleAddCustomTarget}
      />
    </div>
  );
}
