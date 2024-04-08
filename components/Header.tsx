import { Pressable } from 'react-native';
import { View, Text } from 'tamagui';

interface HeaderProps {
  title: string;
  icon?: JSX.Element;
  onIconPress?: () => void;
}

function Header({ title, icon, onIconPress }: HeaderProps) {
  return (
    <View fd={'row'} jc={'space-between'} ai={'center'}>
      <Text
        fontSize={24}
        color={'$gray1Dark'}
        fontWeight={'bold'}
        w={'$15'}
        lh={32}
        pb={16}
        numberOfLines={2}
      >
        {title}
      </Text>
      <Pressable
        onPress={onIconPress}
        style={{
          width: 48,
          height: 48,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        {icon}
      </Pressable>
    </View>
  );
}

export default Header;
