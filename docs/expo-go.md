# Starting on Different Platforms with Expo Go

This guide covers how to start your Expo app on different platforms using Expo Go, the official Expo client app.

## 📱 Prerequisites

- Expo Go app installed on your device
- Development server running on your computer
- Device and computer on the same network

## 🚀 Quick Start

### 1. Start Development Server

```bash
# Start the development server
npm start

# Or with specific environment
npm run env:dev
npm run env:staging
npm run env:prod
```

### 2. Connect with Expo Go

- **iOS**: Open Expo Go and scan the QR code
- **Android**: Open Expo Go and scan the QR code
- **Manual**: Enter the URL shown in terminal

## 📱 Platform-Specific Instructions

### iOS (iPhone/iPad)

#### Method 1: QR Code Scan
1. Open **Expo Go** app on your iOS device
2. Tap **"Scan QR Code"**
3. Point camera at the QR code in your terminal
4. App will automatically load

#### Method 2: Manual URL Entry
1. Open **Expo Go** app
2. Tap **"Enter URL manually"**
3. Enter the URL from your terminal (e.g., `exp://192.168.1.100:8081`)
4. Tap **"Connect"**

#### Method 3: Share Link
1. Copy the share link from terminal
2. Send it to yourself via Messages/Email
3. Tap the link on your iOS device
4. Expo Go will open automatically

### Android (Phone/Tablet)

#### Method 1: QR Code Scan
1. Open **Expo Go** app on your Android device
2. Tap **"Scan QR Code"**
3. Point camera at the QR code in your terminal
4. App will automatically load

#### Method 2: Manual URL Entry
1. Open **Expo Go** app
2. Tap **"Enter URL manually"**
3. Enter the URL from your terminal (e.g., `exp://192.168.1.100:8081`)
4. Tap **"Connect"**

#### Method 3: Share Link
1. Copy the share link from terminal
2. Send it to yourself via WhatsApp/Email
3. Tap the link on your Android device
4. Expo Go will open automatically

### Web Browser

#### Method 1: Direct URL
1. Open your web browser
2. Navigate to `http://localhost:8081`
3. App will load in the browser

#### Method 2: Expo CLI
```bash
# Start web development server
npm run web
```

## 🌐 Network Configuration

### Local Network (Recommended)

```bash
# Start with LAN access
npm start --lan

# Or use the --lan flag
expo start --lan
```

**Benefits:**
- Faster loading
- More reliable connection
- Works with physical devices

### Tunnel (For External Access)

```bash
# Start with tunnel
npm start --tunnel

# Or use the --tunnel flag
expo start --tunnel
```

**Benefits:**
- Works from anywhere
- No network configuration needed
- Good for testing with remote devices

**Drawbacks:**
- Slower loading
- Less reliable
- Requires internet connection

## 🔧 Troubleshooting

### Common Issues

#### 1. "Unable to connect to server"

**Solutions:**
- Ensure device and computer are on same network
- Check firewall settings
- Try tunnel mode: `expo start --tunnel`
- Restart development server

#### 2. QR Code not scanning

**Solutions:**
- Ensure good lighting
- Clean camera lens
- Try manual URL entry
- Use share link instead

#### 3. App loads but shows errors

**Solutions:**
- Check terminal for error messages
- Clear Expo Go cache
- Restart development server
- Check network connection

#### 4. Slow loading

**Solutions:**
- Use LAN mode instead of tunnel
- Close other apps on device
- Check network speed
- Restart development server

### Network Setup

#### Windows
1. Open Windows Defender Firewall
2. Allow Expo through firewall
3. Ensure network profile is "Private"

#### macOS
1. Open System Preferences > Security & Privacy
2. Allow Expo through firewall
3. Check network settings

#### Linux
1. Configure iptables if needed
2. Allow port 8081 through firewall
3. Check network configuration

## 📱 Device-Specific Tips

### iPhone/iPad
- **iOS 13+**: Expo Go works with all iOS versions
- **Camera**: Use built-in camera app to scan QR codes
- **Network**: Ensure device is on same Wi-Fi network

### Android
- **Android 5+**: Expo Go works with Android 5.0+
- **Camera**: Use built-in camera app to scan QR codes
- **Network**: Ensure device is on same Wi-Fi network

### Physical Devices vs Simulators

#### Physical Devices (Recommended)
- **Pros**: Real device testing, better performance, actual hardware
- **Cons**: Requires network setup, slower iteration

#### Simulators/Emulators
- **Pros**: Faster iteration, no network issues, easier debugging
- **Cons**: Not real device testing, different performance

## 🚀 Advanced Usage

### Custom Development Server

```bash
# Start with custom port
expo start --port 3000

# Start with custom host
expo start --host 192.168.1.100

# Start with specific platform
expo start --ios
expo start --android
expo start --web
```

### Environment Variables

```bash
# Start with development environment
APP_ENV=development npm start

# Start with staging environment
APP_ENV=staging npm start

# Start with production environment
APP_ENV=production npm start
```

### Debugging

```bash
# Start with debugging enabled
expo start --dev-client

# Start with clear cache
expo start --clear

# Start with no cache
expo start --no-cache
```

## 📊 Performance Tips

### 1. Use LAN Mode
- Faster than tunnel mode
- More reliable connection
- Better for development

### 2. Close Unused Apps
- Free up device memory
- Improve app performance
- Reduce network congestion

### 3. Stable Network
- Use 5GHz Wi-Fi if available
- Avoid crowded networks
- Check network speed

### 4. Regular Restarts
- Restart development server periodically
- Clear Expo Go cache
- Restart device if needed

## 🔗 Useful Commands

```bash
# Start development server
npm start

# Start with specific options
npm start --lan
npm start --tunnel
npm start --clear

# Start web version
npm run web

# Start with environment
npm run env:dev
npm run env:staging
npm run env:prod
```

## 📚 Additional Resources

- [Expo Go Documentation](https://docs.expo.dev/get-started/expo-go/)
- [Expo CLI Documentation](https://docs.expo.dev/workflow/expo-cli/)
- [Troubleshooting Guide](https://docs.expo.dev/troubleshooting/clear-cache/)
- [Network Configuration](https://docs.expo.dev/workflow/development-build/)
