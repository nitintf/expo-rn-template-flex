# Commands Reference

This document provides a comprehensive reference for all available commands in this Expo project.

## 🚀 Development Commands

### Basic Development
```bash
npm start                    # Start Expo development server
npm run android              # Run on Android device/emulator
npm run ios                  # Run on iOS device/simulator
npm run web                  # Start web development server
```

### Environment-Specific Development
```bash
npm run env:dev              # Start with development environment
npm run env:staging          # Start with staging environment
npm run env:prod             # Start with production environment
```

## 🔨 Build Commands

### Development Builds
```bash
npm run build:dev            # Build development version (both platforms)
npm run build:dev:ios        # Build development version (iOS only)
npm run build:dev:android    # Build development version (Android only)
```

### Local Builds
```bash
npm run build:local          # Build for local testing (both platforms)
npm run build:local:ios      # Build for iOS simulator
npm run build:local:android  # Build Android APK
```

### Staging Builds
```bash
npm run build:staging       # Build staging version (both platforms)
npm run build:staging:ios    # Build staging version (iOS only)
npm run build:staging:android # Build staging version (Android only)
```

### Preview Builds
```bash
npm run build:preview       # Build preview version (both platforms)
npm run build:preview:ios    # Build preview version (iOS only)
npm run build:preview:android # Build preview version (Android only)
```

### Production Builds
```bash
npm run build:prod          # Build production version (both platforms)
npm run build:prod:ios       # Build production version (iOS only)
npm run build:prod:android   # Build production version (Android only)
```

## 📤 Submit Commands

### Staging Submissions
```bash
npm run submit:staging      # Submit to both stores (staging)
npm run submit:staging:ios   # Submit to TestFlight
npm run submit:staging:android # Submit to Google Play (internal track)
```

### Production Submissions
```bash
npm run submit:prod         # Submit to both stores (production)
npm run submit:prod:ios      # Submit to App Store
npm run submit:prod:android  # Submit to Google Play (production track)
```

## 🔄 Update Commands

### OTA Updates
```bash
npm run update:dev          # Push OTA update to development branch
npm run update:staging      # Push OTA update to staging branch
npm run update:prod         # Push OTA update to production branch
```

## 🔨 Prebuild Commands

### Basic Prebuild
```bash
npm run prebuild            # Standard prebuild for all platforms
npm run prebuild:clean      # Clean prebuild (removes existing native code)
npm run prebuild:clear      # Clear prebuild cache
```

### Platform-Specific Prebuild
```bash
npm run prebuild:ios        # Prebuild only for iOS
npm run prebuild:android    # Prebuild only for Android
npm run prebuild:web        # Prebuild only for web
npm run prebuild:all        # Explicitly prebuild for all platforms
```

### Reset & Force Commands
```bash
npm run prebuild:reset      # Clean and clear prebuild (fresh start)
npm run prebuild:force      # Force clean, clear, and rebuild all platforms
```

## 🧹 Cleanup Commands

```bash
npm run clean               # Clean cache and build directories
npm run clean:install       # Clean and reinstall dependencies
npm run reset               # Complete reset of node_modules and lock file
```

## 🔧 Utility Commands

### Development Tools
```bash
npm run setup:adb           # Setup ADB port forwarding
npm run check:health        # Check project health with expo-doctor
npm run open:xcode          # Open Xcode project
```

### Patch Management
```bash
npm run apply:patches       # Apply patch-package patches
npm run postinstall         # Run postinstall hooks
```

## ✅ Quality Assurance Commands

### Linting & Formatting
```bash
npm run lint                # Run ESLint
npm run format              # Format code with Prettier
npm run typecheck           # Run TypeScript type checking
```

### Spell Checking
```bash
npm run spell               # Check spelling
npm run spell:fix           # Fix spelling issues
```

### Code Analysis
```bash
npm run knip                # Find unused files, dependencies, and exports
```

## 📝 Git & Commit Commands

```bash
npm run commit              # Interactive commit with commitizen
npm run prepare             # Setup husky git hooks
```

## 🧪 Testing Commands

```bash
npm test                    # Run tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run tests with coverage
npm run test:ui             # Run tests with UI interface
```

## 📊 Bundle Analysis

```bash
npm run analyze             # Analyze bundle size
npm run bundle:ios          # Export iOS bundle
npm run bundle:android      # Export Android bundle
npm run bundle:web          # Export web bundle
```

## 🌐 Web Commands

```bash
npm run web:build           # Build web version
npm run web:serve           # Build and serve web version
```

## Quick Reference

### Most Common Commands
- `npm start` - Start development server
- `npm run build:dev` - Build development version
- `npm run build:prod` - Build production version
- `npm run submit:prod` - Submit to app stores
- `npm run prebuild` - Generate native code
- `npm run check` - Run all quality checks

### Troubleshooting Commands
- `npm run clean` - Clean cache
- `npm run reset` - Reset everything
- `npm run check:health` - Check project health
- `npm run prebuild:force` - Force rebuild native code
