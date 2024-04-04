import { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { View, Sheet, Text, XStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import ThemedButton from './button';
import PressableText from './pressableText';

const PREFERENCES = [
  {
    type: 'What is your goal?',
    values: [
      { title: 'Healthy Eating' },
      { title: 'Weight Loss' },
      { title: 'Low Carb' },
      { title: 'High Protein' },
      { title: 'Quick & Easy' },
    ],
  },
  {
    type: 'Diet',
    values: [
      { title: 'Vegan' },
      { title: 'Vegetarian' },
      { title: 'Pescatarian' },
      { title: 'Keto' },
      { title: 'Paleo' },
    ],
  },
  // {
  //   type: 'Allergies',
  //   values: [
  //     { title: 'Dairy' },
  //     { title: 'Gluten' },
  //     { title: 'Peanuts' },
  //     { title: 'Soy' },
  //     { title: 'Shellfish' },
  //   ],
  // },
  {
    type: 'Time',
    values: [
      { title: 'Under 20 minutes' },
      { title: 'Under 40 minutes' },
      { title: 'Under 1 hour' },
      { title: 'Under 2 hours' },
    ],
  },
  {
    type: 'Cuisine',
    values: [
      { title: 'Mediterranean' },
      { title: 'Italian' },
      { title: 'Mexican' },
      { title: 'Chinese' },
      { title: 'Indian' },
      { title: 'Japanese' },
      { title: 'Thai' },
      { title: 'American' },
    ],
  },
  {
    type: 'Meal Type',
    values: [
      { title: 'Breakfast' },
      { title: 'Lunch' },
      { title: 'Dinner' },
      { title: 'Snack' },
      { title: 'Dessert' },
    ],
  },
];

interface PreferencesModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: any;
  applyFilters: (preferences: string[]) => void;
}

function FiltersModal({
  isOpen,
  setIsOpen,
  data,
  applyFilters,
}: PreferencesModalProps) {
  const initialState = PREFERENCES.map((preference) => {
    // @ts-ignore
    preference.selectedValue = '';
    return preference;
  });
  const [selectedFilters, setSelectedFilters] =
    useState(initialState);

  //console.log(selectedFilters);
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
              Recipe Preferences
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
          <ScrollView>
            {PREFERENCES.map((preference) => (
              <View key={preference.type} pb={16}>
                <Text
                  fontSize={18}
                  fontWeight={'bold'}
                  color={'$gray2Dark'}
                  pb={8}
                >
                  {preference.type}
                </Text>
                <View
                  fd={'row'}
                  flexWrap="wrap"
                  ai={'center'}
                >
                  {preference.values.map((value) => (
                    <Pressable
                      style={{
                        backgroundColor:
                          selectedFilters?.find(
                            (filter) => {
                              // @ts-ignore
                              return (
                                filter.type ===
                                  preference.type &&
                                // @ts-ignore
                                filter?.selectedValue ===
                                  value.title
                              );
                            },
                          )
                            ? '#c4d4c4'
                            : '#f0f4f0',
                        flexDirection: 'row',
                        padding: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginRight: 8,
                        marginBottom: 4,
                      }}
                      key={value.title}
                      onPress={() => {
                        const newSelectedFilters =
                          selectedFilters.map((filter) => {
                            if (
                              // @ts-ignore
                              filter.type ===
                              preference.type
                            ) {
                              return {
                                // @ts-ignore
                                ...filter,
                                selectedValue: value.title,
                              };
                            }
                            return filter;
                          });
                        setSelectedFilters(
                          newSelectedFilters,
                        );
                      }}
                    >
                      <Text
                        fontSize={14}
                        color={'$gray1Dark'}
                        numberOfLines={1}
                      >
                        {value.title}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
          <View pb={24}>
            <PressableText
              text="Clear All Filters"
              onPress={() =>
                setSelectedFilters(initialState)
              }
              icon={<X size={18} color={'$nutrisi'} />}
            />
            <ThemedButton
              buttonTitle="Apply Filters"
              disabled={selectedFilters.every(
                // @ts-ignore
                (filter) => !filter.selectedValue,
              )}
              onPress={() => {
                setIsOpen(false);
                const preferences = selectedFilters.filter(
                  (filter) => {
                    // @ts-ignore
                    if (filter.selectedValue) {
                      return true;
                    }
                    return false;
                  },
                );
                applyFilters(
                  preferences.map((filter) => {
                    // @ts-ignore
                    return filter.selectedValue;
                  }),
                );
              }}
            />
          </View>
        </View>
      </Sheet.Frame>
    </Sheet>
  );
}

export default FiltersModal;
