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
import {
  useGetRecipeByIdQuery,
  useUploadRecipeImageMutation,
} from '@/store/api/recipes';

function details() {
  const [recipe, setRecipe] = useState<any>(null);

  const localSearchParams = useLocalSearchParams();
  const { data, error, isLoading } = useGetRecipeByIdQuery(
    localSearchParams.id,
  );
  const [uploadRecipeImage] =
    useUploadRecipeImageMutation();
  const router = useRouter();

  useEffect(() => {
    if (data && !isLoading && !error) {
      setRecipe(data.data);
    }
  }, [data, isLoading, error]);

  const handleUploadImage = async (uri: string) => {
    const file = new FormData();
    // @ts-ignore
    file.append('file', {
      name: 'image.jpg',
      type: 'image/jpeg',
      uri:
        Platform.OS === 'ios'
          ? uri.replace('file://', '')
          : uri,
    });

    const response = await uploadRecipeImage({
      recipeId: localSearchParams.id,
      file,
    });

    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      console.log('error', response.error);
    }
  };

  //console.log('data', data, error, isLoading);

  return (
    <View>
      <RecipeDetails
        recipe={recipe}
        isLoading={isLoading}
        error={error}
        goBack={() => router.back()}
        onPhotoChange={(uri: string) => {
          handleUploadImage(uri);
        }}
      />
      <View paddingHorizontal={8}>
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
    </View>
  );
}

export default details;
