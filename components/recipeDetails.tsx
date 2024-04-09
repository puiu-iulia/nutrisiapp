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
import { XStack, Text, View, Separator } from 'tamagui';

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

interface LabelProps {
  label: string;
  value: string;
}

function RecipeDetails({
  recipe,
  isLoading,
  error,
  goBack,
  onPhotoChange,
  onOpenDialog,
}: RecipeDetailsProps) {
  console.log('recipe', recipe);
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
      <ImageBackground
        style={{
          width: '100%',
          height: 280,
          backgroundColor: '#c4d4c4',
        }}
        source={{
          uri:
            'http://192.168.0.103:3000/uploads/' +
            recipe?.image,
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
            <ArrowLeft color={'$nutrisi'} size={30} />
          </Pressable>
          <Text
            color={'white'}
            textShadowColor={'black'}
            textShadowRadius={4}
            //textShadowOffset={{ width: 1, height: 1 }}
            fontSize={23}
            fontWeight={'700'}
            ta={'center'}
            //bc={'$nutrisiDark'}
            paddingHorizontal={16}
            numberOfLines={2}
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
            <Trash2 color={'$nutrisi'} size={30} />
          </Pressable>
        </XStack>
      </ImageBackground>
      <XStack jc={'space-around'} pt={16}>
        <ThemedImagePicker
          onSubmit={(uri) => onPhotoChange(uri)}
        />
        <PressableText
          text={'Add to Meal Plan'}
          icon={<Plus size={24} color={'$nutrisi'} />}
          onPress={() => {}}
        />
      </XStack>
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
