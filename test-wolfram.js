import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

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

async function testWolframAlpha() {
  try {
    console.log('🔍 Testing Wolfram Alpha API...\n');

    // Load environment variables
    const envVars = loadEnvFile();
    const appId = envVars.WOLFRAM_ALPHA_APPID;

    console.log('📋 Environment Variables Status:');
    console.log('WOLFRAM_ALPHA_APPID:', appId ? '✅ Found' : '❌ Not found');
    console.log('');

    if (!appId || appId === 'your-wolfram-alpha-appid-here') {
      console.log('❌ Wolfram Alpha App ID not configured!');
      console.log('Please update your .env.local file with your actual App ID.');
      console.log('Current value:', appId);
      return false;
    }

    console.log('🔑 App ID configured:', appId.substring(0, 4) + '****');

    // Test with a simple query
    const query = '2+2';
    const url = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&appid=${appId}&output=json`;

    console.log('🌐 Testing with query:', query);
    console.log('🔗 API URL:', url.replace(appId, '****'));

    const response = await fetch(url);
    const data = await response.json();

    if (data.queryresult && data.queryresult.success) {
      console.log('\n✅ Wolfram Alpha API is working perfectly!');
      console.log('📊 Test result: 2+2 =', data.queryresult.pods[0].subpods[0].plaintext);
      console.log('\n🎉 Your Ustaz AI can now use Wolfram Alpha for:');
      console.log('   • Mathematical calculations');
      console.log('   • Scientific computations');
      console.log('   • Date and time conversions');
      console.log('   • Unit conversions');
      console.log('   • Islamic calendar calculations');
      return true;
    } else {
      console.log('❌ API call failed');
      if (data.queryresult && data.queryresult.error) {
        console.log('Error details:', data.queryresult.error);
      }
      return false;
    }

  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
}

testWolframAlpha();
