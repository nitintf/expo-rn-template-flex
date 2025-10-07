import { router } from 'expo-router';
import { Platform } from 'react-native';
import { ArgType } from 'reactotron-core-client';

import packageJson from '../../../package.json';

import { Reactotron } from './reactotron-client';

import type { Href } from 'expo-router';

const reactotron = Reactotron.configure({
  name: packageJson.name,
  onConnect: () => {
    Reactotron.clear();
  },
});

if (Platform.OS !== 'web') {
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  });
}

reactotron.onCustomCommand<[{ name: 'route'; type: ArgType.String }]>({
  command: 'navigateTo',
  handler: (args) => {
    const { route } = args ?? {};
    if (route) {
      Reactotron.log(`Navigating to: ${route}`);
      router.push(route as Href);
    } else {
      Reactotron.log('Could not navigate. No route provided.');
    }
  },
  title: 'Navigate To Screen',
  description: 'Navigates to a screen by name.',
  args: [{ name: 'route', type: ArgType.String }],
});

reactotron.onCustomCommand({
  title: 'Go Back',
  description: 'Goes back',
  command: 'goBack',
  handler: () => {
    Reactotron.log('Going back');
    router.back();
  },
});

console.tron = reactotron;

declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance, and more.
     * @see https://github.com/infinitered/reactotron
     * @example
     * if (__DEV__) {
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     */
    tron: typeof reactotron;
  }
}

reactotron.connect();
