import { clsx } from 'clsx';

import type { ClassValue } from 'clsx';

/**
 * Utility function to combine class names using clsx
 * @param inputs - Class values to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
