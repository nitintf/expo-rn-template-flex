import type { ConfigContext, ExpoConfig } from '@expo/config';

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require('ts-node/register');

const { Env, ClientEnv } = require('./env');

/**
 * @param config ExpoConfig coming from the static config old-app.json if it exists
 *
 * You can read more about Expo's Configuration Resolution Rules here:
 * https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
 */
module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    name: Env.NAME,
    description: `${Env.NAME} Mobile App`,
    scheme: Env.SCHEME,
    slug: 'expo-temp',
    version: Env.VERSION,
    orientation: 'portrait',
    icon: "./assets/images/app-icon-all.png",
    userInterfaceStyle: 'automatic',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: Env.BUNDLE_ID,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: Env.PACKAGE,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      'expo-localization',
      'expo-secure-store',
      'expo-font',
      [
        'expo-splash-screen',
        {
          image: './assets/images/app-icon-android-adaptive-foreground.png',
          imageWidth: 300,
          resizeMode: 'contain',
          backgroundColor: '#191015',
        },
      ],
      'expo-router',
      require('./plugins/with-splash-screen').withSplashScreen,
    ] as ExpoConfig['plugins'],
    extra: {
      ...ClientEnv,
      router: {
        origin: false,
      },
      eas: {
        projectId: Env.EAS_PROJECT_ID,
      },
    },
  };
};
