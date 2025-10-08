# Bottom Sheet Component

A reusable bottom sheet component built with Gorhom Bottom Sheet that provides an easy-to-use interface for creating modal bottom sheets in your React Native app.

## Features

- 🎯 Easy to use with custom hook
- 🎨 Customizable styling and snap points
- 📱 Smooth animations and gestures
- 🔄 Multiple snap points support
- 🎭 Backdrop tap to close
- 📝 TypeScript support

## Installation

The component is already set up in this project. The required dependencies are:

- `@gorhom/bottom-sheet`
- `react-native-gesture-handler` (already installed)
- `react-native-reanimated` (already installed)

## Usage

### Basic Usage

```tsx
import { BottomSheetComponent } from '@/components/ui';
import { useBottomSheet } from '@/hooks/use-bottom-sheet';

function MyComponent() {
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();

  return (
    <>
      <Button onPress={openBottomSheet} text="Open Bottom Sheet" />
      
      <BottomSheetComponent
        ref={bottomSheetRef}
        title="My Bottom Sheet"
        onOpen={() => console.log('Opened')}
        onClose={() => console.log('Closed')}
      >
        <Text>Your content here</Text>
      </BottomSheetComponent>
    </>
  );
}
```

### Advanced Usage

```tsx
<BottomSheetComponent
  ref={bottomSheetRef}
  title="Advanced Bottom Sheet"
  snapPoints={['25%', '50%', '90%']}
  enablePanDownToClose={true}
  enableOverDrag={true}
  enableDynamicSizing={false}
  showHandle={true}
  backgroundStyle={{ backgroundColor: '#f0f0f0' }}
  handleStyle={{ backgroundColor: 'transparent' }}
  handleIndicatorStyle={{ backgroundColor: '#333' }}
  onOpen={() => console.log('Opened')}
  onClose={() => console.log('Closed')}
>
  <ScrollView>
    <Text>Your scrollable content here</Text>
  </ScrollView>
</BottomSheetComponent>
```

## Hook Methods

The `useBottomSheet` hook provides the following methods:

- `openBottomSheet()` - Opens the bottom sheet to the first snap point
- `closeBottomSheet()` - Closes the bottom sheet
- `expandBottomSheet()` - Expands to the second snap point
- `fullScreenBottomSheet()` - Expands to the last snap point

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to display in the bottom sheet |
| `snapPoints` | `string[]` | `['25%', '50%', '90%']` | Array of snap points for the bottom sheet |
| `enablePanDownToClose` | `boolean` | `true` | Allow closing by panning down |
| `enableOverDrag` | `boolean` | `true` | Allow dragging beyond snap points |
| `enableDynamicSizing` | `boolean` | `false` | Enable dynamic sizing based on content |
| `onClose` | `() => void` | - | Callback when bottom sheet closes |
| `onOpen` | `() => void` | - | Callback when bottom sheet opens |
| `title` | `string` | - | Optional title displayed at the top |
| `showHandle` | `boolean` | `true` | Show the drag handle |
| `backgroundStyle` | `object` | - | Custom background styling |
| `handleStyle` | `object` | - | Custom handle styling |
| `handleIndicatorStyle` | `object` | - | Custom handle indicator styling |

## Example

Check out the main app screen (`src/app/index.tsx`) for a complete working example that demonstrates:

- Opening and closing the bottom sheet
- Multiple snap points
- Form inputs inside the bottom sheet
- Custom styling and callbacks

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Using the style props (`backgroundStyle`, `handleStyle`, `handleIndicatorStyle`)
2. Adding custom Tailwind classes to the content
3. Modifying the default styles in the component file

## Notes

- The component requires `GestureHandlerRootView` to be set up in your app root (already configured)
- Make sure to use the `ref` from the hook to control the bottom sheet programmatically
- The component is fully typed with TypeScript for better development experience
