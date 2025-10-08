import Feather from '@expo/vector-icons/Feather';

import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

import type { ViewStyle } from 'react-native';

interface Props {
  /*
   * Function to be called when the button is pressed
   */
  onPress: () => void;

  /*
   * Style for the button
   */
  style?: ViewStyle;

  /*
   * Additional Tailwind classes
   */
  className?: string;
}

export const ModalCloseButton = ({ onPress, style, className = '' }: Props) => {
  return (
    <Button
      variant="icon"
      className={cn(
        'absolute top-0 right-4 items-center justify-center z-10 rounded-full min-h-10 h-10 w-10',
        className,
      )}
      style={style}
      onPress={onPress}
    >
      <Feather name="x" size={16} color="#6B7280" />
    </Button>
  );
};
