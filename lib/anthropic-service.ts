import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompts for different user types (same as OpenAI)
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
 * Generate response using Claude Instant
 */
export async function generateClaudeInstantResponse(
  messages: ChatMessage[],
  options: ChatOptions
): Promise<{ response: string; tokensUsed: number; cost: number }> {
  try {
    const systemPrompt = SYSTEM_PROMPTS[options.userType];

    // Convert messages to Claude format (exclude system messages from user messages)
    const userMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

    const response = await anthropic.messages.create({
      model: 'claude-instant-1.2',
      max_tokens: options.maxTokens || 500,
      system: systemPrompt,
      messages: userMessages,
    });

    const responseText = response.content[0]?.text || '';
    const tokensUsed = response.usage?.input_tokens + response.usage?.output_tokens || 0;

    // Calculate cost (Claude Instant pricing)
    const inputTokens = response.usage?.input_tokens || 0;
    const outputTokens = response.usage?.output_tokens || 0;
    const cost = (inputTokens * 0.0008 + outputTokens * 0.0024) / 1000; // Convert to USD

    return {
      response: responseText,
      tokensUsed,
      cost
    };
  } catch (error) {
    console.error('Claude Instant API Error:', error);
    throw new Error('Failed to generate response from Claude Instant');
  }
}

/**
 * Generate response using Claude 2
 */
export async function generateClaude2Response(
  messages: ChatMessage[],
  options: ChatOptions
): Promise<{ response: string; tokensUsed: number; cost: number }> {
  try {
    const systemPrompt = SYSTEM_PROMPTS[options.userType];

    // Convert messages to Claude format
    const userMessages = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

    const response = await anthropic.messages.create({
      model: 'claude-2',
      max_tokens: options.maxTokens || 1000, // Claude 2 can handle more tokens
      system: systemPrompt,
      messages: userMessages,
    });

    const responseText = response.content[0]?.text || '';
    const tokensUsed = response.usage?.input_tokens + response.usage?.output_tokens || 0;

    // Calculate cost (Claude 2 pricing)
    const inputTokens = response.usage?.input_tokens || 0;
    const outputTokens = response.usage?.output_tokens || 0;
    const cost = (inputTokens * 8 + outputTokens * 24) / 1000000; // Convert to USD

    return {
      response: responseText,
      tokensUsed,
      cost
    };
  } catch (error) {
    console.error('Claude 2 API Error:', error);
    throw new Error('Failed to generate response from Claude 2');
  }
}

/**
 * Estimate token count for Claude models
 */
export function estimateClaudeTokens(text: string): number {
  // Claude uses different tokenization, roughly 1 token per 3-4 characters
  return Math.ceil(text.length / 3.5);
}

/**
 * Get Claude model pricing
 */
export function getClaudePricing(model: 'claude-instant-1.2' | 'claude-2') {
  if (model === 'claude-instant-1.2') {
    return {
      input: 0.0008, // per 1K tokens
      output: 0.0024 // per 1K tokens
    };
  } else {
    return {
      input: 8, // per 1M tokens
      output: 24 // per 1M tokens
    };
  }
}
