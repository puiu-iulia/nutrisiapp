import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'tamagui';

interface PressableTextProps {
  onPress: () => void;
  text: string;
  icon?: JSX.Element | null;
}

function PressableText({
  onPress,
  text,
  icon,
}: PressableTextProps) {
  return (
    <Pressable onPress={onPress}>
      <View ac={'center'} jc={'center'} fd={'row'} mb={16}>
        {icon}
        <Text
          fontSize={15}
          color={'$nutrisi'}
          fontWeight={'bold'}
          pl={4}
          alignSelf="center"
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

export default PressableText;
