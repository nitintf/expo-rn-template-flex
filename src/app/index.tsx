import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { Screen } from "@/components/common/screen"
import { Text } from "@/components/ui"
import { Config } from "@/config"
import { useAppTheme } from "@/hooks/use-app-theme"
import { useSafeAreaInsetsStyle } from "@/hooks/use-safe-area-insets-style"
import { isRTL } from "@/lib/i18n"
import { ThemedStyle } from "@/lib/theme"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

export default function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { theme, themed } = useAppTheme()

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text text={Config.VERSION} preset="subheading" />
        <Image
          style={$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
        />
      </View>

      <View style={[themed($bottomContainer), $bottomContainerInsets]}>
        <Text tx="welcomeScreen:postscript" size="md" />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
