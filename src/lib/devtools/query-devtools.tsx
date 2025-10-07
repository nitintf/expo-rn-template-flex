import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Platform } from 'react-native';

// Only import devtools in development
let DevTools: React.ComponentType | null = null;

if (__DEV__ && Platform.OS === 'web') {
  DevTools = ReactQueryDevtools;
}

export { DevTools };
