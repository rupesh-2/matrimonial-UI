// Test script to verify Laravel API connectivity
// Run this with Node.js to test your API endpoints

const API_BASE_URL = 'http://192.168.1.69:8000';

async function testAPI() {
  console.log('🧪 Testing Laravel API Connection...\n');
  
  try {
    // Test 1: Check if server is reachable
    console.log('1️⃣ Testing server connectivity...');
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        age: 28,
        gender: 'male',
        religion: 'Hindu',
        caste: 'Brahmin',
        income: 800000,
        education: 'Masters',
        location: 'Mumbai',
        occupation: 'Software Engineer',
        bio: 'Test user for API testing'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Server is reachable!');
      console.log('📝 Response:', data.message || 'Success');
    } else {
      console.log('⚠️ Server responded with status:', response.status);
      const errorData = await response.json();
      console.log('📝 Error details:', errorData);
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('💡 Make sure your Laravel server is running with: php artisan serve --host=0.0.0.0 --port=8000');
  }
  
  console.log('\n2️⃣ Testing login with sample user...');
  try {
    const loginResponse = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: 'priya@example.com',
        password: 'password123'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful!');
      console.log('👤 User:', loginData.user.name);
      console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
      
      // Test 3: Get recommendations with token
      console.log('\n3️⃣ Testing recommendations endpoint...');
      const recommendationsResponse = await fetch(`${API_BASE_URL}/api/recommendations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Accept': 'application/json',
        }
      });
      
      if (recommendationsResponse.ok) {
        const recommendationsData = await recommendationsResponse.json();
        console.log('✅ Recommendations endpoint working!');
        console.log('📊 Found', recommendationsData.recommendations?.length || 0, 'recommendations');
      } else {
        console.log('⚠️ Recommendations failed:', recommendationsResponse.status);
      }
      
    } else {
      console.log('❌ Login failed:', loginResponse.status);
    }
    
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
  }
  
  console.log('\n🎉 API testing completed!');
}

// Run the test
testAPI();
