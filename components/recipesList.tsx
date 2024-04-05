import { View, Text, XStack, Separator } from 'tamagui';
import {
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
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
            style={{
              width: '48%',
              height: 160,
              marginBottom: 8,
              borderRadius: 16,
              overflow: 'hidden',
            }}
            onPress={function onPress() {
              onItemPress(item._id);
            }}
          >
            <ImageBackground
              source={{
                uri:
                  'http://192.168.0.103:3000/uploads/' +
                  item?.image,
              }}
              style={{
                height: 160,
                width: '100%',
                backgroundColor: '#c4d4c4',
              }}
            >
              <View
                mb={8}
                br={16}
                f={1}
                p={16}
                jc={'space-between'}
              >
                <View
                  br={8}
                  backgroundColor={'$nutrisiLight'}
                  paddingHorizontal={8}
                  paddingVertical={4}
                  opacity={0.9}
                >
                  <Text
                    color={'$gray1Dark'}
                    fontSize={16}
                    numberOfLines={2}
                    fontWeight={'700'}
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
                  opacity={0.8}
                >
                  <XStack ai={'center'}>
                    <Users
                      size={18}
                      color={'$gray1Dark'}
                      //style={{ marginTop: 2 }}
                    />
                    <Text
                      fontSize={18}
                      color={'$gray1Dark'}
                    >
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
                    <Text
                      fontSize={18}
                      color={'$gray1Dark'}
                    >
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
            </ImageBackground>
          </Pressable>
        )}
      />
    </View>
  );
}

export default RecipeList;
