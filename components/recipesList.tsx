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
              shadowRadius={2}
              elevationAndroid={2}
              //overflow="hidden"
              jc={'space-between'}
            >
              <View
                br={8}
                backgroundColor={'$nutrisiLight'}
                paddingHorizontal={8}
                paddingVertical={4}
                opacity={0.8}
              >
                <Text
                  color={'$gray1Dark'}
                  fontSize={16}
                  numberOfLines={2}
                  fontFamily={'$nutrisi'}
                  fontWeight={'600'}
                >
                  {item.name}
                </Text>
              </View>
              <XStack
                bc={'$nutrisiLight'}
                ai={'center'}
                jc={'space-around'}
                br={8}
                paddingHorizontal={8}
                paddingVertical={4}
                w={100}
                opacity={0.7}
              >
                <XStack ai={'center'}>
                  <Users
                    size={18}
                    color={'$gray1Dark'}
                    //style={{ marginTop: 2 }}
                  />
                  <Text fontSize={18} color={'$gray1Dark'}>
                    {item?.servings}
                  </Text>
                </XStack>
                <Separator vertical />
                <XStack>
                  <Timer
                    size={18}
                    color={'$gray1Dark'}
                    style={{ marginTop: 2 }}
                  />
                  <Text fontSize={18} color={'$gray1Dark'}>
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
