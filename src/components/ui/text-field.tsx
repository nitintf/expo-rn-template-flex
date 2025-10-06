import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"

import {
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import { isRTL, translate } from "@/lib/i18n"
import { cn } from "@/utils/cn"

import { Text, TextProps } from "./text"

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Optional container style override.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Optional component to render below the input.
   * Example: `BottomAccessory={(props) => <View {...props} />}`
   */
  BottomAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Optional component to render above the input.
   * Example: `TopAccessory={(props) => <View {...props} />}`
   */
  TopAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Additional Tailwind classes for the container
   */
  containerClassName?: string
  /**
   * Additional Tailwind classes for the input wrapper
   */
  inputWrapperClassName?: string
  /**
   * Additional Tailwind classes for the input
   */
  className?: string
  /**
   * Additional Tailwind classes for the label
   */
  labelClassName?: string
  /**
   * Additional Tailwind classes for the helper text
   */
  helperClassName?: string
}

export interface TextFieldRef {
  focus: () => void
  blur: () => void
  clear: () => void
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef<TextFieldRef, TextFieldProps>(function TextField(
  props: TextFieldProps,
  ref: Ref<TextFieldRef>,
) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helperTx,
    helper,
    helperTxOptions,
    status,
    LeftAccessory,
    RightAccessory,
    TopAccessory,
    BottomAccessory,
    HelperTextProps,
    LabelTextProps,
    containerStyle,
    inputWrapperStyle,
    style: $inputStyleOverride,
    containerClassName = "",
    inputWrapperClassName = "",
    className = "",
    labelClassName = "",
    helperClassName = "",
    ...TextInputProps
  } = props

  const input = useRef<TextInput>(null)

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const labelContent = labelTx ? translate(labelTx, labelTxOptions) : label

  const helperContent = helperTx ? translate(helperTx, helperTxOptions) : helper

  useImperativeHandle(ref, () => ({
    focus: () => input.current?.focus(),
    blur: () => input.current?.blur(),
    clear: () => input.current?.clear(),
  }))

  const $containerStyles = [
    containerStyle,
  ]

  const $inputWrapperStyles = [
    inputWrapperStyle,
  ]

  const $inputStyles = [
    $inputStyleOverride,
  ]

  const $labelStyles = [
    LabelTextProps?.style,
  ]

  const $helperStyles = [
    HelperTextProps?.style,
  ]

  const getStatusClasses = () => {
    switch (status) {
      case "error":
        return {
          input: "border-red-500 bg-red-50",
          label: "text-red-700",
          helper: "text-red-600"
        }
      case "disabled":
        return {
          input: "border-gray-300 bg-gray-100 text-gray-500",
          label: "text-gray-500",
          helper: "text-gray-400"
        }
      default:
        return {
          input: "border-gray-300 bg-white focus:border-primary-500",
          label: "text-gray-700",
          helper: "text-gray-500"
        }
    }
  }

  const statusClasses = getStatusClasses()

  const inputWrapperClasses = cn(
    "flex-row items-center border rounded-lg px-3 py-2 min-h-12",
    statusClasses.input,
    disabled && "opacity-50",
    inputWrapperClassName
  )

  const inputClasses = cn(
    "flex-1 text-base text-gray-900",
    isRTL ? "text-right" : "text-left",
    className
  )

  const labelClasses = cn(
    "text-sm font-medium mb-1",
    statusClasses.label,
    labelClassName
  )

  const helperClasses = cn(
    "text-sm mt-1",
    statusClasses.helper,
    helperClassName
  )

  return (
    <View className={cn("w-full", containerClassName)} style={$containerStyles}>
      {TopAccessory && (
        <TopAccessory
          style={$inputWrapperStyles}
          status={status}
          multiline={!!TextInputProps.multiline}
          editable={!disabled}
        />
      )}

      {!!labelContent && (
        <Text
          preset="formLabel"
          text={labelContent}
          {...LabelTextProps}
          className={labelClasses}
          style={$labelStyles}
        />
      )}

      <View className={inputWrapperClasses} style={$inputWrapperStyles}>
        {LeftAccessory && (
          <LeftAccessory
            style={$inputStyles}
            status={status}
            multiline={!!TextInputProps.multiline}
            editable={!disabled}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid="transparent"
          textAlignVertical={TextInputProps.multiline ? "top" : "center"}
          placeholderTextColor="#9CA3AF"
          className={inputClasses}
          style={$inputStyles}
          {...TextInputProps}
          editable={!disabled}
          placeholder={placeholderContent}
        />

        {RightAccessory && (
          <RightAccessory
            style={$inputStyles}
            status={status}
            multiline={!!TextInputProps.multiline}
            editable={!disabled}
          />
        )}
      </View>

      {BottomAccessory && (
        <BottomAccessory
          style={$inputWrapperStyles}
          status={status}
          multiline={!!TextInputProps.multiline}
          editable={!disabled}
        />
      )}

      {!!helperContent && (
        <Text
          preset="formHelper"
          text={helperContent}
          {...HelperTextProps}
          className={helperClasses}
          style={$helperStyles}
        />
      )}
    </View>
  )
})