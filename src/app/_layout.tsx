import { useEffect } from "react"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Slot } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { ViewStyle } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { useInitialLoad } from "@/hooks/use-initial-load"
import { ThemeProvider } from "@/lib/theme"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/lib/devtools/reactotron-config.ts")
}

export { ErrorBoundary } from "@/components/common/error-boundary"

export default function RootLayout() {
  const { isLoaded } = useInitialLoad()

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
      <ThemeProvider>
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
