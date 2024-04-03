import { View, Text, XStack, Separator } from 'tamagui';
import { Pressable, FlatList } from 'react-native';
import { Users, Timer } from '@tamagui/lucide-icons';

import PressableText from './pressableText';

interface RecipeListProps {
  recipes: any[];
  onItemPress: (id: any) => void;
}

function RecipeList({
  recipes,
  onItemPress,
}: RecipeListProps) {
  //console.log('recipes', recipes);
  return (
    <View mt={16} flex={1}>
      <FlatList
        data={recipes}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 16,
        }}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: '48%', height: 160 }}
            onPress={function onPress() {
              onItemPress(item._id);
            }}
          >
            <View
              bc={'$nutrisiDark'}
              mb={8}
              br={16}
              f={1}
              p={16}
              shadowColor={'$nutrisi'}
              shadowRadius={4}
              overflow="hidden"
              jc={'space-between'}
            >
              <Text
                color={'$gray1Dark'}
                fontSize={18}
                pb={8}
                numberOfLines={2}
                fontFamily={'$heading'}
                fontWeight={'600'}
              >
                {item.name}
              </Text>
              <XStack pb={8} bc={'white'}>
                <XStack>
                  <Users size={24} color={'$gray1Dark'} />
                  <Text fontSize={24}>
                    {item?.servings}
                  </Text>
                </XStack>
                <XStack>
                  <Separator vertical />
                  <Timer size={24} color={'$gray1Dark'} />
                  <Text>
                    {Number(
                      item?.prepTime.replace(
                        ' minutes',
                        '',
                      ),
                    ) +
                      Number(
                        item?.cookTime.replace(
                          ' minutes',
                          '',
                        ),
                      )}
                  </Text>
                </XStack>
              </XStack>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default RecipeList;
