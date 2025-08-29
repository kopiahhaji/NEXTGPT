import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const userType = searchParams.get('userType');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('islamic_content')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Filter by user type if provided
    if (userType) {
      query = query.contains('target_audience', [userType]);
    }

    const { data: content, error, count } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: content || [],
      total: count || 0,
      limit,
      offset
    });

  } catch (error: any) {
    console.error('Get Islamic content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      content,
      category,
      targetAudience,
      difficultyLevel,
      authorId,
      tags,
      isPublished = true
    } = await request.json();

    // Validate required fields
    if (!title || !content || !category || !targetAudience || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, category, target audience, and author ID are required' },
        { status: 400 }
      );
    }

    // Validate target audience
    const validAudiences = ['beginners', 'kids', 'muallaf', 'senior', 'professional'];
    if (!Array.isArray(targetAudience) || !targetAudience.every(aud => validAudiences.includes(aud))) {
      return NextResponse.json(
        { error: 'Invalid target audience' },
        { status: 400 }
      );
    }

    // Validate difficulty level
    if (difficultyLevel && !['beginner', 'intermediate', 'advanced'].includes(difficultyLevel)) {
      return NextResponse.json(
        { error: 'Invalid difficulty level' },
        { status: 400 }
      );
    }

    // Create content
    const { data: newContent, error } = await supabase
      .from('islamic_content')
      .insert({
        title,
        content,
        category,
        target_audience: targetAudience,
        difficulty_level: difficultyLevel || 'beginner',
        author_id: authorId,
        tags: tags || [],
        is_published: isPublished,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: newContent,
      message: 'Islamic content created successfully'
    });

  } catch (error: any) {
    console.error('Create Islamic content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
