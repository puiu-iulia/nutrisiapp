import { View, Text } from 'tamagui';
import { useEffect, useState } from 'react';

import { Platform } from 'react-native';
import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import ThemedScreen from '@/components/screen';
import RecipeDetails from '@/components/recipeDetails';
import RecipeDetailsTabs from '@/components/recipeDetailsTabs';
import { useGetRecipeByIdQuery } from '@/store/api/recipes';

function details() {
  const [recipe, setRecipe] = useState<any>(null);

  const localSearchParams = useLocalSearchParams();
  const { data, error, isLoading } = useGetRecipeByIdQuery(
    localSearchParams.id,
  );
  const router = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      setRecipe(data.data);
    }
  }, [data, isLoading, error]);

  //console.log('data', data, error, isLoading);

  return (
    <ThemedScreen>
      <View>
        <RecipeDetails
          recipe={recipe}
          isLoading={isLoading}
          error={error}
          goBack={() => router.back()}
        />
        <RecipeDetailsTabs
          ingredients={recipe?.ingredients}
          steps={recipe?.steps}
          macros={[
            {
              _id: 1,
              name:
                'Calories' +
                recipe?.calories +
                ' per serving',
            },
            { _id: 2, name: 'Carbs' + recipe?.carbs + 'g' },
            { _id: 3, name: 'Fat' + recipe?.fat + 'g' },
            {
              _id: 4,
              name: 'Protein' + recipe?.protein + 'g',
            },
          ]}
        />
      </View>
    </ThemedScreen>
  );
}

export default details;
