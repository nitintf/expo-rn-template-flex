import Feather from "@expo/vector-icons/Feather"
import { ViewStyle } from "react-native"

import { Button } from "@/components/ui"
import { useAppTheme } from "@/hooks/use-app-theme"
import { ThemedStyle } from "@/lib/theme"

interface Props {
  /*
   * Function to be called when the button is pressed
   */
  onPress: () => void

  /*
   * Style for the button
   */
  style?: ViewStyle
}

export const ModalCloseButton = ({ onPress, style }: Props) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <Button preset={"filled"} style={[themed($buttonStyles), style]} onPress={onPress} iconButton>
      <Feather name="x" size={16} color={colors.textDim} />
    </Button>
  )
}

const $buttonStyles: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  right: 16,

  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  borderRadius: 100,
  minHeight: 40,
  height: 40,
  width: 40,
})
