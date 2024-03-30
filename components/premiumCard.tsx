import { View, Text } from 'tamagui';
import { Image } from 'react-native';

function PremiumCard() {
  return (
    <View
      p={16}
      br={16}
      bc={'#f1eae4'}
      fd={'row'}
      jc={'space-between'}
    >
      <View f={5} jc={'center'}>
        <Text fontSize={14} pb={4} color={'$nutrisi'}>
          Starting at $9.99/month
        </Text>
        <Text
          fontSize={16}
          fontWeight={'bold'}
          color={'$nutrisi'}
        >
          Unlimited recipes, scan ingredients from images
          and generate weekly mealplans
        </Text>
      </View>
      <View f={2} width={100} height={80}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={require('./../assets/images/food.png')}
        />
      </View>
    </View>
  );
}

export default PremiumCard;
