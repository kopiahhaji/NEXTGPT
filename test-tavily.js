import fs from 'fs';
import path from 'path';

async function testTavilyAPI() {
  try {
    console.log('🔍 Testing Tavily Search API...\n');

    // Load environment variables
    const envVars = loadEnvFile();
    const apiKey = envVars.TAVILY_API_KEY;

    console.log('📋 Environment Variables Status:');
    console.log('TAVILY_API_KEY:', apiKey ? '✅ Found' : '❌ Not found');
    console.log('');

    if (!apiKey || apiKey === 'your-tavily-api-key-here') {
      console.log('❌ Tavily API key not configured!');
      console.log('Please update your .env.local file with your actual API key.');
      console.log('Get your key from: https://tavily.com/');
      return false;
    }

    console.log('🔑 API key configured:', apiKey.substring(0, 8) + '****');

    // Test with a simple search query
    const query = 'Islamic education';
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        query: query,
        search_depth: 'basic',
        include_answer: true,
        include_images: false,
        max_results: 3
      })
    });

    const data = await response.json();

    if (response.ok && data.results) {
      console.log('\n✅ Tavily API is working perfectly!');
      console.log('🔍 Search query:', query);
      console.log('📊 Results found:', data.results.length);
      console.log('💡 Answer:', data.answer ? data.answer.substring(0, 100) + '...' : 'No direct answer');

      console.log('\n🎉 Your Ustaz AI can now search the web for:');
      console.log('   • Current Islamic news and events');
      console.log('   • Islamic scholarly articles');
      console.log('   • Quran and Hadith references');
      console.log('   • Islamic educational resources');
      console.log('   • Contemporary Islamic discussions');

      return true;
    } else {
      console.log('❌ API call failed');
      console.log('Response status:', response.status);
      if (data.detail) {
        console.log('Error details:', data.detail);
      }
      return false;
    }

  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
}

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

testTavilyAPI();
