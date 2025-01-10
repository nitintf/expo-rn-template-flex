import { ViewStyle } from "react-native"

import { Screen } from "@/components/common/screen"
import AuthScreen from "@/features/auth/components/auth-screen"
import { useAppTheme } from "@/hooks/use-app-theme"
import { ThemedStyle } from "@/lib/theme"

export default function AuthPage() {
  const { themed } = useAppTheme()

  return (
    <Screen statusBarStyle={"light"} contentContainerStyle={themed($container)}>
      <AuthScreen />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})
