# Repsy

[![React Native](https://img.shields.io/badge/React%20Native-0.76.3-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2050-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-8.x-4B32C3.svg)](https://eslint.org/)
[![Jest](https://img.shields.io/badge/Jest-29.x-C21325.svg)](https://jestjs.io/)

A React Native application built with Expo and TypeScript.

## 🚀 Tech Stack

- [React Native](https://reactnative.dev/) - A framework for building native apps using React
- [Expo](https://expo.dev/) - A platform for making universal native apps
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [React Navigation](https://reactnavigation.org/) - Routing and navigation
- [i18n](https://www.i18next.com/) - Internationalization framework

## 📋 Prerequisites

- [Bun](https://bun.sh/) (Latest version)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [iOS Simulator](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)

## 🛠 Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Repsy
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   - Copy `.env.development` to create your local environment file
   - Update the necessary environment variables

4. Start the development server:
   ```bash
   bun start
   ```

## 📱 Running the App

- iOS Simulator: Press `i` in the terminal or run `bun run ios`
- Android Emulator: Press `a` in the terminal or run `bun run android`
- Web: Press `w` in the terminal or run `bun run web`

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Generate test coverage report
bun test:coverage
```

## 🔧 Available Scripts

- `bun run dev` - Start the Expo development server
- `bun run ios` - Run on iOS simulator
- `bun run android` - Run on Android emulator
- `bun run web` - Run on web browser
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint errors
- `bun run type-check` - Run TypeScript type checking
- `bun run test` - Run tests

## 📁 Project Structure

```
├── @types/              # TypeScript type definitions
├── assets/              # Static assets (images, fonts, etc.)
├── src/
│   ├── app/            # App navigation and screens
│   ├── components/     # Reusable components
│   ├── config/        # App configuration
│   ├── features/      # Feature-specific code
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Third-party library configurations
│   └── utils/         # Utility functions
├── test/              # Test setup and configurations
└── .github/           # GitHub Actions workflows
```

## 🔍 Code Quality

- ESLint for code linting
- Prettier for code formatting
- Husky for Git hooks
- GitHub Actions for CI/CD

## 🧪 Testing Tools

- Jest for unit and integration testing
- Maestro for E2E testing

## 📱 App Configuration

- `app.config.ts` - Expo configuration
- `babel.config.js` - Babel configuration
- `tsconfig.json` - TypeScript configuration
- `metro.config.js` - Metro bundler configuration

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.