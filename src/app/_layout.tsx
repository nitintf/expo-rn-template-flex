import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';

import { useInitialLoad } from '@/hooks/use-initial-load';
import { DevTools } from '@/lib/devtools/query-devtools';
import { QueryProvider } from '@/lib/query-client/query-provider';

import type { ViewStyle } from 'react-native';

SplashScreen.preventAutoHideAsync().catch((error: unknown) => {
  console.error('Error preventing auto hide:', error);
});

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  import('src/lib/devtools/reactotron-config').catch(console.error);
}

export default function RootLayout() {
  const { isLoaded } = useInitialLoad();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync().catch((error: unknown) => {
        console.error('Error hiding splash screen:', error);
      });
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <QueryProvider>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <GestureHandlerRootView style={$containerStyles}>
          <KeyboardProvider>
            <Slot />
            {DevTools && <DevTools />}
            <ToastManager theme="dark" position="bottom" borderRadius={12} />
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryProvider>
  );
}

const $containerStyles: ViewStyle = {
  flex: 1,
};
