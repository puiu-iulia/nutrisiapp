import { View, Text } from 'tamagui';
import { Image } from 'react-native';

function PremiumCard() {
  return (
    <View
      p={16}
      br={16}
      bc={'#c4d4c4'}
      borderColor={'$nutrisi'}
      borderWidth={0}
      elevationAndroid={4}
      fd={'row'}
      jc={'space-between'}
      shadowColor={'$nutrisi'}
      shadowRadius={4}
    >
      <View f={5} jc={'center'}>
        <Text
          fontSize={14}
          pb={4}
          fontWeight={'bold'}
          color={'$gray8Dark'}
        >
          Premium for $9.99/month
        </Text>
        <Text
          fontSize={17}
          fontWeight={'bold'}
          fontFamily={'$nutrisi'}
          lineHeight={24}
          color={'$gray5Dark'}
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
