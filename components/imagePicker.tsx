import React, { useState } from 'react';
import { Pressable, Image, Platform } from 'react-native';
import { YStack, Separator, View, Sheet } from 'tamagui';
import * as ImagePicker from 'expo-image-picker';
import { Camera, ImagePlus } from '@tamagui/lucide-icons';

import PressableText from './pressableText';

interface imagePickerProps {
  onSubmit: (arg0: any) => void;
  image?: string | null;
}

function ThemedImagePicker({
  onSubmit,
  image,
}: imagePickerProps) {
  const [imageUri, setImageUri] = useState(image || '');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('Gallery');

  async function pickImage(type: string) {
    if (Platform.OS == 'ios') {
      const { status } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert(
          'Sorry, we need camera roll permissions to make this work!',
        );
      }
    }
    let result;
    if (type === 'Gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });
    } else if (type === 'Camera') {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });
    }
    if (result && !result.canceled) {
      setImageUri(result.assets[0].uri);
      onSubmit(result.assets[0].uri);
    }
  }

  return (
    <View>
      <View>
        {imageUri ? (
          <Image
            style={{
              width: '100%',
              height: 200,
              marginBottom: 8,
            }}
            source={{ uri: imageUri }}
          />
        ) : null}
      </View>
      <PressableText
        onPress={() => setIsOpen(true)}
        text={`${imageUri ? 'Change' : 'Upload'} Image`}
        icon={<Camera size={24} color={'$nutrisi'} />}
      />
      <Sheet
        forceRemoveScrollEnabled={isOpen}
        open={isOpen}
        onOpenChange={setIsOpen}
        zIndex={100_000}
        snapPoints={[20]}
        modal
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame>
          <YStack
            p={32}
            bc={'white'}
            f={1}
            ai={'center'}
            jc={'space-evenly'}
          >
            <PressableText
              onPress={() => {
                pickImage('Gallery');
                setIsOpen(false);
              }}
              text={'From Gallery'}
              icon={
                <ImagePlus size={24} color={'$nutrisi'} />
              }
            />
            <PressableText
              onPress={() => {
                pickImage('Camera');
                setIsOpen(false);
              }}
              text={'Open Camera'}
              icon={<Camera size={24} color={'$nutrisi'} />}
            />
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}

export default ThemedImagePicker;
