import { useEffect, useState } from 'react';
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
import { Wand2, Settings2 } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

import ThemedScreen from '@/components/screen';
import ThemedButton from '@/components/button';
import ThemedInput from '@/components/input';
import RecipeList from '@/components/recipesList';
import PremiumCard from '@/components/premiumCard';
import ThemedImagePicker from '@/components/imagePicker';
import FiltersModal from '@/components/filtersModal';
import {
  useGenerateRecipeMutation,
  useGetPuplicRecipesQuery,
} from '@/store/api/recipes';
import { setRecipePreferences } from '@/store/preferences/actions';

export default function Generate() {
  const [ingredients, setIngredients] =
    useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipePreferences, setRecipePreferences] =
    useState<any>([]);

  const [generateRecipe, { data, error, isLoading }] =
    useGenerateRecipeMutation();

  if (isLoading) {
    return (
      <ThemedScreen>
        <View f={1} jc="center">
          <Text>Loading...</Text>
        </View>
      </ThemedScreen>
    );
  }

  return (
    <ThemedScreen>
      <View fd={'row'} jc={'space-between'} ai={'center'}>
        <Text
          fontSize={24}
          color={'$gray1Dark'}
          fontWeight={'bold'}
          numberOfLines={2}
          w={'$15'}
          lh={32}
          pb={16}
        >
          Not sure what to cook?
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
      <View
        p={16}
        br={16}
        shadowColor={'$gray6Dark'}
        shadowRadius={4}
        shadowOpacity={0.2}
        bc={'white'}
        mb={16}
      >
        <Text
          fontSize={15}
          lh={22}
          color={'$gray1Dark'}
          mb={8}
        >
          Add your ingredients and we'll create a delicious
          recipe
        </Text>
        <ThemedInput
          value={ingredients}
          placeholder={'Carrots, Chicken, Rice, ...,'}
          onChangeText={setIngredients}
        />
        {/* <ThemedImagePicker
          onSubmit={(uri) => console.log(uri)}
        /> */}
        <ThemedButton
          buttonTitle={'Generate Recipe'}
          disabled={!ingredients}
          icon={<Wand2 size={20} color={'white'} />}
          onPress={() => {
            Keyboard.dismiss();
            generateRecipe({
              ingredientsText: ingredients,
              preferences: recipePreferences,
            });
          }}
        />
      </View>
      <PremiumCard />
      <FiltersModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        applyFilters={(preferences: string[]) => {
          setRecipePreferences(preferences);
          setIsOpen(false);
        }}
      />
    </ThemedScreen>
  );
}
