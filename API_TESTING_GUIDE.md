# API Testing Guide for React Native App

## 🎯 Current Status

✅ **Network Connection**: Working (no more ERR_NETWORK errors)  
✅ **API Configuration**: Correct endpoints configured  
✅ **Authentication Flow**: Improved error handling  
⚠️ **Next Step**: Test login/register functionality  

## 🧪 Testing Steps

### Step 1: Verify Laravel Server is Running

Make sure your Laravel server is running with network access:

```bash
# Stop current server (Ctrl+C)
# Then restart with:
php artisan serve --host=0.0.0.0 --port=8000
```

You should see: `Starting Laravel development server: http://0.0.0.0:8000`

### Step 2: Test API from Your Computer

Open your browser and test these URLs:

1. **Registration Test**: `http://192.168.1.69:8000/api/register`
2. **Login Test**: `http://192.168.1.69:8000/api/login`

You should see a response (even if it's an error page) - this confirms the server is accessible.

### Step 3: Test from Your Android Device

1. Open a browser on your Android device
2. Go to: `http://192.168.1.69:8000/api/register`
3. You should see a response (confirms network connectivity)

### Step 4: Test the React Native App

1. **Restart your Expo development server**:
   ```bash
   npx expo start
   ```

2. **Open the app on your Android device**

3. **Check console logs** for these messages:
   - `[AuthProvider] No stored token found, user needs to login` ✅
   - `User not authenticated, skipping recommendations load` ✅

4. **Try to register a new user**:
   - Go to the registration screen
   - Use the sample data from the API documentation
   - Check console for successful registration

5. **Try to login**:
   - Use one of the sample users from the documentation:
     - Email: `priya@example.com`
     - Password: `password123`

## 📋 Sample Test Data

### Registration Test Data

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "age": 28,
  "gender": "male",
  "religion": "Hindu",
  "caste": "Brahmin",
  "income": 800000,
  "education": "Masters",
  "location": "Mumbai",
  "occupation": "Software Engineer",
  "bio": "Looking for a life partner"
}
```

### Login Test Data

Use any of these pre-seeded users:

| Email | Password | Name |
|-------|----------|------|
| `priya@example.com` | `password123` | Priya Sharma |
| `rahul@example.com` | `password123` | Rahul Patel |
| `aisha@example.com` | `password123` | Aisha Khan |
| `amit@example.com` | `password123` | Amit Singh |

## 🔍 Expected Behavior

### Before Login:
- ✅ 401 errors are normal and expected
- ✅ App redirects to login screen
- ✅ No recommendations load
- ✅ Console shows: `[AuthProvider] No stored token found, user needs to login`

### After Successful Login:
- ✅ No more 401 errors
- ✅ User data loads properly
- ✅ Recommendations appear
- ✅ Console shows: `User authenticated, loading recommendations...`

## 🐛 Troubleshooting

### If Registration/Login Fails:

1. **Check Laravel Logs**:
   ```bash
   # In your Laravel project directory
   tail -f storage/logs/laravel.log
   ```

2. **Verify Database**:
   ```bash
   php artisan migrate:status
   php artisan db:seed
   ```

3. **Test API Directly**:
   ```bash
   # Test registration
   curl -X POST http://192.168.1.69:8000/api/register \
     -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "password_confirmation": "password123",
       "age": 28,
       "gender": "male",
       "religion": "Hindu",
       "caste": "Brahmin",
       "income": 800000,
       "education": "Masters",
       "location": "Mumbai",
       "occupation": "Software Engineer",
       "bio": "Test user"
     }'
   ```

### If Still Getting Network Errors:

1. **Check Windows Firewall**:
   - Allow PHP/Laravel through firewall
   - Or temporarily disable firewall for testing

2. **Verify Network**:
   - Both devices on same WiFi network
   - Try using phone hotspot if needed

3. **Check IP Address**:
   ```bash
   ipconfig | findstr "IPv4"
   ```
   - Update API configuration if IP changed

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. **Network**: No ERR_NETWORK errors
2. **Authentication**: Successful login/registration
3. **Data Loading**: User profile and recommendations load
4. **Console Logs**: Clean, informative messages
5. **App Functionality**: All features work as expected

## 📱 Next Steps After Testing

Once the basic authentication is working:

1. **Test Recommendations**: Verify matchmaking works
2. **Test Likes**: Try liking/unliking users
3. **Test Matches**: Verify mutual matching
4. **Test Messages**: Try sending messages to matched users
5. **Test Profile Updates**: Update user profile and preferences

## 🆘 Need Help?

If you encounter issues:

1. Check the console logs for specific error messages
2. Verify Laravel server is running with `--host=0.0.0.0`
3. Test API endpoints directly in browser/Postman
4. Check Laravel logs for backend errors
5. Ensure both devices are on the same network

The 401 error you were seeing is now expected behavior for unauthenticated users. The real test is whether login/registration works properly! 🚀
