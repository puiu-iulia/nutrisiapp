import React, { useEffect, useState } from 'react';
import { Pressable, FlatList } from 'react-native';
import { View, Sheet, Text, XStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons';

import ThemedButton from './button';
import PressableText from './pressableText';
import { useRevenueCat } from '@/store/revenuecat/provider';

interface subscriptionProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: any;
  onPress: () => void;
}

export function SubscriptionModal({
  isOpen,
  setIsOpen,
  data,
  onPress,
}: subscriptionProps) {
  const {
    user,
    packages,
    purchasePackage,
    restorePermissions,
  } = useRevenueCat();

  //console.log(user, packages.length);
  return (
    <Sheet
      //forceRemoveScrollEnabled={isOpen}
      open={isOpen}
      onOpenChange={setIsOpen}
      zIndex={100_000}
      snapPoints={[93]}
      modal
      //dismissOnSnapToBottom
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      {/* <Sheet.Handle /> */}
      <Sheet.Frame>
        <View
          p={16}
          bc={'white'}
          f={1}
          jc={'space-between'}
        >
          <XStack jc="space-between">
            <Text
              fontSize={22}
              fontWeight={'bold'}
              pb={16}
              color={'$gray2Dark'}
              fontFamily={'$nutrisi'}
            >
              Choose Your Premium Subscription
            </Text>

            <Pressable
              onPress={() => setIsOpen(false)}
              style={{
                width: 28,
                height: 28,
              }}
            >
              <X
                size={28}
                color={'$nutrisi'}
                onPress={() => setIsOpen(false)}
              />
            </Pressable>
          </XStack>
          <FlatList
            data={packages}
            keyExtractor={(item) => item.product.identifier}
            renderItem={({ item }) => (
              <Pressable
                style={{
                  width: '100%',
                  height: 40,
                  borderBottomColor: '#555',
                  borderBottomWidth: 1,
                }}
                onPress={async () => {
                  await purchasePackage(item);
                  setIsOpen(false);
                }}
              >
                <Text color={'$nutrisi'} mb={8} fs={17}>
                  {item.product.identifier}
                </Text>
              </Pressable>
            )}
          />
          <View pb={24}>
            <PressableText
              text="Restore Purchases"
              onPress={() => restorePermissions()}
            />
            <ThemedButton
              buttonTitle="Apply Filters"
              disabled={false}
              onPress={() => {
                setIsOpen(false);
              }}
            />
          </View>
        </View>
      </Sheet.Frame>
    </Sheet>
  );
}
