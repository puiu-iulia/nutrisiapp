import { useState, useEffect } from 'react';
import { View, Text } from 'tamagui';
import { useRouter } from 'expo-router';

import ThemedScreen from '@/components/screen';
import RecipeList from '@/components/recipesList';
import {
  useGetRecipesQuery,
  useDeleteRecipeMutation,
} from '@/store/api/recipes';

function index() {
  const [recipes, setRecipes] = useState<any>([]);
  const [searchQuery, setSearchQuery] =
    useState<string>('');
  const { data, error, isLoading, refetch } =
    useGetRecipesQuery(searchQuery, {
      refetchOnMountOrArgChange: true,
    });

  const [
    deleteRecipe,
    {
      data: deleteData,
      error: deleteError,
      isLoading: deleteIsLoading,
    },
  ] = useDeleteRecipeMutation();

  const router = useRouter();

  useEffect(() => {
    if (data && !isLoading) {
      setRecipes(data);
    }
  }, [data, searchQuery, refetch]);

  if (isLoading) {
    return (
      <ThemedScreen>
        <View f={1} jc="center">
          <Text>Loading...</Text>
        </View>
      </ThemedScreen>
    );
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
      <Text
        fontSize={24}
        color={'$gray1Dark'}
        fontWeight={'bold'}
        w={'$15'}
      >
        All Recipes
      </Text>
      <View f={1} jc="center">
        <RecipeList
          recipes={recipes}
          onItemPress={(id) =>
            router.navigate(`/(tabs)/recipes/${id}`)
          }
          onDelete={async (id) => {
            await deleteRecipe(id);
          }}
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
      </View>
    </ThemedScreen>
  );
}

export default index;
