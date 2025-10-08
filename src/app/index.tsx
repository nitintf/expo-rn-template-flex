import { useState } from 'react';
import { View } from 'react-native';
import { Toast } from 'toastify-react-native';

import { Header } from '@/components/common/header';
import { Screen } from '@/components/common/screen';
import { Button, Text, TextField } from '@/components/ui';

export default function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

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
      </View>
    </Screen>
  );
}
