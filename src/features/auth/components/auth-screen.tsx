import { useRef } from "react"

import { LinearGradient } from "expo-linear-gradient"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"

import AutoFadeCarousel from "@/components/common/auto-fade-carousel"
import { Button, Text } from "@/components/ui"
import { Config } from "@/config"
import SignInBottomSheet, {
  SignInBottomSheetRef,
} from "@/features/auth/components/signin-bottomsheet"
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
  const signinBottomSheetRef = useRef<SignInBottomSheetRef>(null)

  const $containerInsets = useSafeAreaInsetsStyle(["bottom", "top"])
  const { themed } = useAppTheme()

  return (
    <>
      <AutoFadeCarousel images={AUTH_SCREEN_IMAGES} fadeDuration={1000} stillDuration={5000} />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
        locations={[0, 0.7]}
        style={$gradient}
      />
      <View style={[$topContainer, $containerInsets]}>
        <Text preset="heading" text="REPSY" style={themed($appNameStyles)} />
      </View>
      <View style={[themed($bottomContainer), $containerInsets]}>
        <View style={themed($headingContainerStyles)}>
          <Text preset="heading" text="GET FIT," style={themed($headingStyles)} />
          <Text preset="heading" text="GET STRONG," style={themed($headingStyles)} />
          <Text preset="heading" text="GET HEALTHY!" style={themed($headingStyles)} />
        </View>
        <Text
          preset="default"
          weight={"semiBold"}
          text="Track your workouts. Get personalized help. Achieve your goals with AI."
          style={themed($subheadingStyles)}
        />
        <View style={themed($buttonContainerStyles)}>
          <Button preset={"primary"} onPress={() => signinBottomSheetRef.current?.open()}>
            Get Started
          </Button>
        </View>
        <Text text={"V" + Config.VERSION} preset="formHelper" style={themed($versionTextStyles)} />
      </View>
      <SignInBottomSheet ref={signinBottomSheetRef} />
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

const $appNameStyles: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100,
  fontFamily: typography.fonts.kanit.bold,
  fontSize: 22,
  fontWeight: "900",
})

const $headingContainerStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.md - 5,
})

const $headingStyles: ThemedStyle<TextStyle> = ({ colors, spacing, typography }) => ({
  fontFamily: typography.fonts.kanit.bold,
  color: colors.palette.neutral100,
  marginBottom: spacing.xxs,
  lineHeight: 40,
  fontWeight: "900",
})

const $subheadingStyles: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral400,
  paddingBottom: spacing.sm,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  marginBottom: spacing.xl,
})

const $topContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: [{ translateX: "-50%" }],
}

const $versionTextStyles: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral400,
  textAlign: "center",
  paddingTop: spacing.sm,
})

const $buttonContainerStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
