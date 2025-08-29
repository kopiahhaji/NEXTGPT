import { generateGPT35Response } from './openai-service';
import { generateClaudeInstantResponse, generateClaude2Response } from './anthropic-service';
import { supabase } from './supabase';

export type UserType = 'beginners' | 'kids' | 'muallaf' | 'senior' | 'professional';
export type AIModel = 'gpt-3.5-turbo' | 'claude-instant-1.2' | 'claude-2';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ModelSelectionCriteria {
  userType: UserType;
  isPremiumUser: boolean;
  currentMonthUsage: number;
  messageComplexity: 'simple' | 'moderate' | 'complex';
  preferredLanguage: 'en' | 'ms' | 'ar';
}

/**
 * Model selection strategy based on user type and budget optimization
 */
export const MODEL_STRATEGY = {
  beginners: {
    primary: 'gpt-3.5-turbo' as AIModel,
    fallback: 'claude-instant-1.2' as AIModel,
    reasoning: 'Ultra-budget model for basic Islamic education'
  },
  kids: {
    primary: 'gpt-3.5-turbo' as AIModel,
    fallback: 'claude-instant-1.2' as AIModel,
    reasoning: 'Cost-effective creativity for children'
  },
  muallaf: {
    primary: 'claude-instant-1.2' as AIModel,
    fallback: 'gpt-3.5-turbo' as AIModel,
    reasoning: 'Empathetic support for new converts'
  },
  senior: {
    primary: 'claude-2' as AIModel,
    fallback: 'claude-instant-1.2' as AIModel,
    reasoning: 'Advanced analytical capabilities for scholars'
  },
  professional: {
    primary: 'claude-2' as AIModel,
    fallback: 'claude-instant-1.2' as AIModel,
    reasoning: 'Professional expertise and leadership guidance'
  }
};

/**
 * Monthly token limits by user type
 */
export const TOKEN_LIMITS = {
  beginners: 150000,    // ~$0.45/month with GPT-3.5
  kids: 120000,         // ~$0.36/month with GPT-3.5
  muallaf: 144000,      // ~$0.35/month with Claude Instant
  senior: 450000,       // ~$10.80/month with Claude 2
  professional: 720000  // ~$17.28/month with Claude 2
};

/**
 * Select the optimal AI model based on criteria
 */
export function selectOptimalModel(criteria: ModelSelectionCriteria): AIModel {
  const { userType, isPremiumUser, currentMonthUsage, messageComplexity } = criteria;

  // Check if user is approaching token limit
  const limit = TOKEN_LIMITS[userType];
  const usagePercentage = (currentMonthUsage / limit) * 100;

  // If approaching limit (80%+), switch to cheaper model
  if (usagePercentage > 80) {
    const strategy = MODEL_STRATEGY[userType];
    return strategy.fallback;
  }

  // For complex queries, prefer more capable models
  if (messageComplexity === 'complex' && isPremiumUser) {
    if (userType === 'senior' || userType === 'professional') {
      return 'claude-2';
    }
  }

  // Default to primary model for the user type
  return MODEL_STRATEGY[userType].primary;
}

/**
 * Generate AI response using the selected model
 */
export async function generateAIResponse(
  messages: ChatMessage[],
  userType: UserType,
  userId?: string
): Promise<{ response: string; model: AIModel; tokensUsed: number; cost: number }> {
  try {
    // Get user's current month usage
    let currentUsage = 0;
    let isPremiumUser = false;

    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('monthly_tokens_used, subscription_tier')
        .eq('id', userId)
        .single();

      if (user) {
        currentUsage = user.monthly_tokens_used || 0;
        isPremiumUser = user.subscription_tier !== 'free';
      }
    }

    // Determine message complexity
    const lastMessage = messages[messages.length - 1];
    const complexity = analyzeMessageComplexity(lastMessage.content);

    // Select optimal model
    const criteria: ModelSelectionCriteria = {
      userType,
      isPremiumUser,
      currentMonthUsage: currentUsage,
      messageComplexity: complexity,
      preferredLanguage: 'en' // Default, can be enhanced later
    };

    const selectedModel = selectOptimalModel(criteria);

    // Check token limit
    const limit = TOKEN_LIMITS[userType];
    if (currentUsage >= limit) {
      throw new Error('Monthly token limit exceeded. Please upgrade your plan or try again next month.');
    }

    // Generate response based on selected model
    let result;
    const options = { userType, maxTokens: 500, temperature: 0.7 };

    switch (selectedModel) {
      case 'gpt-3.5-turbo':
        result = await generateGPT35Response(messages, options);
        break;
      case 'claude-instant-1.2':
        result = await generateClaudeInstantResponse(messages, options);
        break;
      case 'claude-2':
        result = await generateClaude2Response(messages, { ...options, maxTokens: 1000 });
        break;
      default:
        throw new Error('Unsupported AI model');
    }

    // Update user's token usage if userId provided
    if (userId) {
      await updateUserTokenUsage(userId, result.tokensUsed, result.cost, selectedModel);
    }

    return {
      response: result.response,
      model: selectedModel,
      tokensUsed: result.tokensUsed,
      cost: result.cost
    };

  } catch (error) {
    console.error('AI Response Generation Error:', error);
    throw error;
  }
}

/**
 * Analyze message complexity to determine model selection
 */
function analyzeMessageComplexity(message: string): 'simple' | 'moderate' | 'complex' {
  const wordCount = message.split(' ').length;
  const hasComplexTerms = /theology|jurisprudence|aqeedah|fiqh|hadith|scholarship/i.test(message);

  if (wordCount > 100 || hasComplexTerms) {
    return 'complex';
  } else if (wordCount > 50) {
    return 'moderate';
  } else {
    return 'simple';
  }
}

/**
 * Update user's token usage in database
 */
async function updateUserTokenUsage(
  userId: string,
  tokensUsed: number,
  cost: number,
  model: AIModel
): Promise<void> {
  try {
    // First get current token usage
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('monthly_tokens_used')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    const currentUsage = currentUser?.monthly_tokens_used || 0;
    const newUsage = currentUsage + tokensUsed;

    // Update user's monthly token usage
    const { error: userError } = await supabase
      .from('users')
      .update({
        monthly_tokens_used: newUsage
      })
      .eq('id', userId);

    if (userError) throw userError;

    // Log usage for analytics
    const { error: logError } = await supabase
      .from('usage_logs')
      .insert({
        user_id: userId,
        model,
        tokens_used: tokensUsed,
        cost_usd: cost,
        endpoint: 'chat'
      });

    if (logError) throw logError;

  } catch (error) {
    console.error('Failed to update token usage:', error);
    // Don't throw error to avoid breaking the chat flow
  }
}

/**
 * Get user's current token usage
 */
export async function getUserTokenUsage(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('monthly_tokens_used')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.monthly_tokens_used || 0;
  } catch (error) {
    console.error('Failed to get user token usage:', error);
    return 0;
  }
}

/**
 * Reset monthly token usage (to be called monthly via cron job)
 */
export async function resetMonthlyTokenUsage(): Promise<void> {
  try {
    const { error } = await supabase
      .from('users')
      .update({ monthly_tokens_used: 0 })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all users

    if (error) throw error;
    console.log('Monthly token usage reset completed');
  } catch (error) {
    console.error('Failed to reset monthly token usage:', error);
  }
}
