import { StyleSheet } from 'react-native';
import { Button, View, Text } from 'tamagui';
import { Wand2 } from '@tamagui/lucide-icons';

export default function TabOneScreen() {
  return (
    <View >
      <Text style={styles.title} color={"#232924"}>Tab One</Text>
      <Button 
        animation='bouncy'
        bc={'$nutrisi'}
        color={'#fff'}
        size={'$4'}
        textProps={{color: '#fff', size: '$4'}}
        icon={<Wand2 size={20} color={'#fff'}/>}
        onPress={() => {}} >Generate</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
