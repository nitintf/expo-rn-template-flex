import { cva } from 'class-variance-authority';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { isRTL, translate } from '@/lib/i18n';
import { cn } from '@/utils/cn';

import { Text } from './text';

import type { TextProps } from './text';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentType, Ref } from 'react';
import type {
  ImageStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

const textFieldVariants = cva(
  // Base classes
  'flex-row items-center border-b px-0 py-3 min-h-12',
  {
    variants: {
      status: {
        default: 'border-gray-300',
        error: 'border-red-500',
        disabled: 'border-gray-300 opacity-50',
      },
      focused: {
        true: 'border-white',
        false: '',
      },
    },
    defaultVariants: {
      status: 'default',
      focused: false,
    },
  },
);

const textFieldInputVariants = cva(
  // Base classes
  'flex-1 text-base text-white bg-transparent',
  {
    variants: {
      status: {
        default: 'text-white',
        error: 'text-red-300',
        disabled: 'text-gray-500',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  },
);

const textFieldLabelVariants = cva(
  // Base classes
  'text-sm font-medium mb-1',
  {
    variants: {
      status: {
        default: 'text-gray-400',
        error: 'text-red-400',
        disabled: 'text-gray-500',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  },
);

const textFieldHelperVariants = cva(
  // Base classes
  'text-sm mt-1',
  {
    variants: {
      status: {
        default: 'text-gray-500',
        error: 'text-red-600',
        disabled: 'text-gray-400',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  },
);

type TextFieldVariants = VariantProps<typeof textFieldVariants>;

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps
  extends Omit<TextInputProps, 'ref'>,
    TextFieldVariants {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled' | 'default';
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps['text'];
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps['tx'];
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps['text'];
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps['tx'];
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps;
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps['text'];
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps['tx'];
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps['txOptions'];
  /**
   * Optional input style override.
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Optional container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * Optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * Optional component to render below the input.
   * Example: `BottomAccessory={(props) => <View {...props} />}`
   */
  BottomAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * Optional component to render above the input.
   * Example: `TopAccessory={(props) => <View {...props} />}`
   */
  TopAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * Additional Tailwind classes for the container
   */
  containerClassName?: string;
  /**
   * Additional Tailwind classes for the input wrapper
   */
  inputWrapperClassName?: string;
  /**
   * Additional Tailwind classes for the input
   */
  className?: string;
  /**
   * Additional Tailwind classes for the label
   */
  labelClassName?: string;
  /**
   * Additional Tailwind classes for the helper text
   */
  helperClassName?: string;
}

export interface TextFieldRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef<TextFieldRef, TextFieldProps>(
  (props: TextFieldProps, ref: Ref<TextFieldRef>) => {
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
      status = 'default',
      LeftAccessory,
      RightAccessory,
      TopAccessory,
      BottomAccessory,
      HelperTextProps,
      LabelTextProps,
      containerStyle,
      inputWrapperStyle,
      style: $inputStyleOverride,
      containerClassName = '',
      inputWrapperClassName = '',
      className = '',
      labelClassName = '',
      helperClassName = '',
      ...TextInputProps
    } = props;

    const input = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);

    const disabled = TextInputProps.editable === false || status === 'disabled';

    const placeholderContent = placeholderTx
      ? translate(placeholderTx, placeholderTxOptions)
      : placeholder;

    const labelContent = labelTx ? translate(labelTx, labelTxOptions) : label;

    const helperContent = helperTx
      ? translate(helperTx, helperTxOptions)
      : helper;

    useImperativeHandle(ref, () => ({
      focus: () => input.current?.focus(),
      blur: () => input.current?.blur(),
      clear: () => input.current?.clear(),
    }));

    const $containerStyles = [containerStyle];
    const $inputWrapperStyles = [inputWrapperStyle];
    const $inputStyles = [$inputStyleOverride];
    const $labelStyles = [LabelTextProps?.style];
    const $helperStyles = [HelperTextProps?.style];

    const inputWrapperClasses = cn(
      textFieldVariants({
        status: disabled ? 'disabled' : status,
        focused: isFocused,
      }),
      inputWrapperClassName,
    );

    const inputClasses = cn(
      textFieldInputVariants({ status: disabled ? 'disabled' : status }),
      isRTL ? 'text-right' : 'text-left',
      className,
    );

    const labelClasses = cn(
      textFieldLabelVariants({ status: disabled ? 'disabled' : status }),
      labelClassName,
    );

    const helperClasses = cn(
      textFieldHelperVariants({ status: disabled ? 'disabled' : status }),
      helperClassName,
    );

    return (
      <View
        className={cn('w-full', containerClassName)}
        style={$containerStyles}
      >
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
            tx={labelTx}
            txOptions={labelTxOptions}
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
            textAlignVertical={TextInputProps.multiline ? 'top' : 'center'}
            placeholderTextColor="#9CA3AF"
            className={inputClasses}
            style={$inputStyles}
            {...TextInputProps}
            editable={!disabled}
            placeholder={placeholderContent}
            onFocus={(e) => {
              setIsFocused(true);
              TextInputProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              TextInputProps.onBlur?.(e);
            }}
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
            tx={helperTx}
            txOptions={helperTxOptions}
            text={helperContent}
            {...HelperTextProps}
            className={helperClasses}
            style={$helperStyles}
          />
        )}
      </View>
    );
  },
);
