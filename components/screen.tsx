import { View, Text } from 'tamagui';
import { Platform } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

interface screenProps {
  children?: JSX.Element | JSX.Element[];
}

function ThemedScreen({ children }: screenProps) {
  return (
    <View
      f={1}
      backgroundColor={'$nutrisiLight'}
      paddingHorizontal={16}
      pt={Platform.OS == 'ios' ? 56 : 24}
    >
      {children}
    </View>
  );
}

export default ThemedScreen;
