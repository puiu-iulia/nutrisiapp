import { useState } from 'react';
import { FlatList } from 'react-native';
import type { TabsContentProps } from 'tamagui';
import {
  Button,
  H5,
  Separator,
  SizableText,
  Tabs,
  XStack,
  Text,
  isWeb,
} from 'tamagui';

function RecipeDetailsTabs({
  ingredients,
  steps,
  macros,
}: any) {
  //console.log('ingredients', steps);
  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width={400}
      height={600}
      borderRadius="$4"
      borderWidth="$0.25"
      overflow="hidden"
      borderColor="$borderColor"
    >
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account"
      >
        <Tabs.Tab flex={1} value="tab1">
          <SizableText fontFamily="$body">
            Ingredients
          </SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab2">
          <SizableText fontFamily="$body">
            Steps
          </SizableText>
        </Tabs.Tab>
        <Tabs.Tab flex={1} value="tab3">
          <SizableText fontFamily="$body">
            Nutrition
          </SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator />
      <Tabs.Content value="tab1" f={1}>
        <FlatList
          data={ingredients || []}
          keyExtractor={(item: any) => item._id}
          renderItem={({ item }) => {
            return (
              <XStack f={1} paddingVertical={8}>
                <Text color={'$gray2Dark'} fontSize={17}>
                  {item.ingredient.name}
                </Text>
              </XStack>
            );
          }}
        />
      </Tabs.Content>

      <Tabs.Content value="tab2">
        <FlatList
          data={steps || []}
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
    </Tabs>
  );
}

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      height={600}
      justifyContent="center"
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {props.children}
    </Tabs.Content>
  );
};

// function DetailsList({ data }: any) {
//   console.log('data', data);
//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item: any) => item._id}
//       renderItem={(item: any) => (
//         <XStack f={1} paddingVertical={8}>
//           <Text color={'$gray2Dark'} fontSize={17}>
//             {item.name}
//           </Text>
//         </XStack>
//       )}
//     />
//   );
// }

export default RecipeDetailsTabs;
