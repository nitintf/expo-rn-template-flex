import { Pressable, View } from 'react-native';

import { cn } from '@/utils/cn';

import { Text } from './text';

import type { TextProps } from './text';
import type { ComponentType } from 'react';
import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Presets = 'default' | 'filled' | 'reversed' | 'primary';

export interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps['tx'];
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps['txOptions'];
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>;
  /**
   * One of the different @types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean;
  /**
   * icon button props, if true, the button will be styled as an icon button.
   */
  iconButton?: boolean;
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>;
  /**
   * Additional Tailwind classes for the button container
   */
  className?: string;
  /**
   * Additional Tailwind classes for the button text
   */
  textClassName?: string;
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   className="bg-primary-500 px-4 py-2 rounded-lg"
 *   textClassName="text-white font-medium"
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    iconButton = false,
    className = '',
    textClassName = '',
    ...rest
  } = props;

  const preset: Presets = props.preset ?? 'default';

  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {string} The view classes based on the pressed state.
   */
  function getViewClasses({ pressed }: PressableStateCallbackType): string {
    const baseClasses =
      'flex-row min-h-14 rounded justify-center items-center px-4 py-3 overflow-hidden';

    const presetClasses = {
      default: 'border border-gray-300 bg-gray-100',
      filled: 'bg-gray-300',
      reversed: 'bg-gray-800',
      primary: 'bg-primary-200',
    };

    const pressedClasses = {
      default: 'bg-gray-200',
      filled: 'bg-gray-200',
      reversed: 'bg-gray-700',
      primary: 'bg-primary-100',
    };

    return cn(
      baseClasses,
      presetClasses[preset],
      pressed && pressedClasses[preset],
      disabled && 'opacity-50',
      className,
    );
  }

  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {string} The text classes based on the pressed state.
   */
  function getTextClasses({ pressed }: PressableStateCallbackType): string {
    const baseClasses =
      'text-base font-medium text-center flex-shrink flex-grow-0 z-10';

    const presetClasses = {
      default: 'text-gray-900',
      filled: 'text-gray-900',
      reversed: 'text-white',
      primary: 'text-gray-900',
    };

    return cn(
      baseClasses,
      presetClasses[preset],
      pressed && 'opacity-90',
      disabled && 'opacity-50',
      textClassName,
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <View className={getViewClasses(state)}>
          {!!LeftAccessory && (
            <LeftAccessory
              style={{ marginEnd: 4, zIndex: 1 }}
              pressableState={state}
              disabled={disabled}
            />
          )}

          {iconButton ? (
            children
          ) : (
            <Text
              tx={tx}
              text={text}
              txOptions={txOptions}
              className={getTextClasses(state)}
              style={$textStyleOverride}
            >
              {children}
            </Text>
          )}

          {!!RightAccessory && (
            <RightAccessory
              style={{ marginStart: 4, zIndex: 1 }}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}
