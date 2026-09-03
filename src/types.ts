export interface UserProfile {
  name: string;
  avatar: string;
  targetExam: string;
  university?: string;
  streakDays: number;
  totalPoints: number;
  testsTaken: number;
  rank: number;
}

export type SubjectCategory = 'bcs' | 'teacher' | 'bank' | 'others' | 'all';

export interface Subject {
  id: string;
  nameBn: string;
  nameEn: string;
  icon: string; // Lucide icon name or emoji
  questionCount: number;
  progressPercent: number;
  color: string;
  bgColor: string;
  category: SubjectCategory;
}

export interface QuestionOption {
  key: 'ক' | 'খ' | 'গ' | 'ঘ' | 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
  correctAnswerKey: 'ক' | 'খ' | 'গ' | 'ঘ';
  explanation: string;
  sourceBadge?: string; // e.g. "সিভিল সার্জন(কুমিল্লা) - (স্বাস্থ্য সহঃ)" or "৪৪তম বিসিএস"
  subjectId: string;
  subjectNameBn: string;
  topicNameBn?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  year?: string;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

export interface MockExam {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  remainingTime: string; // e.g. "৯ ঘণ্টা বাকি"
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  negativeMark: number;
  isLive?: boolean;
  badge?: string;
}

export interface ExamCategory {
  id: string;
  titleBn: string;
  bgColor: string;
  borderColor: string;
  items: {
    id: string;
    titleBn: string;
    count: number;
    color: string;
    badgeText?: string;
  }[];
}

export interface PreparationTarget {
  id: string;
  title: string;
  progressPercent: number;
  color: string;
}

export interface FlashNewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
}

export interface ExamAttempt {
  id: string;
  examTitle: string;
  date: string;
  totalQuestions: number;
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  timeSpentSeconds: number;
  wrongQuestions: {
    question: Question;
    selectedAnswer: string;
  }[];
}
