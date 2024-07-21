import { current } from '@reduxjs/toolkit';
import { useState } from 'react';
import { FlatList } from 'react-native';
import type {
  TabsContentProps,
  TabLayout,
  StackProps,
  TabsTabProps,
} from 'tamagui';
import {
  Button,
  H5,
  YStack,
  Separator,
  SizableText,
  Tabs,
  XStack,
  Text,
  isWeb,
  styled,
  AnimatePresence,
  View,
} from 'tamagui';

function RecipeDetailsTabs({
  ingredients,
  steps,
  macros,
}: any) {
  const [tabState, setTabState] = useState<{
    currentTab: string;
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null;
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null;
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: 'tab1',
    intentAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) =>
    setTabState({ ...tabState, currentTab });
  const setIntentIndicator = (intentAt: any) =>
    setTabState({ ...tabState, intentAt });
  const setActiveIndicator = (activeAt: any) =>
    setTabState({
      ...tabState,
      prevActiveAt: tabState.activeAt,
      activeAt,
    });
  const { activeAt, intentAt, prevActiveAt, currentTab } =
    tabState;

  /**
   * -1: from left
   *  0: n/a
   *  1: from right
   */
  const direction = (() => {
    if (
      !activeAt ||
      !prevActiveAt ||
      activeAt.x === prevActiveAt.x
    ) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const enterVariant =
    direction === 1
      ? 'isLeft'
      : direction === -1
        ? 'isRight'
        : 'defaultFade';
  const exitVariant =
    direction === 1
      ? 'isRight'
      : direction === -1
        ? 'isLeft'
        : 'defaultFade';

  const handleOnInteraction: TabsTabProps['onInteraction'] =
    (type, layout) => {
      if (type === 'select') {
        setActiveIndicator(layout);
      } else {
        setIntentIndicator(layout);
      }
    };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      flexDirection="column"
      width={'100%'}
      height={'100%'}
      paddingHorizontal={8}
      overflow="hidden"
      activationMode="manual"
    >
      <YStack>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              theme="active"
              active
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          borderColor={'$nutrisiDark'}
          borderWidth={1}
          borderRadius={0}
        >
          <Tabs.Tab
            flex={1}
            value="tab1"
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2.5"
            onInteraction={handleOnInteraction}
          >
            <Text color={'$gray3Dark'} fontWeight={'700'}>
              Ingredients
            </Text>
          </Tabs.Tab>
          <Separator
            backgroundColor={'$nutrisiDark'}
            borderColor={'$nutrisiDark'}
            vertical
          />
          <Tabs.Tab
            flex={1}
            value="tab2"
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            onInteraction={handleOnInteraction}
          >
            <Text color={'$gray3Dark'} fontWeight={'700'}>
              Steps
            </Text>
          </Tabs.Tab>
          <Separator
            backgroundColor={'$nutrisiDark'}
            borderColor={'$nutrisiDark'}
            vertical
            paddingHorizontal={0}
            marginHorizontal={0}
          />
          <Tabs.Tab
            flex={1}
            value="tab3"
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            onInteraction={handleOnInteraction}
          >
            <Text color={'$gray3Dark'} fontWeight={'700'}>
              Nutrition
            </Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1">
          <FlatList
            data={ingredients || []}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }) => {
              return (
                <XStack f={1} paddingVertical={8}>
                  <Text color={'$gray2Dark'} fontSize={17}>
                    {item.quantity + ' - '}
                  </Text>
                  <Text color={'$gray2Dark'} fontSize={17}>
                    {item.ingredient.name}
                  </Text>
                </XStack>
              );
            }}
          />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <View paddingVertical={8}>
            <Text color={'$gray2Dark'} fontSize={17}>
              {steps.replace(
                /(\d\.\s.*?\.)(?=\s*\d\.)/g,
                '$1\n\n',
              )}
            </Text>
          </View>
        </Tabs.Content>

        <Tabs.Content value="tab3">
          <FlatList
            data={macros || []}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }) => {
              return (
                <XStack f={1} paddingVertical={8}>
                  <Text color={'$gray2Dark'} fontSize={17}>
                    {item.name}
                  </Text>
                </XStack>
              );
            }}
          />
        </Tabs.Content>
      </YStack>
    </Tabs>
  );
}

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$nutrisiLight"
      //animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$nutrisiDark',
        opacity: 0.6,
      })}
      {...props}
    />
  );
};

export default RecipeDetailsTabs;
