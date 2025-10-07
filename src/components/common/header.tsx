import { TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsetsStyle } from '@/hooks/use-safe-area-insets-style';
import { translate } from '@/lib/i18n';
import { cn } from '@/utils/cn';

import { Text } from '../ui/text';

import { Icon } from './icon';

import type { IconTypes } from './icon';
import type { TextProps } from '../ui/text';
import type { ExtendedEdge } from '@/hooks/use-safe-area-insets-style';
import type { ComponentType, ReactElement } from 'react';
import type {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: 'center' | 'flex';
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps['text'];
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps['tx'];
  /**
   * Optional title options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps['txOptions'];
  /**
   * Optional header title (React) component.
   */
  TitleComponent?: ReactElement;
  /**
   * Optional left action (React) component.
   */
  LeftComponent?: ReactElement;
  /**
   * Optional right action (React) component.
   */
  RightComponent?: ReactElement;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Pass any additional props directly to the title Text component.
   */
  TitleTextProps?: TextProps;
  /**
   * Left icon
   */
  leftIcon?: IconTypes;
  /**
   * Left icon color
   */
  leftIconColor?: string;
  /**
   * Left icon press handler
   */
  onLeftPress?: () => void;
  /**
   * Right icon
   */
  rightIcon?: IconTypes;
  /**
   * Right icon color
   */
  rightIconColor?: string;
  /**
   * Right icon press handler
   */
  onRightPress?: () => void;
  /**
   * Additional Tailwind classes for the container
   */
  containerClassName?: string;
  /**
   * Additional Tailwind classes for the header
   */
  className?: string;
  /**
   * Additional Tailwind classes for the title
   */
  titleClassName?: string;
}

interface HeaderActionProps {
  backgroundColor?: string;
  Icon?: ComponentType<unknown>;
  icon?: IconTypes;
  iconColor?: string;
  onPress?: TouchableOpacityProps['onPress'];
  Component?: ReactElement;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header will automatically render a back button and close button if any of the `onBackPress` or `onClosePress` props are provided.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Header/}
 * @param {HeaderProps} props - The props for the `Header` component.
 * @returns {JSX.Element} The rendered `Header` component.
 */
export function Header(props: HeaderProps) {
  const {
    backgroundColor,
    LeftComponent,
    RightComponent,
    TitleComponent,
    leftIcon,
    leftIconColor,
    onLeftPress,
    onRightPress,
    rightIcon,
    rightIconColor,
    safeAreaEdges,
    style: $styleOverride,
    title,
    titleTx,
    titleTxOptions,
    titleMode = 'center',
    titleStyle: $titleStyleOverride,
    titleContainerStyle: $titleContainerStyleOverride,
    containerStyle: $containerStyleOverride,
    TitleTextProps,
    containerClassName = '',
    className = '',
    titleClassName = '',
  } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const titleContent = titleTx ? translate(titleTx, titleTxOptions) : title;

  const containerClasses = cn('bg-white', containerClassName);

  const headerClasses = cn(
    'flex-row items-center justify-between px-4 py-2 min-h-12',
    className,
  );

  const titleContainerClasses = cn(
    'flex-1',
    titleMode === 'center' ? 'items-center' : 'items-start',
  );

  const titleClasses = cn(
    'text-lg font-semibold text-gray-900',
    titleClassName,
  );

  return (
    <View
      className={containerClasses}
      style={[{ backgroundColor }, $containerInsets, $containerStyleOverride]}
    >
      <View className={headerClasses} style={$styleOverride}>
        {/* Left Actions */}
        <View className="flex-row items-center">
          {LeftComponent}
          {leftIcon && (
            <HeaderAction
              icon={leftIcon}
              iconColor={leftIconColor}
              onPress={onLeftPress}
              className="mr-2"
            />
          )}
        </View>

        {/* Title */}
        <View
          className={titleContainerClasses}
          style={$titleContainerStyleOverride}
        >
          {TitleComponent}
          {!!titleContent && (
            <Text
              text={titleContent}
              {...TitleTextProps}
              className={titleClasses}
              style={$titleStyleOverride}
            />
          )}
        </View>

        {/* Right Actions */}
        <View className="flex-row items-center">
          {rightIcon && (
            <HeaderAction
              icon={rightIcon}
              iconColor={rightIconColor}
              onPress={onRightPress}
              className="ml-2"
            />
          )}
          {RightComponent}
        </View>
      </View>
    </View>
  );
}

function HeaderAction(props: HeaderActionProps) {
  const { icon, iconColor, onPress, Component, style, className = '' } = props;

  if (Component) return Component;

  if (icon) {
    return (
      <TouchableOpacity
        onPress={onPress}
        className={cn('p-2', className)}
        style={style}
      >
        <Icon icon={icon} color={iconColor} size={24} />
      </TouchableOpacity>
    );
  }

  return null;
}
