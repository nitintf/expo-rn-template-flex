import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/ui';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/+not-found');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind! Nitin is great
      </Text>
      <Button preset="filled" onPress={handleGoBack}>
        <Text>Click me</Text>
      </Button>
    </View>
  );
}
