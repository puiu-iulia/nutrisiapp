import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { ArrowLeft, Trash2 } from '@tamagui/lucide-icons';
import { XStack, Text, View, Separator } from 'tamagui';

import RecipeDetailsTabs from './recipeDetailsTabs';

interface RecipeDetailsProps {
  recipe: any;
  isLoading: boolean;
  error: any;
  goBack: () => void;
}

interface LabelProps {
  label: string;
  value: string;
}

function RecipeDetails({
  recipe,
  isLoading,
  error,
  goBack,
}: RecipeDetailsProps) {
  //console.log('recipe', recipe);
  function Label({ label, value }: LabelProps) {
    return (
      <View>
        <Text fontSize={15} color={'$gray1Dark'} pb={2}>
          {label}
        </Text>
        <Text
          fontWeight={'bold'}
          color={'$gray1Dark'}
          fontSize={15}
        >
          {value}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <XStack ai={'center'} mr={8} mb={8}>
        <Pressable
          onPress={goBack}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <ArrowLeft color={'$nutrisi'} size={30} />
        </Pressable>
        <Text
          color={'$gray1Dark'}
          fontSize={23}
          fontFamily={'$nutrisi'}
          ta={'center'}
        >
          {recipe?.name}
        </Text>
      </XStack>
      <Text color={'$gray1Dark'} fontSize={15} mb={8}>
        {recipe?.description}
      </Text>
      <XStack justifyContent="space-between" pb={8}>
        <Label
          label="Calories"
          value={recipe?.calories.replace(' per ', '/')}
        />
        <Separator vertical />
        <Label label="Prep Time" value={recipe?.prepTime} />
        <Separator vertical />
        <Label label="Cook Time" value={recipe?.cookTime} />
        <Separator vertical />
        <Label label="Servings" value={recipe?.servings} />
      </XStack>
    </View>
  );
}

export default RecipeDetails;
