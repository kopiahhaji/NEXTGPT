import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user profile
    const { data: profile, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        user_type,
        subscription_tier,
        monthly_tokens_used,
        total_tokens_used,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single();

    if (error || !profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's recent conversations
    const { data: conversations } = await supabase
      .from('conversations')
      .select(`
        id,
        title,
        user_type,
        created_at,
        updated_at,
        messages (
          id,
          role,
          content,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(5);

    // Get user's progress
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      profile,
      recentConversations: conversations || [],
      progress: progress || []
    });

  } catch (error: any) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId, name, userType } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = { updated_at: new Date().toISOString() };

    if (name) updateData.name = name;
    if (userType) {
      if (!['beginners', 'kids', 'muallaf', 'senior', 'professional'].includes(userType)) {
        return NextResponse.json(
          { error: 'Invalid user type' },
          { status: 400 }
        );
      }
      updateData.user_type = userType;
    }

    // Update user profile
    const { data: updatedProfile, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      profile: updatedProfile,
      message: 'Profile updated successfully'
    });

  } catch (error: any) {
    console.error('Update user profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
