import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const period = searchParams.get('period') || 'month'; // 'day', 'week', 'month', 'year'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get usage logs for the period
    const { data: usageLogs, error: logsError } = await supabase
      .from('usage_logs')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (logsError) {
      return NextResponse.json(
        { error: logsError.message },
        { status: 500 }
      );
    }

    // Calculate analytics
    const analytics = calculateUsageAnalytics(usageLogs || []);

    // Get user's current token usage
    const { data: user } = await supabase
      .from('users')
      .select('monthly_tokens_used, total_tokens_used, subscription_tier')
      .eq('id', userId)
      .single();

    return NextResponse.json({
      period,
      currentUsage: {
        monthlyTokens: user?.monthly_tokens_used || 0,
        totalTokens: user?.total_tokens_used || 0,
        subscriptionTier: user?.subscription_tier || 'free'
      },
      analytics,
      usageLogs: usageLogs || []
    });

  } catch (error: any) {
    console.error('Get usage analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateUsageAnalytics(usageLogs: any[]) {
  if (usageLogs.length === 0) {
    return {
      totalTokens: 0,
      totalCost: 0,
      averageTokensPerRequest: 0,
      modelUsage: {},
      dailyUsage: [],
      topEndpoints: []
    };
  }

  const totalTokens = usageLogs.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
  const totalCost = usageLogs.reduce((sum, log) => sum + (log.cost_usd || 0), 0);
  const averageTokensPerRequest = totalTokens / usageLogs.length;

  // Model usage breakdown
  const modelUsage = usageLogs.reduce((acc, log) => {
    const model = log.model || 'unknown';
    acc[model] = (acc[model] || 0) + (log.tokens_used || 0);
    return acc;
  }, {});

  // Daily usage
  const dailyUsage = usageLogs.reduce((acc, log) => {
    const date = new Date(log.created_at).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, tokens: 0, cost: 0, requests: 0 };
    }
    acc[date].tokens += log.tokens_used || 0;
    acc[date].cost += log.cost_usd || 0;
    acc[date].requests += 1;
    return acc;
  }, {});

  // Top endpoints
  const endpointUsage = usageLogs.reduce((acc, log) => {
    const endpoint = log.endpoint || 'unknown';
    if (!acc[endpoint]) {
      acc[endpoint] = { endpoint, requests: 0, tokens: 0, cost: 0 };
    }
    acc[endpoint].requests += 1;
    acc[endpoint].tokens += log.tokens_used || 0;
    acc[endpoint].cost += log.cost_usd || 0;
    return acc;
  }, {});

  const topEndpoints = Object.values(endpointUsage)
    .sort((a: any, b: any) => b.requests - a.requests)
    .slice(0, 5);

  return {
    totalTokens,
    totalCost: Math.round(totalCost * 100) / 100, // Round to 2 decimal places
    averageTokensPerRequest: Math.round(averageTokensPerRequest),
    modelUsage,
    dailyUsage: Object.values(dailyUsage).sort((a: any, b: any) => b.date.localeCompare(a.date)),
    topEndpoints
  };
}
