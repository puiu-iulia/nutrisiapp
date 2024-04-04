import { Text } from 'tamagui';

interface textProps {
  text: string;
  fs: number;
}

function ThemedText({ text, fs }: textProps) {
  return (
    <Text
      fontSize={fs}
      color={'$gray1Dark'}
      fontFamily={'$body'}
    >
      {text}
    </Text>
  );
}

export default ThemedText;
