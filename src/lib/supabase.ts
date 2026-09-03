import { createClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env: Record<string, string> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper SQL script to share with user for Supabase setup
export const SUPABASE_SCHEMA_SQL = `-- TAMREEN (তামরীন) DATABASE SCHEMA FOR SUPABASE

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  target_exam TEXT DEFAULT 'BCS-52',
  university TEXT,
  avatar_url TEXT,
  streak_days INT DEFAULT 0,
  total_points NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  icon TEXT,
  category TEXT DEFAULT 'bcs',
  question_count INT DEFAULT 0
);

-- Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY DEFAULT concat('Q-', uuid_generate_v4()),
  question_text TEXT NOT NULL,
  subject_id TEXT REFERENCES public.subjects(id),
  topic_name TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  correct_answer_key VARCHAR(2) NOT NULL,
  explanation TEXT,
  source_badge TEXT,
  year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question Options Table
CREATE TABLE IF NOT EXISTS public.question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
  option_key VARCHAR(2) NOT NULL,
  option_text TEXT NOT NULL
);

-- Bookmarks Table
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Exam Attempts Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_title TEXT NOT NULL,
  score NUMERIC DEFAULT 0,
  accuracy NUMERIC DEFAULT 0,
  total_questions INT DEFAULT 0,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  skipped_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Allow public read subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can manage own bookmarks" ON public.user_bookmarks FOR ALL USING (auth.uid() = user_id);
`;
