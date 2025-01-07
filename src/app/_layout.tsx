import { useEffect } from "react"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { ViewStyle } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useThemeProvider } from "@/hooks/use-app-theme"
import { useInitialLoad } from "@/hooks/use-initial-load"

SplashScreen.preventAutoHideAsync()

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
})

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/reactotron-config.ts")
}

export { Index } from "@/components/common/error-boundary"

export default function Root() {
  const { isLoaded } = useInitialLoad()
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync()
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={$containerStyles}>
      <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const $containerStyles: ViewStyle = {
  flex: 1,
}
