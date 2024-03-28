import React from 'react';
import { View, Text, Button } from 'tamagui';

interface ThemedButtonProps {
  onPress: () => void;
  buttonTitle: string;
  icon?: JSX.Element | null;
}

function ThemedButton({
  onPress,
  buttonTitle,
  icon,
}: ThemedButtonProps) {
  return (
    <View>
      <Button onPress={onPress} bc={'$nutrisi'} icon={icon}>
        <Text
          fontSize={18}
          color={'white'}
          fontWeight={'700'}
        >
          {buttonTitle}
        </Text>
      </Button>
    </View>
  );
}

export default ThemedButton;
