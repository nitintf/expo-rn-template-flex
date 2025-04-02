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
      try {
        const flatStyles = Array.isArray(styleOrStyleFn) ? styleOrStyleFn.flat(3) : [styleOrStyleFn]

        return flatStyles.reduce<T>((acc, style) => {
          const styleValue = typeof style === "function" ? style(theme) : style
          // Ensure we're only spreading object types
          if (styleValue && typeof styleValue === "object") {
            return { ...acc, ...styleValue }
          }
          return acc
        }, {} as T)
      } catch (error) {
        console.error("Error in themed function:", error)
        return {} as T
      }
    },
    [theme],
  )

  return useMemo(
    () => ({
      navTheme,
      setThemeContextOverride,
      theme,
      themeContext,
      themed,
    }),
    [navTheme, setThemeContextOverride, theme, themeContext, themed],
  )
}
