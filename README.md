# Expo Temp

A modern React Native app built with Expo, featuring TypeScript, TailwindCSS, and comprehensive development tooling.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

## 📱 About This Project

This is a well-structured Expo project that demonstrates modern React Native development practices with:

- **Expo SDK 54** with Expo Router for navigation
- **TypeScript** for type safety
- **TailwindCSS** with NativeWind for styling
- **EAS Build** for app building and deployment
- **Comprehensive tooling** for development, testing, and deployment

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Styling**: TailwindCSS + NativeWind
- **Navigation**: Expo Router
- **State Management**: React hooks
- **Build System**: EAS Build
- **Package Manager**: pnpm

## 📚 Documentation

### Development Guides

- **[Commands Reference](./docs/commands.md)** - Complete reference for all available commands
- **[EAS Build & Deployment](./docs/eas.md)** - Guide for building and deploying your app
- **[Styling with TailwindCSS](./docs/styling.md)** - How to style your app with TailwindCSS
- **[Expo Go Setup](./docs/expo-go.md)** - Starting your app on different platforms
- **[Development Builds](./docs/dev-builds.md)** - Creating and using development builds

### Quick Links

- [Commands Reference](./docs/commands.md) - All available npm scripts
- [EAS Configuration](./docs/eas.md) - Build and deployment setup
- [Styling Guide](./docs/styling.md) - TailwindCSS usage
- [Platform Setup](./docs/expo-go.md) - Running on iOS/Android/Web
- [Dev Builds](./docs/dev-builds.md) - Custom development clients

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Expo CLI: `npm install -g @expo/cli`
- EAS CLI: `npm install -g eas-cli`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expo-temp

# Install dependencies
pnpm install

# Start development server
npm start
```

### Development

```bash
# Start with Expo Go
npm start

# Start with development client
npm run dev

# Run on specific platform
npm run ios
npm run android
npm run web
```

## 🔧 Available Scripts

### Development
- `npm start` - Start Expo development server
- `npm run dev` - Start with development client
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Start web development server

### Building
- `npm run build:dev` - Build development version
- `npm run build:staging` - Build staging version
- `npm run build:prod` - Build production version

### Quality Assurance
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript checks
- `npm run check` - Run all quality checks

### Utilities
- `npm run clean` - Clean cache and build files
- `npm run prebuild` - Generate native code
- `npm run doctor` - Check project health

## 📱 Platform Support

- **iOS**: 13.0+
- **Android**: API 21+ (Android 5.0)
- **Web**: Modern browsers

## 🏗️ Project Structure

```
src/
├── app/                 # Expo Router pages
├── components/          # Reusable components
│   ├── common/         # Common components
│   └── ui/            # UI components
├── hooks/              # Custom React hooks
├── lib/               # Libraries and utilities
├── utils/             # Utility functions
└── styles/            # Global styles
```

## 🎨 Styling

This project uses TailwindCSS with NativeWind for styling:

```tsx
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-gray-800">
        Hello World
      </Text>
    </View>
  );
}
```

See [Styling Guide](./docs/styling.md) for more details.

## 🚀 Deployment

### EAS Build

```bash
# Build for development
npm run build:dev

# Build for staging
npm run build:staging

# Build for production
npm run build:prod
```

### App Store Submission

```bash
# Submit to iOS App Store
npm run submit:prod:ios

# Submit to Google Play Store
npm run submit:prod:android
```

See [EAS Guide](./docs/eas.md) for detailed deployment instructions.

## 🔧 Configuration

### Environment Variables

The project supports multiple environments:

- **Development**: `.env.development`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

### EAS Configuration

Build profiles are configured in `eas.json`:

- **development**: Development builds with dev client
- **staging**: Internal testing builds
- **production**: App store builds

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Dependencies

### Core Dependencies
- `expo` - Expo SDK
- `react` - React library
- `react-native` - React Native framework
- `expo-router` - File-based routing

### Styling
- `nativewind` - TailwindCSS for React Native
- `tailwindcss` - Utility-first CSS framework

### Development
- `typescript` - TypeScript support
- `eslint` - Code linting
- `prettier` - Code formatting
- `vitest` - Testing framework

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run quality checks: `npm run check`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

## 📞 Support

For questions and support:

- Check the [documentation](./docs/) folder
- Review [Expo documentation](https://docs.expo.dev/)
- Join [Expo Discord](https://chat.expo.dev/)

---

**Happy coding! 🚀**
