import { useRef, useCallback } from 'react';

import type BottomSheet from '@gorhom/bottom-sheet';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const expandBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(1);
  }, []);

  const expandToIndex = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  return {
    bottomSheetRef,
    openBottomSheet,
    closeBottomSheet,
    expandBottomSheet,
    expandToIndex,
  };
};
