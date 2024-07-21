import { View, Text } from 'tamagui';
import { useEffect, useState } from 'react';

import { Platform } from 'react-native';
import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import ConfirmationDialog from '@/components/confirmationDialog';
import RecipeDetails from '@/components/recipeDetails';
import RecipeDetailsTabs from '@/components/recipeDetailsTabs';
import {
  useGetRecipeByIdQuery,
  useUploadRecipeImageMutation,
  useDeleteRecipeMutation,
} from '@/store/api/recipes';

function details() {
  const [recipe, setRecipe] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const localSearchParams = useLocalSearchParams();
  const { data, error, isLoading } = useGetRecipeByIdQuery(
    localSearchParams.id,
  );
  const [uploadRecipeImage] =
    useUploadRecipeImageMutation();

  const [deleteRecipe] = useDeleteRecipeMutation();
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
  async function handleDelete() {
    await deleteRecipe(recipe._id);
    setIsDialogOpen(false);
    router.replace('/(tabs)/recipes');
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  function handleDeleteConfirmation() {
    setIsDialogOpen(true);
  }
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
        onOpenDialog={handleDeleteConfirmation}
      />
      <View
        paddingHorizontal={8}
        alignContent={'space-between'}
      >
        <RecipeDetailsTabs
          ingredients={recipe?.ingredients}
          steps={recipe?.instructions}
          macros={[
            {
              _id: 1,
              name:
                'Calories: ' +
                recipe?.calories +
                ' per serving',
            },
            {
              _id: 2,
              name: 'Carbs: ' + recipe?.carbs,
            },
            { _id: 3, name: 'Fat: ' + recipe?.fat },
            {
              _id: 4,
              name: 'Protein: ' + recipe?.protein,
            },
          ]}
        />
      </View>
      <ConfirmationDialog
        open={isDialogOpen}
        confirmationText="Delete Recipe"
        acceptTextDescription="Are you sure you want to delete this recipe?"
        onAccept={handleDelete}
        onReject={handleCancel}
        acceptText="Delete"
        rejectText="Cancel"
      />
    </View>
  );
}

export default details;
