-- USTAZ AI Database Schema
-- Run these SQL commands in your Supabase SQL Editor

-- =========================================
-- 1. USERS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('beginners', 'kids', 'muallaf', 'senior', 'professional')),
  ai_model VARCHAR(100) NOT NULL DEFAULT 'gpt-3.5-turbo',
  monthly_tokens_used INTEGER DEFAULT 0,
  is_zakat_qualified BOOLEAN DEFAULT false,
  subscription_tier VARCHAR(50) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'professional')),
  preferences JSONB DEFAULT '{
    "language": "en",
    "theme": "light",
    "notifications": true,
    "cultural_context": "moderate"
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 2. CONVERSATIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) DEFAULT 'Islamic Learning Session',
  ai_model VARCHAR(100) NOT NULL,
  total_tokens INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 3. MESSAGES TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  model_used VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 4. USAGE LOGS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  model VARCHAR(100) NOT NULL,
  tokens_used INTEGER NOT NULL,
  cost_usd DECIMAL(10,6) DEFAULT 0,
  endpoint VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 5. ISLAMIC CONTENT TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS islamic_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('quran', 'hadith', 'prayer', 'story', 'article', 'video')),
  title VARCHAR(500) NOT NULL,
  content_arabic TEXT,
  content_english TEXT,
  content_malay TEXT,
  author VARCHAR(255),
  source VARCHAR(255),
  difficulty_level VARCHAR(50) DEFAULT 'beginner' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 6. USER PROGRESS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES islamic_content(id) ON DELETE CASCADE,
  progress_percentage DECIMAL(5,2) DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_at TIMESTAMP WITH TIME ZONE,
  quiz_scores JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

-- =========================================
-- 7. ZAKAT APPLICATIONS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS zakat_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  application_status VARCHAR(50) DEFAULT 'pending' CHECK (application_status IN ('pending', 'under_review', 'approved', 'rejected')),
  income DECIMAL(15,2),
  assets DECIMAL(15,2),
  nisab_threshold DECIMAL(15,2),
  zakat_amount DECIMAL(15,2),
  supporting_documents TEXT[] DEFAULT '{}',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 8. SYSTEM PROMPTS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS system_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_type VARCHAR(50) NOT NULL CHECK (model_type IN ('beginners', 'kids', 'muallaf', 'senior', 'professional')),
  prompt_text TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_islamic_content_type ON islamic_content(content_type);
CREATE INDEX IF NOT EXISTS idx_islamic_content_difficulty ON islamic_content(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_zakat_applications_user_id ON zakat_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_zakat_applications_status ON zakat_applications(application_status);

-- =========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE zakat_applications ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Conversation policies
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);

-- Message policies
CREATE POLICY "Users can view messages in their conversations" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM conversations WHERE id = messages.conversation_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create messages in their conversations" ON messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM conversations WHERE id = messages.conversation_id AND user_id = auth.uid())
);

-- Usage logs policies
CREATE POLICY "Users can view own usage logs" ON usage_logs FOR SELECT USING (auth.uid() = user_id);

-- Progress policies
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can create own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Zakat applications policies
CREATE POLICY "Users can view own zakat applications" ON zakat_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create zakat applications" ON zakat_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Islamic content is publicly readable
CREATE POLICY "Anyone can view verified Islamic content" ON islamic_content FOR SELECT USING (is_verified = true);

-- =========================================
-- FUNCTIONS AND TRIGGERS
-- =========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_islamic_content_updated_at BEFORE UPDATE ON islamic_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_zakat_applications_updated_at BEFORE UPDATE ON zakat_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_prompts_updated_at BEFORE UPDATE ON system_prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate conversation total tokens
CREATE OR REPLACE FUNCTION update_conversation_tokens()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE conversations
    SET total_tokens = (
        SELECT COALESCE(SUM(tokens_used), 0)
        FROM messages
        WHERE conversation_id = NEW.conversation_id
    )
    WHERE id = NEW.conversation_id;

    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_conversation_tokens_trigger
    AFTER INSERT OR UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION update_conversation_tokens();

-- =========================================
-- INITIAL DATA SEEDING
-- =========================================

-- Insert default system prompts
INSERT INTO system_prompts (model_type, prompt_text) VALUES
('beginners', 'You are USTAZ AI, a patient and gentle Islamic teacher for beginners. Explain Islamic concepts in simple, clear language. Focus on the Five Pillars, basic Quran teachings, and Prophet Muhammad''s life. Be encouraging and use simple examples. Always maintain Islamic authenticity and cultural sensitivity.'),
('kids', 'You are USTAZ AI, a friendly Islamic storyteller for children aged 5-12. Use engaging stories, fun examples, and age-appropriate language. Teach Islamic values through narratives about Prophet Muhammad, companions, and Islamic history. Make learning enjoyable and interactive.'),
('muallaf', 'You are USTAZ AI, a compassionate guide for new converts to Islam. Provide emotional support, clear explanations of Islamic practices, and guidance on the conversion process. Be patient, understanding, and focus on building a strong foundation in faith.'),
('senior', 'You are USTAZ AI, a scholarly Islamic educator for advanced learners. Provide in-depth analysis of Islamic texts, theology, jurisprudence, and classical scholarship. Use academic language while remaining accessible. Reference authentic Islamic sources.'),
('professional', 'You are USTAZ AI, an expert Islamic consultant for professionals. Provide leadership guidance, ethical decision-making from Islamic perspective, industry integration, and professional development aligned with Islamic values. Focus on practical applications.');

-- Insert sample Islamic content
INSERT INTO islamic_content (content_type, title, content_arabic, content_english, content_malay, difficulty_level, is_verified) VALUES
('quran', 'Al-Fatiha (The Opening)', 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'In the name of Allah, the Most Gracious, the Most Merciful', 'Dengan nama Allah, Yang Maha Pengasih, Maha Penyayang', 'beginner', true),
('prayer', 'How to Perform Wudu', NULL, 'Step-by-step guide for ritual purification before prayer', 'Panduan langkah demi langkah untuk bersuci sebelum solat', 'beginner', true),
('hadith', 'Hadith of Intention', 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', 'Actions are judged by intentions', 'Sesungguhnya amalan itu dengan niat', 'beginner', true);

COMMIT;
