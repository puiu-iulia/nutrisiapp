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
      borderWidth={0.5}
      mb={16}
      onChangeText={onChangeText}
    />
  );
}

export default ThemedInput;
