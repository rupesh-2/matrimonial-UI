# Server Connection Troubleshooting

## "Unable to connect to server" Error

If you're getting this error, it means your React Native app cannot connect to the Laravel backend server.

## Quick Fixes

### 1. Check if Laravel Server is Running

Make sure your Laravel backend server is running:

```bash
# Navigate to your Laravel project directory
cd your-laravel-project

# Start the Laravel development server
php artisan serve
```

You should see output like:

```
Starting Laravel development server: http://127.0.0.1:8000
```

### 2. Check the API URL Configuration

The app is configured to use different URLs based on your platform:

- **Android Emulator**: `http://10.0.2.2:8000`
- **iOS Simulator**: `http://127.0.0.1:8000`
- **Physical Device**: Use your computer's IP address (e.g., `192.168.1.100:8000`)

### 3. Test Server Connection

Use the "Check Server" button in the login screen to test connectivity.

## Detailed Troubleshooting

### For Android Emulator

1. Make sure Laravel server is running on `127.0.0.1:8000`
2. The emulator will automatically route `10.0.2.2` to your host machine's `127.0.0.1`

### For iOS Simulator

1. Make sure Laravel server is running on `127.0.0.1:8000`
2. The simulator can directly access `127.0.0.1`

### For Physical Device

1. Find your computer's IP address:

   ```bash
   # On Windows
   ipconfig

   # On Mac/Linux
   ifconfig
   ```

2. Start Laravel server on all interfaces:

   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

3. Update the API URL in `constants/api.ts` to use your computer's IP address

### Common Issues

1. **Firewall blocking connections**: Allow port 8000 through your firewall
2. **CORS issues**: Make sure your Laravel app has proper CORS configuration
3. **Wrong port**: Ensure Laravel is running on port 8000
4. **Network restrictions**: Some networks block local development servers

## Laravel Backend Requirements

Your Laravel backend should have these endpoints:

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/user` - Get current user
- `POST /api/logout` - User logout
- `GET /api/health` - Health check (optional)

## Testing the Connection

1. Open your browser and go to `http://127.0.0.1:8000/api/register`
2. You should see a response (even if it's an error page)
3. If you get "Connection refused", the server is not running

## Need Help?

1. Check the console logs for detailed error messages
2. Use the "Check Server" button in the app
3. Verify your Laravel server is running and accessible
4. Check your network configuration
