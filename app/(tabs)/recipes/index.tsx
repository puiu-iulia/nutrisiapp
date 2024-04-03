import { useState, useEffect } from 'react';
import { View, Text } from 'tamagui';
import { useRouter } from 'expo-router';

import ThemedScreen from '@/components/screen';
import RecipeList from '@/components/recipesList';
import { useGetRecipesQuery } from '@/store/api/recipes';

function index() {
  const { data, error, isLoading } = useGetRecipesQuery();
  const [recipes, setRecipes] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    if (data && data.length > 0 && !isLoading) {
      setRecipes(data);
    }
  }, [data]);
  return (
    <ThemedScreen>
      <View f={1} jc="center">
        <RecipeList
          recipes={recipes}
          onItemPress={(id) =>
            router.navigate(`/(tabs)/recipes/${id}`)
          }
        />
      </View>
    </ThemedScreen>
  );
}

export default index;
