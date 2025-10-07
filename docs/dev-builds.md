# Development Builds Guide

This guide covers how to create, install, and use development builds for your Expo app. Development builds provide a more powerful development experience compared to Expo Go.

## 🎯 What are Development Builds?

Development builds are custom versions of your app that include:
- **Native code**: Full access to native APIs and modules
- **Custom native code**: Your own native modules and libraries
- **Development tools**: Better debugging and development experience
- **Performance**: Closer to production performance

## 🚀 Creating Development Builds

### Prerequisites

- EAS CLI installed: `npm install -g eas-cli`
- Expo account and project configured
- EAS project initialized: `eas project:init`

### Build Commands

```bash
# Build development version for both platforms
npm run build:dev

# Build for specific platform
npm run build:dev:ios
npm run build:dev:android
```

### Build Process

1. **Start the build**:
   ```bash
   npm run build:dev:ios
   ```

2. **Monitor progress**:
   - Check EAS dashboard: [expo.dev](https://expo.dev)
   - Or use CLI: `eas build:list`

3. **Download when complete**:
   - Download from EAS dashboard
   - Or use: `eas build:run --platform ios`

## 📱 Installing Development Builds

### iOS Installation

#### Method 1: TestFlight (Recommended)
1. **Build for TestFlight**:
   ```bash
   npm run build:dev:ios
   ```

2. **Submit to TestFlight**:
   ```bash
   eas submit --platform ios --profile development
   ```

3. **Install via TestFlight**:
   - Open TestFlight app
   - Install your development build
   - Launch the app

#### Method 2: Direct Installation
1. **Build development client**:
   ```bash
   npm run build:dev:ios
   ```

2. **Download .ipa file**:
   - From EAS dashboard
   - Or use: `eas build:run --platform ios`

3. **Install on device**:
   - Use Xcode, Apple Configurator, or third-party tools
   - Or install via USB connection

#### Method 3: EAS Build Run
```bash
# Build and install automatically
eas build:run --platform ios

# Build and install on specific device
eas build:run --platform ios --device [DEVICE_ID]
```

### Android Installation

#### Method 1: Direct APK Installation
1. **Build development client**:
   ```bash
   npm run build:dev:android
   ```

2. **Download .apk file**:
   - From EAS dashboard
   - Or use: `eas build:run --platform android`

3. **Install on device**:
   - Enable "Unknown sources" in Android settings
   - Transfer APK to device
   - Tap to install

#### Method 2: EAS Build Run
```bash
# Build and install automatically
eas build:run --platform android

# Build and install on specific device
eas build:run --platform android --device [DEVICE_ID]
```

#### Method 3: Google Play Internal Testing
1. **Build for internal testing**:
   ```bash
   npm run build:staging:android
   ```

2. **Submit to Google Play**:
   ```bash
   eas submit --platform android --profile staging
   ```

3. **Install via Google Play**:
   - Join internal testing track
   - Install from Google Play Store

## 🔧 Using Development Builds

### Starting Development Server

```bash
# Start development server
npm start

# Start with development client
npm run dev

# Start with clear cache
npm run dev:clear
```

### Connecting to Development Server

1. **Launch development build** on your device
2. **Scan QR code** from terminal
3. **Or enter URL manually**:
   - Development build will show URL input
   - Enter: `exp://192.168.1.100:8081`

### Development Features

#### Hot Reloading
- **Fast Refresh**: Instant updates for React components
- **Live Reloading**: Full app restart on changes
- **Error Overlay**: Detailed error information

#### Debugging
- **React DevTools**: Full React debugging support
- **Flipper**: Advanced debugging and profiling
- **Console Logs**: Real-time console output

#### Performance
- **Native Performance**: Closer to production performance
- **Better Memory Usage**: Optimized for development
- **Faster Builds**: Incremental builds

## 🛠️ Development Workflow

### 1. Initial Setup

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Initialize EAS project
eas project:init

# Build development client
npm run build:dev:ios
npm run build:dev:android
```

### 2. Daily Development

```bash
# Start development server
npm start

# Make changes to your code
# Development build will update automatically

# Test on device
# Use development build to test changes
```

### 3. Testing Native Features

```bash
# Add native dependencies
npm install [native-package]

# Rebuild development client
npm run build:dev:ios
npm run build:dev:android

# Test native features
# Development build includes new native code
```

### 4. Debugging

```bash
# Start with debugging
npm run dev

# Use React DevTools
# Connect to development build

# Check logs
# View console output in terminal
```

## 🔄 Updating Development Builds

### When to Rebuild

- **New native dependencies**: After installing native packages
- **Native code changes**: After modifying native code
- **Configuration changes**: After changing app configuration
- **Performance issues**: When experiencing performance problems

### Rebuild Process

```bash
# Clean rebuild
npm run prebuild:force

# Build new development client
npm run build:dev:ios
npm run build:dev:android

# Install updated build
# Follow installation steps above
```

## 📊 Development Build vs Expo Go

| Feature | Development Build | Expo Go |
|---------|------------------|---------|
| **Native Code** | ✅ Full access | ❌ Limited |
| **Custom Modules** | ✅ Supported | ❌ Not supported |
| **Performance** | ✅ Native performance | ⚠️ Slower |
| **Debugging** | ✅ Full debugging | ⚠️ Limited |
| **Setup** | ⚠️ Requires build | ✅ Instant |
| **Updates** | ⚠️ Requires rebuild | ✅ Instant |

## 🚀 Advanced Features

### Custom Development Client

```bash
# Create custom development client
expo install expo-dev-client

# Add custom native code
# Modify native iOS/Android code

# Rebuild with custom code
npm run build:dev:ios
npm run build:dev:android
```

### Environment-Specific Builds

```bash
# Build for development environment
APP_ENV=development npm run build:dev

# Build for staging environment
APP_ENV=staging npm run build:staging

# Build for production environment
APP_ENV=production npm run build:prod
```

### Multiple Development Builds

```bash
# Build different variants
npm run build:dev:ios
npm run build:staging:ios
npm run build:prod:ios

# Install multiple builds
# Each build can be installed separately
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Build Fails

**Solutions:**
- Check EAS dashboard for error details
- Verify credentials: `eas credentials --platform ios`
- Check project configuration
- Try clean build: `npm run prebuild:force`

#### 2. App Won't Connect

**Solutions:**
- Ensure development server is running
- Check network connectivity
- Verify URL is correct
- Try tunnel mode: `expo start --tunnel`

#### 3. Native Features Don't Work

**Solutions:**
- Rebuild development client
- Check native dependencies
- Verify native code integration
- Check platform-specific code

#### 4. Performance Issues

**Solutions:**
- Use development build instead of Expo Go
- Check for memory leaks
- Optimize React components
- Use production build for testing

### Debugging Tips

1. **Check Build Logs**:
   ```bash
   eas build:list
   eas build:view [BUILD_ID]
   ```

2. **Monitor Development Server**:
   ```bash
   npm start --verbose
   ```

3. **Check Device Logs**:
   ```bash
   # iOS
   xcrun simctl spawn booted log stream --predicate 'process == "YourApp"'
   
   # Android
   adb logcat | grep "YourApp"
   ```

## 📚 Best Practices

### 1. Use Development Builds for Native Features
- Install native dependencies
- Test native functionality
- Debug native code

### 2. Use Expo Go for Quick Iteration
- Rapid prototyping
- UI development
- Basic functionality testing

### 3. Regular Rebuilds
- After adding native dependencies
- After configuration changes
- Weekly maintenance builds

### 4. Environment Management
- Use different builds for different environments
- Test on multiple devices
- Maintain separate development clients

## 🔗 Useful Commands

```bash
# Build development clients
npm run build:dev:ios
npm run build:dev:android

# Start development server
npm start
npm run dev

# Rebuild native code
npm run prebuild:force

# Check build status
eas build:list
eas build:view [BUILD_ID]

# Install builds
eas build:run --platform ios
eas build:run --platform android
```

## 📚 Additional Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Development Builds Guide](https://docs.expo.dev/workflow/development-build/)
- [Custom Development Client](https://docs.expo.dev/clients/introduction/)
- [EAS CLI Reference](https://docs.expo.dev/eas-cli/)
