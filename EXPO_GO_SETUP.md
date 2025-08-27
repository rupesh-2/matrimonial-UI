# Expo Go + Laravel Backend Setup Guide

## Problem
You're using Expo Go on an Android device and can't connect to your local Laravel server.

## Solution

### Step 1: Restart Laravel Server with Network Access

**Stop your current Laravel server** (Ctrl+C in the terminal where it's running), then restart it with:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

This makes the server accessible from any device on your network.

### Step 2: Verify Server is Accessible

After restarting, you should see:
```
Starting Laravel development server: http://0.0.0.0:8000
```

### Step 3: Test Connection from Your Computer

Open your browser and go to:
- `http://127.0.0.1:8000/api/register` (should work)
- `http://192.168.1.69:8000/api/register` (should also work)

### Step 4: Test from Your Android Device

1. Make sure your Android device is connected to the same WiFi network as your computer
2. Open a browser on your Android device
3. Go to: `http://192.168.1.69:8000/api/register`
4. You should see a response (even if it's an error page)

### Step 5: Update Your React Native App

The API configuration has been updated to use your computer's IP address (`192.168.1.69:8000`) for Android devices.

### Step 6: Restart Your Expo Development Server

```bash
# Stop your current Expo server (Ctrl+C)
# Then restart it
npx expo start
```

### Step 7: Test the App

1. Open Expo Go on your Android device
2. Scan the QR code
3. Try to login or register
4. Check the console for connection status

## Troubleshooting

### If Still Not Working:

1. **Check Windows Firewall**:
   - Open Windows Defender Firewall
   - Allow PHP/Laravel through the firewall
   - Or temporarily disable firewall for testing

2. **Check Antivirus**:
   - Some antivirus software blocks local servers
   - Add an exception for port 8000

3. **Verify Network**:
   - Both devices must be on the same WiFi network
   - Try using your phone's hotspot if needed

4. **Alternative IP Address**:
   - Your IP might change if you reconnect to WiFi
   - Run `ipconfig` again to get the current IP
   - Update the API configuration if needed

### Quick Test Commands:

```bash
# Check if server is running on all interfaces
netstat -an | findstr :8000

# Should show: TCP    0.0.0.0:8000    0.0.0.0:0    LISTENING

# Get your current IP
ipconfig | findstr "IPv4"
```

### Common Issues:

1. **"Network Error"**: Server not accessible from device
2. **"Connection Refused"**: Server not running or wrong IP
3. **"Timeout"**: Firewall blocking connection

## Success Indicators

When working correctly, you should see:
- Laravel server running on `0.0.0.0:8000`
- No network errors in your React Native app
- Successful API calls from your Android device

## Next Steps

Once the connection is working:
1. Test login/register functionality
2. Test other API endpoints
3. Monitor the Laravel server logs for incoming requests
