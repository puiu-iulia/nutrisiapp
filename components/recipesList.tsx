import React, { useState } from 'react';
import {
  View,
  Text,
  XStack,
  Separator,
  AlertDialog,
} from 'tamagui';
import {
  Pressable,
  FlatList,
  ImageBackground,
  Keyboard,
  TextInput,
} from 'react-native';
import {
  Users,
  Timer,
  Search,
  X,
} from '@tamagui/lucide-icons';

interface RecipeListProps {
  recipes: any[];
  onItemPress: (id: any) => void;
  onDelete: (id: any) => void;
  onSearch: (query: string) => void;
}

function RecipeList({
  recipes,
  onItemPress,
  onSearch,
  onDelete,
}: RecipeListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch() {
    Keyboard.dismiss();
    onSearch(searchQuery);
  }

  function clearInput() {
    Keyboard.dismiss();
    setSearchQuery('');
    onSearch('');
  }

  return (
    <View mt={16} flex={1}>
      <XStack
        br={8}
        backgroundColor={'white'}
        ai={'center'}
        jc={'space-between'}
        mb={8}
      >
        <TextInput
          placeholder="Search for recipes"
          placeholderTextColor={'#505050'}
          value={searchQuery}
          style={{
            flex: 1,
            paddingLeft: 16,
          }}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 48,
            width: 48,
          }}
          onPress={clearInput}
        >
          {searchQuery.length > 0 ? (
            <X size={24} color={'$nutrisi'} />
          ) : null}
        </Pressable>
      </XStack>
      {recipes.length === 0 ? (
        <View f={1} jc={'center'} ai={'center'}>
          <Text fontSize={23} color={'$gray2Dark'}>
            No recipes found...
          </Text>
        </View>
      ) : (
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
                    process.env.EXPO_PUBLIC_IMAGE_URL +
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
                      numberOfLines={3}
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
                      />
                      <Text
                        fontSize={17}
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
                      />
                      <Text
                        fontSize={17}
                        color={'$gray1Dark'}
                      >
                        {parseInt(item?.prepTime) +
                          parseInt(item?.cookTime)}
                        {''}'
                      </Text>
                    </XStack>
                  </XStack>
                </View>
              </ImageBackground>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

export default RecipeList;
