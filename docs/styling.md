# Styling with TailwindCSS & CVA

This project uses TailwindCSS with NativeWind for styling React Native components, and CVA (Class Variance Authority) for creating consistent UI component variants.

## 🎨 Overview

- **TailwindCSS**: Utility-first CSS framework
- **NativeWind**: TailwindCSS for React Native
- **CVA**: Class Variance Authority for component variants
- **Configuration**: `tailwind.config.js`

## 📦 Dependencies

```json
{
  "nativewind": "4.2.1",
  "tailwindcss": "3.4.17",
  "class-variance-authority": "^0.7.1",
  "react-native-css-interop": "^0.2.1"
}
```

## 🚀 Basic Usage

### Simple Components

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

### Using the cn Utility

```tsx
import { cn } from '@/utils/cn';

// Conditional classes
<View className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50'
)}>
```

## 🎯 CVA for UI Components

### Creating Component Variants

```tsx
import { cva } from 'class-variance-authority';
import { TouchableOpacity, Text } from 'react-native';
import { cn } from '@/utils/cn';
import type { VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes
  'flex-row items-center justify-center rounded-lg min-h-touch px-4 py-3',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 shadow-md',
        secondary: 'bg-gray-500',
        destructive: 'bg-red-500',
        outline: 'border border-blue-500 bg-transparent',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'min-h-10 px-3 py-2',
        md: 'min-h-touch px-4 py-3',
        lg: 'min-h-12 px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariants {
  title: string;
  onPress: () => void;
  className?: string;
}

export function Button({ 
  title, 
  onPress, 
  variant, 
  size, 
  className 
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size }), className)}
      onPress={onPress}
    >
      <Text className="text-white font-medium text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
```

### Complex Variants with Multiple States

```tsx
const textFieldVariants = cva(
  'flex-row items-center border-b px-0 py-3 min-h-12',
  {
    variants: {
      status: {
        default: 'border-gray-300',
        error: 'border-red-500',
        disabled: 'border-gray-300 opacity-50',
      },
      focused: {
        true: 'border-blue-500',
        false: '',
      },
    },
    defaultVariants: {
      status: 'default',
      focused: false,
    },
  },
);

// Usage
<View className={textFieldVariants({ 
  status: hasError ? 'error' : 'default',
  focused: isFocused 
})}>
```

### Text Component with Presets

```tsx
const textVariants = cva(
  'text-base font-normal',
  {
    variants: {
      preset: {
        default: 'text-base font-normal',
        bold: 'font-bold',
        heading: 'text-4xl font-bold',
        subheading: 'text-xl font-medium',
        formLabel: 'text-base font-medium',
        formHelper: 'text-sm font-normal text-gray-500',
      },
      size: {
        xxs: 'text-xs',
        xs: 'text-sm',
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
      },
    },
    defaultVariants: {
      preset: 'default',
    },
  },
);

// Usage
<Text preset="heading" size="xl">Main Title</Text>
<Text preset="formLabel">Field Label</Text>
<Text preset="formHelper">Helper text</Text>
```

## 🎯 Essential Utility Classes

### Layout & Spacing

```tsx
// Flexbox
className="flex-1 flex-row justify-center items-center"

// Spacing
className="p-4 m-2 px-6 py-3 gap-4"

// Sizing
className="w-full h-screen w-1/2 h-64"
```

### Colors & Typography

```tsx
// Colors
className="bg-blue-500 text-white border-gray-300"

// Typography
className="text-lg font-bold text-center"
```

## 🎯 Best Practices

### 1. Use CVA for All UI Components

```tsx
// ✅ Good - Use CVA for consistent variants
<Button variant="primary" size="lg">Submit</Button>

// ❌ Avoid - Manual class combinations
<TouchableOpacity className="bg-blue-500 px-6 py-4 rounded-lg">
```

### 2. Create Semantic Variants

```tsx
// Use meaningful variant names
variants: {
  variant: {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    destructive: 'bg-red-500', // Not just 'red'
  }
}
```

### 3. Combine CVA with cn Utility

```tsx
<View className={cn(
  cardVariants({ variant, size }),
  isSelected && 'ring-2 ring-blue-500',
  className
)}>
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
    },
  },
}
```

## 🔗 Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [CVA Documentation](https://cva.style/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
