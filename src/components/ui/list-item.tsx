import { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { cn } from '@/utils/cn';

import { Icon } from '../common/icon';

import { Text } from './text';

import type { TextProps } from './text';
import type { IconTypes } from '../common/icon';
import type { ReactElement } from 'react';
import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ListItemProps extends TouchableOpacityProps {
  /**
   * How tall the list item should be.
   * Default: 56
   */
  height?: number;
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean;
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean;
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps['tx'];
  /**
   * Children components.
   */
  children?: TextProps['children'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps['txOptions'];
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Pass any additional props directly to the Text component.
   */
  TextProps?: TextProps;
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional TouchableOpacity style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes;
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string;
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes;
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string;
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement;
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement;
  /**
   * Additional Tailwind classes for the container
   */
  containerClassName?: string;
  /**
   * Additional Tailwind classes for the touchable
   */
  className?: string;
  /**
   * Additional Tailwind classes for the text
   */
  textClassName?: string;
}

interface ListItemActionProps {
  icon?: IconTypes;
  iconColor?: string;
  Component?: ReactElement;
  size: number;
  side: 'left' | 'right';
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/ListItem/}
 * @param {ListItemProps} props - The props for the `ListItem` component.
 * @returns {JSX.Element} The rendered `ListItem` component.
 */
export const ListItem = forwardRef<View, ListItemProps>(
  (props: ListItemProps, ref) => {
    const {
      bottomSeparator,
      children,
      height = 56,
      LeftComponent,
      leftIcon,
      leftIconColor,
      RightComponent,
      rightIcon,
      rightIconColor,
      style,
      text,
      TextProps,
      topSeparator,
      tx,
      txOptions,
      textStyle: $textStyleOverride,
      containerStyle: $containerStyleOverride,
      containerClassName = '',
      className = '',
      textClassName = '',
      ...TouchableOpacityProps
    } = props;

    const $textStyles = [$textStyleOverride, TextProps?.style];

    const containerClasses = cn(
      topSeparator && 'border-t border-gray-200',
      bottomSeparator && 'border-b border-gray-200',
      containerClassName,
    );

    const touchableClasses = cn('flex-row items-start', className);

    const textClasses = cn(
      'py-1 self-center flex-grow flex-shrink',
      textClassName,
    );

    return (
      <View
        ref={ref}
        className={containerClasses}
        style={$containerStyleOverride}
      >
        <TouchableOpacity
          {...TouchableOpacityProps}
          className={touchableClasses}
          style={[{ minHeight: height }, style]}
        >
          <ListItemAction
            side="left"
            size={height}
            icon={leftIcon}
            iconColor={leftIconColor}
            Component={LeftComponent}
          />

          <Text
            {...TextProps}
            tx={tx}
            text={text}
            txOptions={txOptions}
            className={textClasses}
            style={$textStyles}
          >
            {children}
          </Text>

          <ListItemAction
            side="right"
            size={height}
            icon={rightIcon}
            iconColor={rightIconColor}
            Component={RightComponent}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

/**
 * @param {ListItemActionProps} props - The props for the `ListItemAction` component.
 * @returns {JSX.Element | null} The rendered `ListItemAction` component.
 */
function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props;

  const iconContainerClasses = cn(
    'justify-center items-center flex-grow-0',
    side === 'left' && 'mr-4',
    side === 'right' && 'ml-4',
  );

  if (Component) return Component;

  if (icon !== undefined) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        containerStyle={[{ height: size }]}
        className={iconContainerClasses}
      />
    );
  }

  return null;
}
