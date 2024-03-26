import React from 'react';
import { View, Text, Button } from 'tamagui';

interface ThemedButtonProps {
  onPress: () => void;
  buttonTitle: string;
}

function ThemedButton({
  onPress,
  buttonTitle,
}: ThemedButtonProps) {
  return (
    <View>
      <Button onPress={onPress} bc={'$nutrisi'}>
        <Text
          fontSize={20}
          color={'white'}
          fontWeight={'600'}
          textTransform="uppercase"
        >
          {buttonTitle}
        </Text>
      </Button>
    </View>
  );
}

export default ThemedButton;
