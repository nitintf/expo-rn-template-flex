import { useState } from 'react';
import { View } from 'react-native';
import { Toast } from 'toastify-react-native';

import { Header } from '@/components/common/header';
import { Screen } from '@/components/common/screen';
import { BottomSheetComponent, Button, Text, TextField } from '@/components/ui';
import { useBottomSheet } from '@/hooks/use-bottom-sheet';

export default function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const {
    bottomSheetRef,
    openBottomSheet,
    closeBottomSheet,
    expandBottomSheet,
  } = useBottomSheet();

  const handleSubmit = () => {
    if (!email.trim() || !name.trim()) {
      Toast.show({
        text1: 'Error',
        text2: 'Please enter your email and name',
        type: 'error',
      });
      return;
    }

    Toast.show({
      text1: 'Submitted',
      text2: 'Your email and name have been submitted',
      type: 'success',
    });
  };

  return (
    <Screen
      preset="scroll"
      contentClassName="flex-1"
      safeAreaEdges={['top', 'bottom']}
      systemBarStyle="light"
    >
      <Header
        titleTx="welcomeScreen:title"
        titleMode="center"
        containerClassName="bg-white shadow-sm"
      />

      <View className="mb-12">
        <Text
          preset="heading"
          className="text-center mb-4 text-white"
          tx="welcomeScreen:content"
        />
      </View>

      <View className="flex gap-4 px-6">
        <TextField
          labelTx="welcomeScreen:emailLabel"
          placeholderTx="welcomeScreen:emailPlaceholder"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          labelTx="welcomeScreen:nameLabel"
          placeholderTx="welcomeScreen:namePlaceholder"
          value={name}
          onChangeText={setName}
        />
        <Button
          tx="welcomeScreen:submit"
          className="mt-4"
          onPress={handleSubmit}
        />

        <View className="mt-6 gap-3">
          <Text className="text-center text-white mb-2">
            Bottom Sheet Examples
          </Text>
          <Button
            text="Open Bottom Sheet"
            variant="primary"
            onPress={openBottomSheet}
          />
          <Button
            text="Expand Bottom Sheet"
            variant="secondary"
            onPress={expandBottomSheet}
          />
        </View>
      </View>

      <BottomSheetComponent
        ref={bottomSheetRef}
        title="Example Bottom Sheet"
        snapPoints={['30%', '50%', '90%']}
      >
        <Text className="text-base mb-4">
          This is an example of the Gorhom Bottom Sheet component. You can:
        </Text>

        <View className="mb-4">
          <Text className="text-base font-semibold mb-2">
            Try these actions:
          </Text>
          <Button
            text="Expand to 50%"
            variant="primary"
            className="mb-2"
            onPress={expandBottomSheet}
          />
          <Button
            text="Close Bottom Sheet"
            variant="secondary"
            className="mb-2"
            onPress={closeBottomSheet}
          />
        </View>
      </BottomSheetComponent>
    </Screen>
  );
}
