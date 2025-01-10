import { LinearGradient } from "expo-linear-gradient"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"

import AutoFadeCarousel from "@/components/common/auto-fade-carousel"
import { Button, Text } from "@/components/ui"
import { Config } from "@/config"
import { useAppTheme } from "@/hooks/use-app-theme"
import { useSafeAreaInsetsStyle } from "@/hooks/use-safe-area-insets-style"
import { ThemedStyle } from "@/lib/theme"

const screenHeight = Dimensions.get("screen").height

const AUTH_SCREEN_IMAGES = [
  require("assets/images/auth/workout-carousel1.jpg"),
  require("assets/images/auth/workout-carousel3.jpg"),
  require("assets/images/auth/workout-carousel4.jpg"),
  require("assets/images/auth/workout-carousel2.jpg"),
  require("assets/images/auth/workout-carousel5.jpg"),
]

export default function AuthScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const { themed } = useAppTheme()

  return (
    <>
      <AutoFadeCarousel images={AUTH_SCREEN_IMAGES} fadeDuration={1000} stillDuration={5000} />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
        locations={[0, 0.7]}
        style={$gradient}
      />
      <View style={[themed($bottomContainer), $bottomContainerInsets]}>
        <Text preset="heading" text="REPSY" style={themed($appNameStyles)} />
        <Text
          preset="subheading"
          text="Track your workouts. Get personalized help. Achieve your goals with AI."
          style={themed($subheadingStyles)}
        />
        <View>
          <Button>Sign In</Button>
        </View>
        <Text text={Config.VERSION} preset="formHelper" style={themed($versionTextStyles)} />
      </View>
    </>
  )
}

const $gradient: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: screenHeight * 0.4,
}

const $appNameStyles: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  marginBottom: spacing.md,
})

const $subheadingStyles: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  marginBottom: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  marginBottom: spacing.xl,
})

const $versionTextStyles: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  textAlign: "center",
  paddingTop: spacing.sm,
})
