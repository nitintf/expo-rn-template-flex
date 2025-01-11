import { ConfigContext, ExpoConfig } from "@expo/config"

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register")

const { Env, ClientEnv } = require("./env")

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
    slug: "Repsy",
    version: Env.VERSION.toString(),
    orientation: "portrait",
    icon: "./assets/images/app-icon-all.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: Env.BUNDLE_ID,
      usesAppleSignIn: true,
    },
    android: {
      icon: "./assets/images/app-icon-android-legacy.png",
      package: Env.PACKAGE,
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon-android-adaptive-foreground.png",
        backgroundImage: "./assets/images/app-icon-android-adaptive-background.png",
      },
    },
    experiments: {
      tsconfigPaths: true,
      typedRoutes: true,
    },
    plugins: [
      "expo-localization",
      "expo-secure-store",
      "expo-apple-authentication",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/app-icon-android-adaptive-foreground.png",
          imageWidth: 300,
          resizeMode: "contain",
          backgroundColor: "#191015",
        },
      ],
      "expo-router",
      require("./plugins/with-splash-screen").withSplashScreen,
    ],
    extra: {
      ...ClientEnv,
      router: {
        origin: false,
      },
      eas: {
        projectId: "f4e819b4-ee87-49e1-8286-5ea9ffac005c",
      },
    },
  }
}
