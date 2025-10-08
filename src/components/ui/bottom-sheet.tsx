/* eslint-disable react-native/no-color-literals */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './text';

import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  enableOverDrag?: boolean;
  enableDynamicSizing?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  title?: string;
  showHandle?: boolean;
  backgroundStyle?: object;
  handleStyle?: object;
  handleIndicatorStyle?: object;
}

export const BottomSheetComponent = forwardRef<BottomSheet, BottomSheetProps>(
  (
    {
      children,
      snapPoints = ['25%', '50%', '90%'],
      enablePanDownToClose = true,
      enableOverDrag = true,
      enableDynamicSizing = false,
      onClose,
      onOpen,
      title,
      showHandle = true,
      backgroundStyle,
      handleStyle,
      handleIndicatorStyle,
    },
    ref,
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          onPress={() => {
            if (enablePanDownToClose) {
              (ref as React.RefObject<BottomSheet>).current.close();
            }
          }}
        />
      ),
      [enablePanDownToClose, ref],
    );

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          onClose?.();
        } else if (index >= 0) {
          onOpen?.();
        }
      },
      [onClose, onOpen],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={memoizedSnapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        enableOverDrag={enableOverDrag}
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        backgroundStyle={[styles.background, backgroundStyle]}
        handleStyle={[styles.handle, handleStyle]}
        handleIndicatorStyle={[styles.handleIndicator, handleIndicatorStyle]}
        enableHandlePanningGesture={showHandle}
      >
        <BottomSheetView className="flex-1 pb-5 pt-2">
          {title && (
            <Text className="text-lg font-semibold text-center mb-4 px-4 text-text-primary">
              {title}
            </Text>
          )}
          <View className="px-4 py-2">{children}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

BottomSheetComponent.displayName = 'BottomSheetComponent';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1A1B23', // bg-paper
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    backgroundColor: 'transparent',
  },
  handleIndicator: {
    backgroundColor: '#8996A9', // grey-50
    width: 40,
    height: 4,
  },
});
