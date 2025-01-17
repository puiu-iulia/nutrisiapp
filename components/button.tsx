import React from 'react';
import { View, Text, Button } from 'tamagui';

interface ThemedButtonProps {
  onPress: () => void;
  buttonTitle: string;
  icon?: JSX.Element | null;
  disabled?: boolean;
}

function ThemedButton({
  onPress,
  buttonTitle,
  icon,
  disabled,
}: ThemedButtonProps) {
  return (
    <View>
      <Button
        onPress={onPress}
        bc={'$nutrisi'}
        icon={icon}
        disabled={disabled}
        disabledStyle={{ backgroundColor: '$gray8Light' }}
      >
        <Text
          fontSize={17}
          color={'white'}
          fontWeight={'600'}
          fontFamily={'$nutrisi'}
        >
          {buttonTitle}
        </Text>
      </Button>
    </View>
  );
}

export default ThemedButton;
