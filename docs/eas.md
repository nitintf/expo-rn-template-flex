# EAS Build & Deployment Guide

This guide covers how to use Expo Application Services (EAS) for building and deploying your React Native app.

## 📋 Prerequisites

- Expo CLI installed globally: `npm install -g @expo/cli`
- EAS CLI installed globally: `npm install -g eas-cli`
- Expo account (sign up at [expo.dev](https://expo.dev))
- Project configured with EAS: `eas project:init`

## 🔧 EAS Configuration

The project uses `eas.json` for build configuration with the following profiles:

### Build Profiles

#### Development
- **Purpose**: Development builds with dev client
- **Distribution**: Internal
- **Resource Class**: Medium
- **Command**: `npm run build:dev`

#### Local
- **Purpose**: Local testing builds
- **Distribution**: Internal
- **iOS**: Simulator builds
- **Android**: APK builds
- **Command**: `npm run build:local`

#### Staging
- **Purpose**: Internal testing and QA
- **Distribution**: Internal
- **Resource Class**: Medium
- **Command**: `npm run build:staging`

#### Preview
- **Purpose**: Stakeholder previews
- **Distribution**: Internal
- **Resource Class**: Medium
- **Command**: `npm run build:preview`

#### Production
- **Purpose**: App store releases
- **Distribution**: Store
- **Resource Class**: Medium
- **Command**: `npm run build:prod`

## 🚀 Building Your App

### Development Builds

```bash
# Build for both platforms
npm run build:dev

# Build for specific platform
npm run build:dev:ios
npm run build:dev:android
```

### Staging Builds

```bash
# Build staging version
npm run build:staging

# Platform-specific staging builds
npm run build:staging:ios
npm run build:staging:android
```

### Production Builds

```bash
# Build production version
npm run build:prod

# Platform-specific production builds
npm run build:prod:ios
npm run build:prod:android
```

## 📱 Installing Development Builds

### iOS Development Build

1. **Build the development client**:
   ```bash
   npm run build:dev:ios
   ```

2. **Install on device**:
   - Download the `.ipa` file from EAS dashboard
   - Install via TestFlight or direct installation
   - Or use: `eas build:run --platform ios`

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Connect to development server**:
   - Scan QR code with development build
   - Or enter URL manually

### Android Development Build

1. **Build the development client**:
   ```bash
   npm run build:dev:android
   ```

2. **Install on device**:
   - Download the `.apk` file from EAS dashboard
   - Install directly on Android device
   - Or use: `eas build:run --platform android`

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Connect to development server**:
   - Scan QR code with development build
   - Or enter URL manually

## 📤 Submitting to App Stores

### iOS App Store Submission

1. **Build production version**:
   ```bash
   npm run build:prod:ios
   ```

2. **Submit to App Store**:
   ```bash
   npm run submit:prod:ios
   ```

3. **Configure submission** (first time only):
   - Update `eas.json` with your Apple ID and team ID
   - Set up App Store Connect API key

### Google Play Store Submission

1. **Build production version**:
   ```bash
   npm run build:prod:android
   ```

2. **Submit to Google Play**:
   ```bash
   npm run submit:prod:android
   ```

3. **Configure submission** (first time only):
   - Update `eas.json` with service account key path
   - Set up Google Play Console API access

## 🔄 Over-the-Air (OTA) Updates

### Pushing Updates

```bash
# Push update to development branch
npm run update:dev

# Push update to staging branch
npm run update:staging

# Push update to production branch
npm run update:prod
```

### Update Configuration

Updates are automatically delivered to users with development builds or production apps that support OTA updates.

## 📊 Build Management

### Viewing Builds

```bash
# List all builds
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Cancel running build
eas build:cancel [BUILD_ID]
```

### Build Status

- **In Progress**: Build is currently running
- **Finished**: Build completed successfully
- **Errored**: Build failed with errors
- **Canceled**: Build was canceled

## 🔐 Credentials Management

### iOS Credentials

```bash
# Manage iOS credentials
eas credentials --platform ios

# View current credentials
eas credentials --platform ios --list
```

### Android Credentials

```bash
# Manage Android credentials
eas credentials --platform android

# View current credentials
eas credentials --platform android --list
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with credential errors**:
   ```bash
   eas credentials --platform ios
   eas credentials --platform android
   ```

2. **Build takes too long**:
   - Check resource class in `eas.json`
   - Consider upgrading to higher resource class

3. **Development build won't connect**:
   - Ensure development server is running
   - Check network connectivity
   - Verify URL is correct

### Getting Help

- Check [EAS Build documentation](https://docs.expo.dev/build/introduction/)
- Visit [Expo Discord](https://chat.expo.dev/)
- Check build logs in EAS dashboard

## 📈 Best Practices

1. **Use appropriate build profiles** for different environments
2. **Test builds thoroughly** before submitting to stores
3. **Keep credentials secure** and up to date
4. **Monitor build performance** and optimize as needed
5. **Use OTA updates** for quick bug fixes and feature updates

## 🔗 Useful Links

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Expo Dashboard](https://expo.dev)
