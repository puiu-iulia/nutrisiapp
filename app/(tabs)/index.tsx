import React from 'react';
import { Redirect } from 'expo-router';

function index() {
  return <Redirect href="/(tabs)/home" />;
}

export default index;
