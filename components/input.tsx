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
      height={'100%'}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
      blurOnSubmit
      size={'$4'}
    />
  );
}

export default ThemedInput;
