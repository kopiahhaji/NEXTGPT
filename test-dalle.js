import fs from 'fs';
import path from 'path';

async function testDalleAPI() {
  try {
    console.log('🎨 Testing DALL-E Image Generation API...\n');

    // Load environment variables
    const envVars = loadEnvFile();
    const apiKey = envVars.DALL_E_API_KEY || envVars.OPENAI_API_KEY;

    console.log('📋 Environment Variables Status:');
    console.log('DALL_E_API_KEY:', envVars.DALL_E_API_KEY ? '✅ Found' : '❌ Not found');
    console.log('OPENAI_API_KEY:', envVars.OPENAI_API_KEY ? '✅ Found' : '❌ Not found');
    console.log('');

    if (!apiKey || apiKey === 'sk-xxxx') {
      console.log('❌ OpenAI API key not configured!');
      console.log('Please update your .env.local file with your actual OpenAI API key.');
      return false;
    }

    console.log('🔑 API key configured:', apiKey.substring(0, 12) + '****');

    // Test with an Islamic art prompt
    const prompt = "Beautiful Islamic geometric art with Arabic calligraphy, golden patterns, mosque architecture, spiritual and peaceful, high quality digital art";

    console.log('🎨 Testing with Islamic art prompt:');
    console.log('"' + prompt + '"\n');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3"
      })
    });

    const data = await response.json();

    if (response.ok && data.data && data.data[0]) {
      console.log('\n✅ DALL-E API is working perfectly!');
      console.log('🖼️ Generated image URL:', data.data[0].url);
      console.log('📏 Image size: 1024x1024');
      console.log('🎨 Model used: DALL-E 3');

      console.log('\n🎉 Your Ustaz AI can now generate:');
      console.log('   • Islamic geometric art and patterns');
      console.log('   • Arabic calligraphy visualizations');
      console.log('   • Mosque architecture illustrations');
      console.log('   • Educational diagrams for Islamic studies');
      console.log('   • Spiritual and peaceful imagery');
      console.log('   • Islamic festival decorations');
      console.log('   • Quran verse artistic representations');

      return true;
    } else {
      console.log('❌ API call failed');
      console.log('Response status:', response.status);
      if (data.error) {
        console.log('Error details:', data.error.message);
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

testDalleAPI();
