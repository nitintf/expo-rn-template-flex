import { cva } from 'class-variance-authority';
import { Pressable, View } from 'react-native';

import { cn } from '@/utils/cn';

import { Text } from './text';

import type { TextProps } from './text';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentType } from 'react';
import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg min-h-touch px-4 py-3',
  {
    variants: {
      variant: {
        primary: 'bg-primary-main shadow-md',
        secondary: 'bg-blue-neutral-main',
        destructive: 'bg-red-100',
        outline: 'border border-blue-neutral-main bg-transparent',
        ghost: 'bg-transparent',
        icon: 'bg-primary-main rounded-full min-w-touch min-h-touch p-0',
      },
      size: {
        sm: 'min-h-10 px-3 py-2',
        md: 'min-h-touch px-4 py-3',
        lg: 'min-h-12 px-6 py-4',
        icon: 'min-w-touch min-h-touch p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

const textVariants = cva('text-center font-primary font-medium', {
  variants: {
    variant: {
      primary: 'text-text-primary',
      secondary: 'text-text-primary',
      destructive: 'text-text-primary',
      outline: 'text-text-primary',
      ghost: 'text-text-primary',
      icon: 'text-text-primary',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
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
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
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
 * Built with class-variance-authority for consistent styling variants.
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button variant="primary" size="md" onPress={handlePress}>
 *   Click me
 * </Button>
 *
 * <Button variant="icon" size="icon" onPress={handlePress}>
 *   <Icon name="plus" />
 * </Button>
 */
export function Button({
  className,
  textClassName,
  variant,
  size,
  tx,
  text,
  txOptions,
  textStyle,
  children,
  RightAccessory,
  LeftAccessory,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...props}
    >
      {(state) => {
        const isPressed = state.pressed;

        const getPressedBackgroundColor = () => {
          if (!isPressed || disabled) return '';

          switch (variant) {
            case 'primary':
              return 'opacity-80';
            case 'secondary':
              return 'opacity-80';
            case 'destructive':
              return 'opacity-80';
            case 'outline':
              return 'bg-blue-neutral-100 bg-opacity-30';
            case 'ghost':
              return 'bg-gray-200 bg-opacity-20';
            case 'icon':
              return 'opacity-80';
            default:
              return '';
          }
        };

        return (
          <View
            className={cn(
              buttonVariants({ variant, size }),
              disabled && 'opacity-50',
              isPressed && !disabled && 'opacity-80',
              isPressed && !disabled && getPressedBackgroundColor(),
              className,
            )}
          >
            {!!LeftAccessory && (
              <LeftAccessory
                style={{ marginEnd: 8 }}
                pressableState={state}
                disabled={disabled}
              />
            )}

            {variant === 'icon' ? (
              children
            ) : (
              <Text
                tx={tx}
                text={text}
                txOptions={txOptions}
                className={cn(
                  textVariants({ variant, size }),
                  disabled && 'opacity-50',
                  textClassName,
                )}
                style={textStyle}
              >
                {children}
              </Text>
            )}

            {!!RightAccessory && (
              <RightAccessory
                style={{ marginStart: 8 }}
                pressableState={state}
                disabled={disabled}
              />
            )}
          </View>
        );
      }}
    </Pressable>
  );
}
