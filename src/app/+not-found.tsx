import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';

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

  const handleGoHome = () => {
    router.replace('/');
  };

  return (
    <Screen
      preset="scroll"
      className="flex-1"
      contentClassName="items-center justify-center"
      safeAreaEdges={['top', 'bottom']}
    >
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />

      <View className="flex-1 items-center justify-center px-8">
        {/* Background decoration */}
        <View className="absolute top-20 left-8 w-32 h-32 bg-primary-main rounded-full opacity-10" />
        <View className="absolute top-40 right-12 w-24 h-24 bg-primary-green-main rounded-full opacity-15" />
        <View className="absolute bottom-40 left-12 w-20 h-20 bg-yellow-main rounded-full opacity-20" />

        {/* Main content */}
        <View className="items-center space-y-8">
          {/* 404 Number */}
          <View className="relative">
            <Text className="text-9xl font-black text-text-primary">404</Text>
            <View className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-main rounded-full" />
          </View>

          {/* Title */}
          <View className="items-center space-y-3">
            <Text
              preset="heading"
              tx="error:notFound.title"
              text="Oops! Page Not Found"
              className="text-center text-3xl font-bold text-text-primary"
            />
            <Text
              tx="error:notFound.message"
              text="The page you're looking for doesn't exist or has been moved."
              className="text-center text-base text-text-secondary leading-6 max-w-sm"
            />
          </View>

          {/* Action buttons */}
          <View className="w-full space-y-4 mt-8">
            <Button
              variant="primary"
              size="lg"
              tx="common:goBack"
              text="Go Back"
              className="w-full"
              onPress={handleGoBack}
            />
            <Button
              variant="outline"
              size="lg"
              tx="common:back"
              text="Go Home"
              className="w-full"
              onPress={handleGoHome}
            />
          </View>

          {/* Help text */}
          <Text className="text-center text-sm text-text-secondary mt-6">
            Need help? Contact our support team
          </Text>
        </View>
      </View>
    </Screen>
  );
}
