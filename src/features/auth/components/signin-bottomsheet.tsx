import { forwardRef, Ref, useImperativeHandle, useRef } from "react"

import AntDesign from "@expo/vector-icons/AntDesign"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import { TextStyle, View, ViewStyle } from "react-native"

import { ModalCloseButton } from "@/components/common/modal-close-button"
import { Button, Text } from "@/components/ui"
import { useAppTheme } from "@/hooks/use-app-theme"
import { ThemedStyle } from "@/lib/theme"

export interface SignInBottomSheetRef {
  open: () => void
  close: () => void
}

const SignInBottomSheet = forwardRef<SignInBottomSheetRef>(
  (_props, ref: Ref<SignInBottomSheetRef>) => {
    const bottomSheetRef = useRef<BottomSheet>(null)

    const { themed } = useAppTheme()

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.expand()
      },
      close: () => {
        bottomSheetRef.current?.close()
      },
    }))

    const handleAppleSignIn = async () => {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        console.log(appleAuthRequestResponse)
      } catch (error: any) {
        if (error.code === appleAuth.Error.CANCELED) {
          console.warn("User canceled Apple Sign in.")
        } else {
          console.error(error)
        }
      }
    }

    return (
      <BottomSheet ref={bottomSheetRef} index={-1} enablePanDownToClose snapPoints={["40%"]}>
        <BottomSheetView style={themed($bottomSheetViewStyles)}>
          <ModalCloseButton onPress={() => bottomSheetRef.current?.close()} />
          <View style={themed($topContainerStyles)}></View>
          <Text preset={"heading"} text={"Get Started"} />
          <Text
            text={"Transform Your Physique and Achieve Your Fitness Goals with Repsy."}
            style={themed($textStyles)}
          />
          <View style={themed($buttonsContainerStyles)}>
            <Button preset={"reversed"}>Continue as Guest</Button>
            <View style={themed($socialButtonContainerStyles)}>
              <Button
                onPress={() => handleAppleSignIn()}
                style={themed($socialButtonStyles)}
                preset={"filled"}
                iconButton
              >
                <AntDesign name="apple1" size={24} color="black" />
              </Button>
              <Button style={themed($socialButtonStyles)} preset={"filled"} iconButton>
                <AntDesign name={"google"} size={24} color="black" />
              </Button>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

SignInBottomSheet.displayName = "SignInBottomSheet"

const $bottomSheetViewStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "relative",
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
})

const $topContainerStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.md,
})

const $textStyles: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginVertical: spacing.xs,
})

const $buttonsContainerStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})

const $socialButtonContainerStyles: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  marginTop: spacing.sm,
  gap: spacing.sm,
})

const $socialButtonStyles: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

export default SignInBottomSheet
