import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for Islamic education platform
export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
  preferences: {
    language: 'en' | 'ms'
    theme: 'light' | 'dark' | 'auto'
    notifications: boolean
  }
}

export interface Conversation {
  id: string
  user_id: string
  title: string
  messages: ChatMessage[]
  created_at: string
  updated_at: string
  is_favorite: boolean
  tags: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  model?: string
  tokens?: number
}

export interface LearningProgress {
  id: string
  user_id: string
  topic: string
  progress_percentage: number
  completed_lessons: string[]
  quiz_scores: Record<string, number>
  last_studied: string
}

export interface IslamicResource {
  id: string
  title: string
  type: 'quran' | 'hadith' | 'article' | 'video' | 'audio'
  content: string
  author: string
  tags: string[]
  language: 'en' | 'ms' | 'ar'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  created_at: string
  updated_at: string
}
