import { ScrollView, View } from 'react-native';

import { Icon } from '@/components/common/icon';
import { Screen } from '@/components/common/screen';
import { Button, Text } from '@/components/ui';

import type { ErrorInfo } from 'react';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset(): void;
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      className="bg-white"
    >
      <View className="flex-1 items-center justify-center px-4">
        <Icon icon="ladybug" size={64} className="mb-4" />
        <Text
          preset="subheading"
          tx="errorScreen:title"
          className="text-xl font-semibold text-gray-900 text-center mb-2"
        />
        <Text
          tx="errorScreen:friendlySubtitle"
          className="text-base text-gray-600 text-center mb-6"
        />
      </View>

      <ScrollView className="flex-1 bg-gray-100 mx-4 rounded-lg">
        <View className="p-4">
          <Text
            weight="bold"
            text={`${props.error}`.trim()}
            className="text-sm text-red-600 mb-2"
          />
          <Text
            selectable
            text={(props.errorInfo?.componentStack ?? '').trim()}
            className="text-xs text-gray-700 font-mono"
          />
        </View>
      </ScrollView>

      <View className="p-4">
        <Button
          preset="reversed"
          tx="errorScreen:reset"
          onPress={props.onReset}
          className="bg-gray-800"
        />
      </View>
    </Screen>
  );
}
