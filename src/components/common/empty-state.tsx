import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { translate } from "@/lib/i18n"
import { cn } from "@/utils/cn"

import { Button, ButtonProps } from "../ui/button"
import { Text, TextProps } from "../ui/text"

const sadFace = require("assets/images/sad-face.png")

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: "generic"
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: TextProps["tx"]
  /**
   * Optional heading options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Content text which is looked up via i18n.
   */
  contentTx?: TextProps["tx"]
  /**
   * Optional content options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  contentTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: ButtonProps["text"]
  /**
   * Button text which is looked up via i18n.
   */
  buttonTx?: ButtonProps["tx"]
  /**
   * Optional button options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  buttonTxOptions?: ButtonProps["txOptions"]
  /**
   * Style overrides for button.
   */
  buttonStyle?: ButtonProps["style"]
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
  /**
   * Additional Tailwind classes for the container
   */
  className?: string
  /**
   * Additional Tailwind classes for the image
   */
  imageClassName?: string
  /**
   * Additional Tailwind classes for the heading
   */
  headingClassName?: string
  /**
   * Additional Tailwind classes for the content
   */
  contentClassName?: string
  /**
   * Additional Tailwind classes for the button
   */
  buttonClassName?: string
}

/**
 * A component to show when there is no data to display. It can be utilized to get the user's attention with a friendly illustration and a message.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/EmptyState/}
 * @param {EmptyStateProps} props - The props for the `EmptyState` component.
 * @returns {JSX.Element} The rendered `EmptyState` component.
 */
export function EmptyState(props: EmptyStateProps) {
  const {
    button,
    buttonTx,
    buttonTxOptions,
    buttonStyle,
    ButtonProps,
    content,
    contentTx,
    contentTxOptions,
    contentStyle,
    ContentTextProps,
    heading,
    headingTx,
    headingTxOptions,
    headingStyle,
    HeadingTextProps,
    imageSource,
    imageStyle,
    ImageProps,
    preset = "generic",
    style,
    className = "",
    imageClassName = "",
    headingClassName = "",
    contentClassName = "",
    buttonClassName = "",
  } = props

  const headingContent = headingTx ? translate(headingTx, headingTxOptions) : heading
  const contentContent = contentTx ? translate(contentTx, contentTxOptions) : content
  const buttonContent = buttonTx ? translate(buttonTx, buttonTxOptions) : button

  const containerClasses = cn(
    "flex-1 items-center justify-center px-4 py-8",
    className
  )

  const imageClasses = cn(
    "w-32 h-32 mb-6",
    imageClassName
  )

  const headingClasses = cn(
    "text-xl font-semibold text-gray-900 text-center mb-2",
    headingClassName
  )

  const contentClasses = cn(
    "text-base text-gray-600 text-center mb-6",
    contentClassName
  )

  const buttonClasses = cn(
    buttonClassName
  )

  return (
    <View className={containerClasses} style={style}>
      {imageSource && (
        <Image
          source={imageSource}
          className={imageClasses}
          style={imageStyle}
          {...ImageProps}
        />
      )}

      {!!headingContent && (
        <Text
          text={headingContent}
          {...HeadingTextProps}
          className={headingClasses}
          style={headingStyle}
        />
      )}

      {!!contentContent && (
        <Text
          text={contentContent}
          {...ContentTextProps}
          className={contentClasses}
          style={contentStyle}
        />
      )}

      {!!buttonContent && (
        <Button
          text={buttonContent}
          {...ButtonProps}
          className={buttonClasses}
          style={buttonStyle}
        />
      )}
    </View>
  )
}