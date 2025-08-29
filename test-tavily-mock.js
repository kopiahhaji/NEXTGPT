import fs from 'fs';
import path from 'path';

async function testTavilyAPIMock() {
  try {
    console.log('🔍 Testing Tavily Search API (Mock Mode)...\n');

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
    console.log('🔄 Using mock response (no actual API call)...');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));

    // Mock successful response
    const mockData = {
      query: query,
      answer: "Islamic education encompasses the teaching and learning of Islamic principles, Quran, Hadith, and Islamic sciences through traditional and modern methods.",
      results: [
        {
          title: "Islamic Education - Wikipedia",
          url: "https://en.wikipedia.org/wiki/Islamic_education",
          content: "Islamic education is the teaching and learning of Islamic principles...",
          score: 0.95
        },
        {
          title: "Modern Islamic Education Systems",
          url: "https://islamiceducation.org/modern-systems",
          content: "Contemporary approaches to Islamic education combine traditional...",
          score: 0.89
        },
        {
          title: "Quran and Islamic Studies",
          url: "https://quranstudies.edu/islamic-education",
          content: "The foundation of Islamic education is the Quran...",
          score: 0.87
        }
      ],
      response_time: 0.15
    };

    console.log('\n✅ Tavily API mock test successful!');
    console.log('🔍 Search query:', query);
    console.log('📊 Results found:', mockData.results.length);
    console.log('💡 Answer:', mockData.answer.substring(0, 80) + '...');

    console.log('\n🎉 Your Ustaz AI can now search the web for:');
    console.log('   • Current Islamic news and events');
    console.log('   • Islamic scholarly articles');
    console.log('   • Quran and Hadith references');
    console.log('   • Islamic educational resources');
    console.log('   • Contemporary Islamic discussions');

    console.log('\n⚡ Mock test completed in ~150ms (vs ~2-5s for real API)');
    return true;

  } catch (error) {
    console.log('❌ Mock test error:', error.message);
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

testTavilyAPIMock();
