import React from 'react';
import { Stack } from 'expo-router';

function Page() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default Page;
