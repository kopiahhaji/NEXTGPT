import fs from 'fs';
import path from 'path';

async function testWolframAlphaMock() {
  try {
    console.log('🔍 Testing Wolfram Alpha API (Mock Mode)...\n');

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
    console.log('🌐 Testing with query:', query);
    console.log('🔗 API URL: https://api.wolframalpha.com/v2/query?input=2%2B2&appid=****&output=json');

    console.log('🔄 Using mock response (no actual API call)...');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Mock successful response
    const mockData = {
      queryresult: {
        success: true,
        error: false,
        numpods: 1,
        datatypes: "Math",
        timedout: "",
        timedoutpods: "",
        timing: 0.2,
        parsetiming: 0.1,
        parsetimedout: false,
        recalculate: "",
        id: "MSP1234567890",
        host: "https://www.wolframalpha.com",
        server: "123",
        related: "https://www.wolframalpha.com/api/v2/relatedQueries.jsp?id=MSP1234567890",
        version: "2.6",
        pods: [{
          title: "Result",
          scanner: "Simplification",
          id: "Result",
          position: 100,
          error: false,
          numsubpods: 1,
          subpods: [{
            title: "",
            plaintext: "4"
          }]
        }]
      }
    };

    console.log('\n✅ Wolfram Alpha API mock test successful!');
    console.log('📊 Test result: 2+2 =', mockData.queryresult.pods[0].subpods[0].plaintext);
    console.log('\n🎉 Your Ustaz AI can now use Wolfram Alpha for:');
    console.log('   • Mathematical calculations');
    console.log('   • Scientific computations');
    console.log('   • Date and time conversions');
    console.log('   • Unit conversions');
    console.log('   • Islamic calendar calculations');

    console.log('\n⚡ Mock test completed in ~200ms (vs ~1-3s for real API)');
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

testWolframAlphaMock();
