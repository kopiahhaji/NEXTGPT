const BASE_URL = 'http://localhost:3000';

async function testUstazAI() {
  console.log('🕌 Testing USTAZ AI API Endpoints...\n');

  try {
    // Test 1: User Registration
    console.log('1. Testing User Registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123',
        name: 'Test User',
        userType: 'beginners'
      }),
    });

    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ Registration successful:', registerData.user);
    } else {
      console.log('❌ Registration failed:', await registerResponse.text());
    }

    // Test 2: User Login
    console.log('\n2. Testing User Login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      }),
    });

    let userId = null;
    let sessionToken = null;

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData.user);
      userId = loginData.user.id;
      sessionToken = loginData.session?.access_token;
    } else {
      console.log('❌ Login failed:', await loginResponse.text());
    }

    // Test 3: Chat API
    if (userId) {
      console.log('\n3. Testing Chat API...');
      const chatResponse = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'What is the meaning of Islam?'
            }
          ],
          userType: 'beginners',
          userId: userId
        }),
      });

      if (chatResponse.ok) {
        const chatData = await chatResponse.json();
        console.log('✅ Chat response successful:');
        console.log('   Model:', chatData.model);
        console.log('   Tokens used:', chatData.tokensUsed);
        console.log('   Cost:', chatData.cost);
        console.log('   Response preview:', chatData.response.substring(0, 100) + '...');
      } else {
        console.log('❌ Chat failed:', await chatResponse.text());
      }

      // Test 4: User Profile
      console.log('\n4. Testing User Profile API...');
      const profileResponse = await fetch(`${BASE_URL}/api/user/profile?userId=${userId}`);

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log('✅ Profile retrieved successfully');
        console.log('   Conversations:', profileData.recentConversations?.length || 0);
        console.log('   Progress items:', profileData.progress?.length || 0);
      } else {
        console.log('❌ Profile retrieval failed:', await profileResponse.text());
      }

      // Test 5: Usage Analytics
      console.log('\n5. Testing Usage Analytics API...');
      const analyticsResponse = await fetch(`${BASE_URL}/api/analytics/usage?userId=${userId}&period=month`);

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        console.log('✅ Analytics retrieved successfully');
        console.log('   Total tokens:', analyticsData.analytics.totalTokens);
        console.log('   Total cost:', analyticsData.analytics.totalCost);
        console.log('   Model usage:', analyticsData.analytics.modelUsage);
      } else {
        console.log('❌ Analytics retrieval failed:', await analyticsResponse.text());
      }
    }

    // Test 6: Islamic Content
    console.log('\n6. Testing Islamic Content API...');
    const contentResponse = await fetch(`${BASE_URL}/api/content/islamic?category=basics&limit=5`);

    if (contentResponse.ok) {
      const contentData = await contentResponse.json();
      console.log('✅ Islamic content retrieved successfully');
      console.log('   Total content:', contentData.total);
      console.log('   Items returned:', contentData.content.length);
    } else {
      console.log('❌ Content retrieval failed:', await contentResponse.text());
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }

  console.log('\n🎉 USTAZ AI API Testing Complete!');
}

// Run the test
testUstazAI();
