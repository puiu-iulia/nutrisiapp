import { Spinner, View } from 'tamagui';
import ThemedScreen from './screen';

function ThemedSpinner() {
  return (
    <ThemedScreen>
      <View f={1} jc="center" ac="center">
        <Spinner size="large" color={'$nutrisi'} />
      </View>
    </ThemedScreen>
  );
}

export default ThemedSpinner;
