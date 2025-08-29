import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse, UserType } from '@/lib/model-router';
import { supabase } from '@/lib/supabase';
import { ChatMessage } from '@/lib/model-router';

export async function POST(request: NextRequest) {
  try {
    const { messages, userType, userId } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!userType || !['beginners', 'kids', 'muallaf', 'senior', 'professional'].includes(userType)) {
      return NextResponse.json(
        { error: 'Valid user type is required' },
        { status: 400 }
      );
    }

    // Get user authentication (if userId provided)
    if (userId) {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, subscription_tier, monthly_tokens_used')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
    }

    // Generate AI response
    const result = await generateAIResponse(
      messages as ChatMessage[],
      userType as UserType,
      userId
    );

    // Save conversation to database
    if (userId) {
      await saveConversation(userId, messages, result.response, userType);
    }

    return NextResponse.json({
      response: result.response,
      model: result.model,
      tokensUsed: result.tokensUsed,
      cost: result.cost,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);

    // Handle specific error types
    if (error.message?.includes('token limit')) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 } // Too Many Requests
      );
    }

    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Save conversation to database
 */
async function saveConversation(
  userId: string,
  messages: ChatMessage[],
  aiResponse: string,
  userType: string
): Promise<void> {
  try {
    // Create conversation if it doesn't exist
    const conversationId = await getOrCreateConversation(userId, userType);

    // Save user message
    const userMessage = messages[messages.length - 1];
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: userMessage.content,
      user_id: userId
    });

    // Save AI response
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      role: 'assistant',
      content: aiResponse,
      user_id: userId
    });

  } catch (error) {
    console.error('Failed to save conversation:', error);
    // Don't throw error to avoid breaking the chat flow
  }
}

/**
 * Get or create conversation for user
 */
async function getOrCreateConversation(userId: string, userType: string): Promise<string> {
  try {
    // Check for active conversation (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: existingConversation } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', userId)
      .eq('user_type', userType)
      .gte('created_at', yesterday.toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConversation) {
      return existingConversation.id;
    }

    // Create new conversation
    const { data: newConversation, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        user_type: userType,
        title: `Islamic Learning Session - ${new Date().toLocaleDateString()}`
      })
      .select('id')
      .single();

    if (error) throw error;
    return newConversation.id;

  } catch (error) {
    console.error('Failed to get/create conversation:', error);
    throw error;
  }
}
