import { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, View, Text, Input } from 'tamagui';
import { Wand2, Settings2 } from '@tamagui/lucide-icons';

import ThemedScreen from '@/components/screen';
import ThemedButton from '@/components/button';
import ThemedInput from '@/components/input';

export default function TabOneScreen() {
  const [ingredients, setIngredients] =
    useState<string>('');

  return (
    <ThemedScreen>
      <View
        fd={'row'}
        jc={'space-between'}
        pt={48}
        ai={'center'}
      >
        <Text
          fontSize={24}
          color={'$gray1Dark'}
          fontWeight={'bold'}
          numberOfLines={2}
          w={'$15'}
          lh={32}
          pb={16}
        >
          Not sure what to cook tonight?
        </Text>
        <Settings2 size={24} color={'$gray1Dark'} />
      </View>
      <View p={16} br={16} bc={'$orange3Light'} mb={16}>
        <Text fontSize={16} color={'$gray1Dark'} mb={8}>
          Add your ingredients followed by a comma and we'll
          generate a delicious recipe based on them using
          AI.
        </Text>
        <ThemedInput
          value={ingredients}
          placeholder={'Carrots, Chicken, Rice, ...'}
          onChangeText={setIngredients}
        />
        <ThemedButton
          buttonTitle={'Generate Recipe'}
          icon={<Wand2 size={20} color={'white'} />}
          onPress={() => {}}
        />
      </View>
      <View
        p={16}
        br={16}
        bc={'$orange5Light'}
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
            source={require('./../../../assets/images/food.png')}
          />
        </View>
      </View>
    </ThemedScreen>
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
