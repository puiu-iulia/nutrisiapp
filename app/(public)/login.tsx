import { StyleSheet, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { View, Text, Button, Input } from 'tamagui';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useAuth } from '../../provider/AuthProvider';
import AuthForm from '@/components/authForm';
import ThemedScreen from '@/components/screen';

const Page = () => {
  const [loading, setLoading] = useState(false);
  // const { onLogin } = useAuth();

  const handleLogin = async () => {
    // try {
    //     setLoading(true);
    //     await onLogin!(email, password);
    // } catch (error: any) {
    //     alert(error.message);
    // } finally {
    //     setLoading(false);
    // }
  };

  return (
    <ThemedScreen>
      <View f={1} jc="center">
        {/* <Spinner visible={loading} /> */}
        <AuthForm onSubmit={handleLogin} type="login" />
      </View>
    </ThemedScreen>
  );
};

export default Page;
