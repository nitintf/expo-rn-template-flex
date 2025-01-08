import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react"

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native"
import * as SystemUI from "expo-system-ui"
import { useColorScheme } from "react-native"

import { type Theme, type ThemeContexts, lightTheme, darkTheme } from "@/lib/theme"

interface ThemeContextType {
  themeScheme: ThemeContexts
  setThemeContextOverride: (newTheme: ThemeContexts) => void
}

// Create context with a meaningful default value
export const ThemeContext = createContext<ThemeContextType | null>(null)

// Memoized theme conversion function
export const getThemeFromContext = (themeContext: ThemeContexts): Theme =>
  themeContext === "dark" ? darkTheme : lightTheme

export const setSystemTheme = (theme: Theme) => {
  SystemUI.setBackgroundColorAsync(theme.colors.background)
}

interface ThemeProviderProps extends PropsWithChildren {
  initialTheme?: ThemeContexts
}

export const ThemeProvider = ({ children, initialTheme }: ThemeProviderProps) => {
  const colorScheme = useColorScheme()
  const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme)

  const themeScheme = overrideTheme || colorScheme || "light"
  const navigationTheme = useMemo(
    () => (themeScheme === "dark" ? DarkTheme : DefaultTheme),
    [themeScheme],
  )

  const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
    setTheme(newTheme)
  }, [])

  // Apply system theme changes
  useEffect(() => {
    const theme = getThemeFromContext(themeScheme)
    setSystemTheme(theme)
  }, [themeScheme])

  const contextValue = useMemo(
    () => ({
      themeScheme,
      setThemeContextOverride,
    }),
    [themeScheme, setThemeContextOverride],
  )

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
    </NavigationThemeProvider>
  )
}
