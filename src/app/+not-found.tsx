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
        <View className="absolute top-20 left-8 w-32 h-32 bg-blue-100 rounded-full opacity-20" />
        <View className="absolute top-40 right-12 w-24 h-24 bg-purple-100 rounded-full opacity-30" />
        <View className="absolute bottom-40 left-12 w-20 h-20 bg-pink-100 rounded-full opacity-25" />

        {/* Main content */}
        <View className="items-center space-y-8">
          {/* 404 Number */}
          <View className="relative">
            <Text className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
              404
            </Text>
            <View className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full" />
          </View>

          {/* Icon */}
          <View className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center shadow-lg">
            <Icon icon="x" size={48} color="#FFFFFF" />
          </View>

          {/* Title */}
          <View className="items-center space-y-3">
            <Text
              preset="heading"
              tx="error:notFound.title"
              text="Oops! Page Not Found"
              className="text-center text-3xl font-bold text-gray-900"
            />
            <Text
              tx="error:notFound.message"
              text="The page you're looking for doesn't exist or has been moved."
              className="text-center text-base text-gray-600 leading-6 max-w-sm"
            />
          </View>

          {/* Action buttons */}
          <View className="w-full space-y-4 mt-8">
            <Button
              preset="filled"
              tx="common:goBack"
              text="Go Back"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-xl shadow-lg"
              textClassName="text-white font-semibold text-base"
              onPress={handleGoBack}
            />
            <Button
              preset="reversed"
              tx="common:back"
              text="Go Home"
              className="w-full border-2 border-gray-300 py-4 rounded-xl bg-white"
              textClassName="text-gray-700 font-semibold text-base"
              onPress={handleGoHome}
            />
          </View>

          {/* Help text */}
          <Text className="text-center text-sm text-gray-500 mt-6">
            Need help? Contact our support team
          </Text>
        </View>
      </View>
    </Screen>
  );
}
