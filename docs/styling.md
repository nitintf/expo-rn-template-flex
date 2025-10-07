# Styling with TailwindCSS

This project uses TailwindCSS with NativeWind for styling React Native components. This guide covers how to use TailwindCSS effectively in your Expo app.

## 🎨 Overview

- **TailwindCSS**: Utility-first CSS framework
- **NativeWind**: TailwindCSS for React Native
- **Configuration**: `tailwind.config.js`
- **Global Styles**: `src/global.css`

## 📦 Dependencies

```json
{
  "nativewind": "4.2.1",
  "tailwindcss": "3.4.17",
  "react-native-css-interop": "^0.2.1"
}
```

## 🚀 Getting Started

### Basic Usage

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

### Common Patterns

```tsx
// Container with padding and background
<View className="flex-1 bg-gray-100 p-4">

// Text with multiple styles
<Text className="text-lg font-semibold text-blue-600 mb-2">

// Button styling
<TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
  <Text className="text-white font-medium text-center">
    Click Me
  </Text>
</TouchableOpacity>

// Flexbox layouts
<View className="flex-row justify-between items-center">

// Responsive design
<View className="w-full md:w-1/2 lg:w-1/3">
```

## 🎯 Utility Classes

### Layout

```tsx
// Flexbox
className="flex-1"           // flex: 1
className="flex-row"         // flexDirection: 'row'
className="flex-col"         // flexDirection: 'column'
className="justify-center"   // justifyContent: 'center'
className="items-center"     // alignItems: 'center'
className="justify-between"  // justifyContent: 'space-between'

// Positioning
className="absolute"         // position: 'absolute'
className="relative"         // position: 'relative'
className="top-0"            // top: 0
className="right-0"          // right: 0

// Sizing
className="w-full"           // width: '100%'
className="h-screen"        // height: '100vh'
className="w-1/2"           // width: '50%'
className="h-64"            // height: 256px
```

### Spacing

```tsx
// Padding
className="p-4"             // padding: 16px
className="px-4"            // paddingHorizontal: 16px
className="py-2"            // paddingVertical: 8px
className="pt-4"            // paddingTop: 16px

// Margin
className="m-4"             // margin: 16px
className="mx-auto"         // marginHorizontal: 'auto'
className="my-2"            // marginVertical: 8px
className="mt-8"            // marginTop: 32px

// Gap
className="gap-4"           // gap: 16px
className="gap-x-2"         // columnGap: 8px
className="gap-y-4"         // rowGap: 16px
```

### Colors

```tsx
// Background colors
className="bg-white"        // backgroundColor: 'white'
className="bg-gray-100"     // backgroundColor: '#f3f4f6'
className="bg-blue-500"     // backgroundColor: '#3b82f6'
className="bg-red-600"      // backgroundColor: '#dc2626'

// Text colors
className="text-black"      // color: 'black'
className="text-gray-600"   // color: '#4b5563'
className="text-blue-500"   // color: '#3b82f6'
className="text-white"      // color: 'white'

// Border colors
className="border-gray-300"  // borderColor: '#d1d5db'
className="border-blue-500"  // borderColor: '#3b82f6'
```

### Typography

```tsx
// Font sizes
className="text-xs"         // fontSize: 12px
className="text-sm"         // fontSize: 14px
className="text-base"       // fontSize: 16px
className="text-lg"         // fontSize: 18px
className="text-xl"         // fontSize: 20px
className="text-2xl"        // fontSize: 24px

// Font weights
className="font-normal"     // fontWeight: '400'
className="font-medium"     // fontWeight: '500'
className="font-semibold"   // fontWeight: '600'
className="font-bold"       // fontWeight: '700'

// Text alignment
className="text-left"       // textAlign: 'left'
className="text-center"     // textAlign: 'center'
className="text-right"      // textAlign: 'right'
```

### Borders & Radius

```tsx
// Borders
className="border"          // borderWidth: 1
className="border-2"        // borderWidth: 2
className="border-gray-300"  // borderColor: '#d1d5db'

// Border radius
className="rounded"         // borderRadius: 4px
className="rounded-lg"      // borderRadius: 8px
className="rounded-xl"      // borderRadius: 12px
className="rounded-full"    // borderRadius: 9999px
```

## 🎨 Custom Components

### Creating Styled Components

```tsx
// components/ui/Button.tsx
import { TouchableOpacity, Text } from 'react-native';
import { cn } from '@/utils/cn';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  className 
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium';
  
  const variantClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    outline: 'border border-blue-500 bg-transparent'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };
  
  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-blue-500'
  };
  
  return (
    <TouchableOpacity
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onPress={onPress}
    >
      <Text className={cn('text-center', textColorClasses[variant])}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

### Using the cn Utility

```tsx
import { cn } from '@/utils/cn';

// Conditional classes
<View className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
)}>

// Combining classes
<Text className={cn(
  'text-lg font-medium',
  error && 'text-red-500',
  success && 'text-green-500'
)}>
```

## 📱 Platform-Specific Styling

### iOS vs Android Differences

```tsx
import { Platform } from 'react-native';

// Platform-specific classes
<View className={cn(
  'p-4 rounded-lg',
  Platform.OS === 'ios' && 'shadow-sm',
  Platform.OS === 'android' && 'elevation-2'
)}>

// Using platform-specific utilities
<Text className="text-base font-medium ios:font-semibold android:font-normal">
```

## 🎨 Dark Mode Support

### Using Dark Mode Classes

```tsx
// Dark mode variants
<View className="bg-white dark:bg-gray-900">
<Text className="text-gray-900 dark:text-white">

// Automatic dark mode
<View className="bg-gray-100 dark:bg-gray-800">
<Text className="text-gray-800 dark:text-gray-200">
```

## 🎯 Best Practices

### 1. Use Semantic Class Names

```tsx
// Good
<View className="flex-1 bg-white p-4">
<Text className="text-lg font-semibold text-gray-800">

// Better - use component variants
<View className="container">
<Text className="heading">
```

### 2. Create Reusable Components

```tsx
// Create styled components instead of repeating classes
<Button variant="primary" size="lg">Submit</Button>
<Card className="mb-4">Content</Card>
```

### 3. Use Conditional Styling

```tsx
// Use cn utility for conditional classes
<View className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
)}>
```

### 4. Organize Styles

```tsx
// Group related styles
<View className="flex-1 bg-gray-100 p-4 rounded-lg shadow-sm">
  <Text className="text-xl font-bold text-gray-800 mb-2">
    Title
  </Text>
  <Text className="text-gray-600 leading-relaxed">
    Description
  </Text>
</View>
```

## 🔧 Configuration

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
      },
      fontFamily: {
        'space-grotesk': ['SpaceGrotesk_400Regular'],
      },
    },
  },
  plugins: [],
}
```

### Global Styles

```css
/* src/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container {
    @apply flex-1 bg-white p-4;
  }
  
  .heading {
    @apply text-xl font-bold text-gray-800 mb-2;
  }
  
  .button-primary {
    @apply bg-blue-500 px-4 py-2 rounded-lg;
  }
}
```

## 🚀 Advanced Features

### Custom Utilities

```tsx
// Add custom utilities in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

### Responsive Design

```tsx
// Responsive classes (web only)
<View className="w-full md:w-1/2 lg:w-1/3">
<Text className="text-sm md:text-base lg:text-lg">
```

## 🔗 Useful Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TailwindCSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [React Native Styling Guide](https://reactnative.dev/docs/style)
