import { View, Text } from 'tamagui';
import React from 'react';

interface screenProps {
  children?: JSX.Element | JSX.Element[];
}

function ThemedScreen({ children }: screenProps) {
  return (
    <View
      f={1}
      theme={'nutrisi'}
      bc={'$backgroundColor'}
      p={8}
    >
      {children}
    </View>
  );
}

export default ThemedScreen;