import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Home, BookMarked } from '@tamagui/lucide-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<
    typeof MaterialCommunityIcons
  >['name'];
  color: string;
}) {
  return (
    <MaterialCommunityIcons
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4f6c4e',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          height: Platform.OS == 'ios' ? 80 : 64,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarItemStyle: {
          paddingBottom: 16,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',

          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'All Recipes',
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="silverware-fork-knife"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
