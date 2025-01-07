import { Stack, useRouter } from "expo-router"
import { TextStyle, View, ViewStyle } from "react-native"

import { Icon } from "@/components/common/icon"
import { Screen } from "@/components/common/screen"
import { Button, Text } from "@/components/ui"
import { useAppTheme } from "@/hooks/use-app-theme"

import type { ThemedStyle } from "@/lib/theme"

export default function NotFoundScreen() {
  const router = useRouter()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const handleGoBack = () => {
    // This will navigate back or to the root if there's no history
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace("/")
    }
  }

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={themed($contentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Stack.Screen options={{ title: "Not Found", headerShown: false }} />

      <View style={themed($topSection)}>
        <Icon icon="x" size={64} color={colors.error} />
        <Text
          preset="heading"
          tx="error:notFound.title"
          text="Oops! Page Not Found"
          style={themed($title)}
        />
        <Text
          tx="error:notFound.message"
          text="The page you're looking for doesn't exist or has been moved."
          style={themed($message)}
        />
      </View>

      <Button
        preset="filled"
        tx="common:goBack"
        text="Go Back"
        style={themed($button)}
        onPress={handleGoBack}
      />
    </Screen>
  )
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.lg,
  alignItems: "center",
  justifyContent: "space-between",
})

const $topSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: spacing.md,
  paddingHorizontal: spacing.lg,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.xl,
})

const $message: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.sm,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.xxl,
  marginBottom: spacing.lg,
})
