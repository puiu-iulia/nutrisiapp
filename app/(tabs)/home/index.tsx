import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { View, Text } from 'tamagui';
import { Wand2, Settings2 } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import ThemedScreen from '@/components/screen';
import ThemedButton from '@/components/button';
import ThemedInput from '@/components/input';
import RecipeList from '@/components/recipesList';
import PremiumCard from '@/components/premiumCard';
import ThemedSpinner from '@/components/spinner';
import FiltersModal from '@/components/filtersModal';
import {
  useGenerateRecipeMutation,
  useGetPuplicRecipesQuery,
} from '@/store/api/recipes';
import { setRecipePreferences } from '@/store/preferences/actions';
import { useRevenueCat } from '@/store/revenuecat/provider';

import Header from '@/components/header';

export default function Generate() {
  const [ingredients, setIngredients] =
    useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipePreferences, setRecipePreferences] =
    useState<any>([]);
  const [freeRecipes, setFreeRecipes] = useState<any>(0);

  const [generateRecipe, { data, error, isLoading }] =
    useGenerateRecipeMutation();

  const router = useRouter();

  const { user } = useRevenueCat();

  useEffect(() => {
    if (data && !isLoading && !error) {
      router.navigate(`(tabs)/recipes/${data?.data._id}`);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    const getFreeRecipes = async () => {
      const value =
        await SecureStore.getItemAsync('free_recipes');
      if (value !== null) {
        setFreeRecipes(parseInt(value));
      }
    };
    getFreeRecipes();
  }, []);

  const updateFreeRecipes = async () => {
    await SecureStore.setItemAsync(
      'free_recipes',
      (freeRecipes - 1).toString(),
    );
    setFreeRecipes(freeRecipes - 1);
  };

  if (isLoading) {
    return <ThemedSpinner />;
  }

  if (error) {
    return (
      <ThemedScreen>
        <View f={1} jc="center">
          <Text>
            An error occured. Please try again later.
          </Text>
        </View>
      </ThemedScreen>
    );
  }

  return (
    <ThemedScreen>
      <Header
        title="Generate Recipe"
        icon={<Settings2 size={24} color={'$gray1Dark'} />}
        onIconPress={() => setIsOpen(true)}
      />
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
          buttonTitle={
            'Generate Recipe' +
            (!user.pro
              ? ` (${freeRecipes} recipes left)`
              : '')
          }
          disabled={
            !ingredients || (!user.pro && freeRecipes <= 0)
          }
          icon={<Wand2 size={20} color={'white'} />}
          onPress={() => {
            Keyboard.dismiss();
            generateRecipe({
              ingredientsText: ingredients,
              preferences: recipePreferences,
            });
            if (!user.pro) {
              updateFreeRecipes();
            }
          }}
        />
      </View>
      {!user.pro ? <PremiumCard /> : <></>}
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
