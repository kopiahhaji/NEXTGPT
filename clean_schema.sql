-- AI Startup Islamic AI Database Schema
-- For Startup: Focus on AI Conversations & Tools
-- =========================================
-- USTAZ AI - MINIMAL STARTUP DATABASE SCHEMA
-- Islamic AI Assistant - Digital Dakwah Platform
-- =========================================

-- 1. USER PROFILES (Basic)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'ms')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CONVERSATIONS (Essential for AI Chat)
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL DEFAULT 'New Conversation',
  messages JSONB DEFAULT '[]'::jsonb,
  model_used TEXT DEFAULT 'gpt-3.5-turbo',
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ISLAMIC RESOURCES (Basic Content)
CREATE TABLE islamic_resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('quran', 'hadith', 'article', 'video')),
  content TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'ms', 'ar')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE islamic_resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own conversations" ON conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view islamic resources" ON islamic_resources FOR SELECT USING (true);

-- 5. SAMPLE ISLAMIC CONTENT
INSERT INTO islamic_resources (title, type, content, language) VALUES
  ('Al-Fatiha (The Opening)', 'quran', 'In the name of Allah, the Most Gracious, the Most Merciful...', 'en'),
  ('Al-Baqarah 255 (Ayatul Kursi)', 'quran', 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence...', 'en'),
  ('Hadith on Knowledge', 'hadith', 'Seeking knowledge is obligatory upon every Muslim...', 'en'),
  ('Introduction to Islamic Studies', 'article', 'Islamic studies encompass the comprehensive study of Islam...', 'en');
