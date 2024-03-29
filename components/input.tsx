import { Input } from 'tamagui';

interface inputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

function ThemedInput({
  value,
  placeholder,
  onChangeText,
}: inputProps) {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      bc={'white'}
      borderWidth={1}
      borderColor={'$gray6Light'}
      color={'$gray1Dark'}
      mb={16}
      onChangeText={onChangeText}
      numberOfLines={2}
      multiline
      size={'$4'}
    />
  );
}

export default ThemedInput;
