import { cva } from 'class-variance-authority';
import { Text as RNText } from 'react-native';

import { isRTL, translate } from '@/lib/i18n';
import { cn } from '@/utils/cn';

import type { TxKeyPath } from '@/lib/i18n';
import type { VariantProps } from 'class-variance-authority';
import type { TOptions } from 'i18next';
import type { ReactNode } from 'react';
import type { TextProps as RNTextProps } from 'react-native';

const textVariants = cva(
  // Base classes
  'text-base font-normal text-text-primary',
  {
    variants: {
      preset: {
        default: 'text-base font-normal',
        bold: 'font-bold',
        heading: 'text-4xl font-bold',
        subheading: 'text-xl font-medium',
        formLabel: 'text-base font-medium',
        formHelper: 'text-sm font-normal text-gray-500',
      },
      size: {
        xxs: 'text-xs',
        xs: 'text-sm',
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
        xxl: 'text-4xl',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      preset: 'default',
    },
  },
);

type TextVariants = VariantProps<typeof textVariants>;

export interface TextProps extends RNTextProps, TextVariants {
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

  const getRTLClasses = () => (isRTL ? 'text-right' : 'text-left');

  const combinedClasses = cn(
    textVariants({ preset, size, weight }),
    getRTLClasses(),
    className,
  );

  return (
    <RNText {...rest} className={combinedClasses}>
      {content}
    </RNText>
  );
}
