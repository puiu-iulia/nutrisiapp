import { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Plus,
  Trash2,
} from '@tamagui/lucide-icons';
import { XStack, Text, View } from 'tamagui';

import ThemedImagePicker from './imagePicker';
import PressableText from './pressableText';

interface RecipeDetailsProps {
  recipe: any;
  isLoading: boolean;
  error: any;
  goBack: () => void;
  onPhotoChange: (uri: string) => void;
  onOpenDialog: () => void;
}

function RecipeDetails({
  recipe,
  isLoading,
  error,
  goBack,
  onPhotoChange,
  onOpenDialog,
}: RecipeDetailsProps) {
  return (
    <View>
      <ImageBackground
        style={{
          width: '100%',
          height: 280,
          backgroundColor: '#c4d4c4',
        }}
        source={{
          uri: recipe?.image || '',
        }}
      >
        <XStack
          ai={'center'}
          paddingHorizontal={8}
          pt={Platform.OS == 'ios' ? 54 : 32}
        >
          <Pressable
            onPress={goBack}
            style={styles.buttonContainer}
          >
            <ArrowLeft color={'$nutrisi'} size={24} />
          </Pressable>
          <Text
            color={'white'}
            textShadowColor={'black'}
            textShadowRadius={4}
            fontSize={20}
            fontWeight={'700'}
            ta={'center'}
            paddingHorizontal={16}
            f={4}
          >
            {recipe?.name}
          </Text>
          <Pressable
            onPress={() => {
              onOpenDialog();
            }}
            style={styles.buttonContainer}
          >
            <Trash2 color={'$nutrisi'} size={24} />
          </Pressable>
        </XStack>
      </ImageBackground>
      {/* <XStack jc={'space-around'} pt={16}>
        <ThemedImagePicker
          onSubmit={(uri) => onPhotoChange(uri)}
        />
        <PressableText
          text={'Add to Meal Plan'}
          icon={<Plus size={24} color={'$nutrisi'} />}
          onPress={() => {}}
        />
      </XStack> */}
    </View>
  );
}

export default RecipeDetails;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 8,
  },
});
