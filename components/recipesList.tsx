import { View, Text, XStack, Separator } from 'tamagui';
import { Pressable, FlatList } from 'react-native';
import { ChevronRight } from '@tamagui/lucide-icons';

import PressableText from './pressableText';

interface RecipeListProps {
  recipes: any[];
}

interface LabelProps {
  label: string;
  value: string;
}

function RecipeList({ recipes }: RecipeListProps) {
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
    <View mt={16} flex={1}>
      <XStack justifyContent="space-between">
        <Text
          fontSize={16}
          color={'$gray5Dark'}
          fontWeight={'600'}
        >
          Latest recipes
        </Text>
        <PressableText text="See All" onPress={() => {}} />
      </XStack>
      <FlatList
        data={recipes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable>
            <XStack
              bc={'white'}
              mb={8}
              p={16}
              br={16}
              shadowColor={'$gray6Dark'}
              shadowOpacity={0.2}
              shadowRadius={4}
              overflow="hidden"
              justifyContent="space-between"
              alignItems="center"
            >
              <View width={'85%'}>
                <Text
                  color={'$gray1Dark'}
                  fontSize={24}
                  pb={8}
                  numberOfLines={1}
                  fontFamily={'$heading'}
                  fontWeight={'600'}
                >
                  {item.name}
                </Text>
                <XStack
                  justifyContent="space-between"
                  pb={8}
                >
                  <Label
                    label="Calories"
                    value={item.calories.replace(
                      ' per serving',
                      'kcal',
                    )}
                  />
                  <Separator vertical />
                  <Label
                    label="Prep Time"
                    value={item.prepTime}
                  />
                  <Separator vertical />
                  <Label
                    label="Cook Time"
                    value={item.cookTime}
                  />
                </XStack>
                <Text color={'$gray1Dark'} fontSize={15}>
                  {'Fat: ' +
                    item.fat +
                    ', Carbs: ' +
                    item.carbs +
                    ', Protein: ' +
                    item.protein}
                </Text>
              </View>
              <View>
                <ChevronRight
                  size={24}
                  color={'$gray10Dark'}
                />
              </View>
            </XStack>
          </Pressable>
        )}
      />
    </View>
  );
}

export default RecipeList;
