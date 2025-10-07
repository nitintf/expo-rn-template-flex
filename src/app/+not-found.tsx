import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

import { Icon } from '@/components/common/icon';
import { Screen } from '@/components/common/screen';
import { Button, Text } from '@/components/ui';

export default function NotFoundScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    // This will navigate back or to the root if there's no history
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <Screen
      preset="scroll"
      className="flex-1 p-6"
      contentClassName="items-center justify-between"
      safeAreaEdges={['top', 'bottom']}
    >
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />

      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Icon icon="x" size={64} color="#EF4444" />
        <Text
          preset="heading"
          tx="error:notFound.title"
          text="Oops! Page Not Found"
          className="text-center mt-8 text-4xl font-bold text-gray-900"
        />
        <Text
          tx="error:notFound.message"
          text="The page you're looking for doesn't exist or has been moved."
          className="text-center mt-2 text-base text-gray-600"
        />
      </View>

      <Button
        preset="filled"
        tx="common:goBack"
        text="Go Back"
        className="px-8 mb-6"
        onPress={handleGoBack}
      />
    </Screen>
  );
}
