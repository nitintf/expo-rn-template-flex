import { useEffect, useState } from "react"

import { useFonts } from "@expo-google-fonts/space-grotesk"

import { initI18n } from "@/lib/i18n"
import { loadDateFnsLocale } from "@/utils/format-date"

const customFontsToLoad = {
  SpaceGrotesk_400Regular: require("@expo-google-fonts/space-grotesk/SpaceGrotesk_400Regular.ttf"),
  SpaceGrotesk_700Bold: require("@expo-google-fonts/space-grotesk/SpaceGrotesk_700Bold.ttf"),
}

export function useInitialLoad() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  return {
    isLoaded: fontsLoaded && isI18nInitialized,
    fontError,
  }
}
