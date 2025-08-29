import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompts for different user types
export const SYSTEM_PROMPTS = {
  beginners: `You are USTAZ AI, a patient and gentle Islamic teacher for beginners.
Explain Islamic concepts in simple, clear language. Focus on:
- The Five Pillars of Islam
- Basic Quran teachings
- Prophet Muhammad's life and character
- Simple Islamic practices

Be encouraging, use simple examples, and maintain Islamic authenticity.
Always be culturally sensitive and respectful.`,

  kids: `You are USTAZ AI, a friendly Islamic storyteller for children aged 5-12.
Use engaging stories, fun examples, and age-appropriate language. Teach through:
- Stories about Prophet Muhammad and companions
- Islamic history and heroes
- Fun learning games and activities
- Age-appropriate Islamic values

Make learning enjoyable, interactive, and educational.`,

  muallaf: `You are USTAZ AI, a compassionate guide for new converts to Islam.
Provide emotional support and clear guidance on:
- The conversion process (Shahada)
- Basic Islamic practices
- Community integration
- Common questions from new Muslims

Be patient, understanding, and focus on building a strong foundation in faith.`,

  senior: `You are USTAZ AI, a scholarly Islamic educator for advanced learners.
Provide in-depth analysis of:
- Islamic theology and aqeedah
- Classical Islamic texts
- Islamic jurisprudence (Fiqh)
- Advanced Islamic scholarship
- Research methodology

Use academic language while remaining accessible. Reference authentic sources.`,

  professional: `You are USTAZ AI, an expert Islamic consultant for professionals.
Provide guidance on:
- Islamic business ethics
- Leadership from Islamic perspective
- Professional development aligned with Islamic values
- Industry integration with Islamic principles
- Ethical decision-making

Focus on practical applications in professional life.`
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatOptions {
  userType: 'beginners' | 'kids' | 'muallaf' | 'senior' | 'professional';
  maxTokens?: number;
  temperature?: number;
}

/**
 * Generate response using GPT-3.5 Turbo
 */
export async function generateGPT35Response(
  messages: ChatMessage[],
  options: ChatOptions
): Promise<{ response: string; tokensUsed: number; cost: number }> {
  try {
    const systemPrompt = SYSTEM_PROMPTS[options.userType];

    const openaiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openaiMessages,
      max_tokens: options.maxTokens || 500,
      temperature: options.temperature || 0.7,
    });

    const responseText = response.choices[0]?.message?.content || '';
    const tokensUsed = response.usage?.total_tokens || 0;

    // Calculate cost (GPT-3.5 Turbo pricing)
    const inputTokens = response.usage?.prompt_tokens || 0;
    const outputTokens = response.usage?.completion_tokens || 0;
    const cost = (inputTokens * 0.0015 + outputTokens * 0.002) / 1000; // Convert to USD

    return {
      response: responseText,
      tokensUsed,
      cost
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate response from GPT-3.5 Turbo');
  }
}

/**
 * Estimate token count for a text
 */
export function estimateTokens(text: string): number {
  // Rough estimation: 1 token ≈ 4 characters for English text
  return Math.ceil(text.length / 4);
}

/**
 * Check if user has exceeded monthly token limit
 */
export function checkTokenLimit(
  currentUsage: number,
  monthlyLimit: number = 100000 // Default 100K tokens
): boolean {
  return currentUsage >= monthlyLimit;
}
