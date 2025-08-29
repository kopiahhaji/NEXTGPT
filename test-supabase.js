import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};

    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      }
    });

    return envVars;
  } catch (error) {
    console.log('❌ Could not read .env.local file:', error.message);
    return {};
  }
}

async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...\n');

    // Load environment variables
    const envVars = loadEnvFile();

    const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('📋 Environment Variables Status:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Found' : '❌ Not found');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Found' : '❌ Not found');
    console.log('');

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('❌ Missing Supabase credentials!');
      console.log('Please check your .env.local file has the correct values.\n');
      return false;
    }

    if (supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-')) {
      console.log('❌ Placeholder values detected!');
      console.log('Please replace placeholder values with actual Supabase credentials.\n');
      return false;
    }

    console.log('🔗 Connecting to Supabase...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test connection
    const { data, error } = await supabase.auth.getUser();

    if (error && error.message !== 'Auth session missing!') {
      console.log('❌ Connection Error:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful!');
    console.log('🌐 Connected to:', supabaseUrl);
    console.log('🔑 Authentication configured');
    console.log('\n🎉 Ready to proceed with database setup!\n');

    return true;
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
    return false;
  }
}

testSupabaseConnection();
