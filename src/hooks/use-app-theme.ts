import { useCallback, useContext, useMemo } from "react"

import { DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import { StyleProp } from "react-native"

import {
  getThemeFromContext,
  type Theme,
  ThemeContext,
  type ThemeContexts,
  type ThemedStyle,
  type ThemedStyleArray,
} from "@/lib/theme"

interface UseAppThemeValue {
  navTheme: typeof DefaultTheme
  setThemeContextOverride: (newTheme: ThemeContexts) => void
  theme: Theme
  themeContext: ThemeContexts
  themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => T
}

export const useAppTheme = (): UseAppThemeValue => {
  const navTheme = useNavTheme()
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider")
  }

  const { themeScheme: overrideTheme, setThemeContextOverride } = context

  const themeContext = useMemo(
    () => overrideTheme || (navTheme.dark ? "dark" : "light"),
    [overrideTheme, navTheme.dark],
  )

  const theme = useMemo(() => getThemeFromContext(themeContext), [themeContext])

  const themed = useCallback(
    <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>): T => {
      const flatStyles = [styleOrStyleFn].flat(3)
      return Object.assign(
        {},
        ...flatStyles.map((style) => (typeof style === "function" ? style(theme) : style)),
      ) as T
    },
    [theme],
  )

  return {
    navTheme,
    setThemeContextOverride,
    theme,
    themeContext,
    themed,
  }
}
