import { useState } from 'react';
import {
  StyleSheet,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import {
  Button,
  View,
  Text,
  Sheet,
  TextArea,
} from 'tamagui';
import {
  Wand2,
  Settings2,
  Camera,
} from '@tamagui/lucide-icons';

import ThemedScreen from '@/components/screen';
import ThemedButton from '@/components/button';
import ThemedInput from '@/components/input';
import PremiumCard from '@/components/premiumCard';
import ThemedImagePicker from '@/components/imagePicker';
import { useGenerateRecipeMutation } from '@/store/api/recipes';

export default function TabOneScreen() {
  const [ingredients, setIngredients] =
    useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [generateRecipe, { data, error, isLoading }] =
    useGenerateRecipeMutation();

  console.log(data, error, isLoading);

  return (
    <ThemedScreen>
      <View
        fd={'row'}
        jc={'space-between'}
        pt={Platform.OS == 'ios' ? 48 : 24}
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
        <Pressable
          onPress={() => setIsOpen(true)}
          style={{
            width: 24,
            height: 24,
          }}
        >
          <Settings2 size={24} color={'$gray1Dark'} />
        </Pressable>
      </View>
      <View p={16} br={16} bc={'$yellow2Light'} mb={16}>
        <Text fontSize={16} color={'$gray1Dark'} mb={8}>
          Add your ingredients followed by a comma and we'll
          generate a delicious recipe based on them using
          AI.
        </Text>
        <ThemedInput
          value={ingredients}
          placeholder={'Carrots, Chicken, Rice, ...,'}
          onChangeText={setIngredients}
        />
        <ThemedImagePicker
          onSubmit={(uri) => console.log(uri)}
        />
        <ThemedButton
          buttonTitle={'Generate Recipe'}
          icon={<Wand2 size={20} color={'white'} />}
          onPress={() => {
            setIsOpen(true);
            Keyboard.dismiss();
            generateRecipe({
              ingredientsText: ingredients,
            });
          }}
        />
      </View>
      <PremiumCard />
      <Sheet
        forceRemoveScrollEnabled={isOpen}
        open={isOpen}
        onOpenChange={setIsOpen}
        zIndex={100_000}
        snapPoints={[93]}
        modal
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame>
          <View p={16} bc={'white'} f={1}>
            <Text fontSize={20} fontWeight={'bold'} pb={16}>
              Generated Recipe
            </Text>
            <Text fontSize={16} color={'$gray1Dark'}>
              {data?.data}
            </Text>
            <Button
              onPress={() => setIsOpen(false)}
              bc={'$nutrisi'}
              color={'white'}
              fontSize={16}
              mb={16}
              fontWeight={'bold'}
              p={16}
            >
              Close
            </Button>
          </View>
        </Sheet.Frame>
      </Sheet>
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
