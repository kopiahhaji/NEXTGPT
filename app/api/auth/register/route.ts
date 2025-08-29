import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { UserType } from '@/lib/model-router';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, userType } = await request.json();

    // Validate input
    if (!email || !password || !name || !userType) {
      return NextResponse.json(
        { error: 'Email, password, name, and user type are required' },
        { status: 400 }
      );
    }

    if (!['beginners', 'kids', 'muallaf', 'senior', 'professional'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_type: userType
        }
      }
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500 }
      );
    }

    // Create user profile in our database
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        user_type: userType as UserType,
        subscription_tier: 'free',
        monthly_tokens_used: 0,
        total_tokens_used: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't return error here as auth user was created successfully
    }

    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name,
        userType
      },
      message: 'User created successfully. Please check your email for verification.'
    });

  } catch (error: any) {
    console.error('User registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
