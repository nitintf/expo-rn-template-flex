import { Text as RNText } from 'react-native';

import { isRTL, translate } from '@/lib/i18n';
import { cn } from '@/utils/cn';

import type { TxKeyPath } from '@/lib/i18n';
import type { TOptions } from 'i18next';
import type { ReactNode } from 'react';
import type { TextProps as RNTextProps } from 'react-native';

type Sizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type Weights = 'normal' | 'medium' | 'bold';
type Presets =
  | 'default'
  | 'bold'
  | 'heading'
  | 'subheading'
  | 'formLabel'
  | 'formHelper';

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions;
  /**
   * One of the different @types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: ReactNode;
  /**
   * Additional Tailwind classes
   */
  className?: string;
}

export function Text(props: TextProps) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    preset = 'default',
    className = '',
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  // Generate Tailwind classes based on props
  const getSizeClasses = (size?: Sizes) => {
    switch (size) {
      case 'xxs':
        return 'text-xs';
      case 'xs':
        return 'text-sm';
      case 'sm':
        return 'text-base';
      case 'md':
        return 'text-lg';
      case 'lg':
        return 'text-xl';
      case 'xl':
        return 'text-2xl';
      case 'xxl':
        return 'text-4xl';
      default:
        return 'text-base';
    }
  };

  const getWeightClasses = (weight?: Weights) => {
    switch (weight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };

  const getPresetClasses = (preset: Presets) => {
    switch (preset) {
      case 'bold':
        return 'font-bold';
      case 'heading':
        return 'text-4xl font-bold';
      case 'subheading':
        return 'text-xl font-medium';
      case 'formLabel':
        return 'text-base font-medium';
      case 'formHelper':
        return 'text-sm font-normal text-gray-500';
      default:
        return 'text-base font-normal';
    }
  };

  const getRTLClasses = () => (isRTL ? 'text-right' : 'text-left');

  const combinedClasses = cn(
    getPresetClasses(preset),
    size && getSizeClasses(size),
    weight && getWeightClasses(weight),
    getRTLClasses(),
    className,
  );

  return (
    <RNText {...rest} className={combinedClasses}>
      {content}
    </RNText>
  );
}
