import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, Spinner } from 'tamagui';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import AuthForm from '@/components/authForm';
import ThemedScreen from '@/components/screen';
import { registerUser } from '@/store/auth/actions';

const Page = () => {
  const [registerError, setRegisterError] =
    useState<any>(null);
  const loading = useSelector(
    (state: any) => state.auth.loading,
  );
  const error = useSelector(
    (state: any) => state.auth.error,
  );
  useEffect(() => {
    if (error) {
      setRegisterError(error);
    }
  }, [error]);

  useEffect(() => {
    if (registerError) {
      Alert.alert(
        'Email already in use',
        'Authentication Error',
        [
          {
            text: 'OK',
            onPress: () => {
              setRegisterError(null);
            },
          },
        ],
      );
    }
  }, [registerError]);

  const dispatch = useDispatch();

  async function handleRegistration(
    email: string,
    password: string,
  ) {
    //@ts-ignore
    dispatch(registerUser({ email, password })).then(
      (action: any) => {
        if (action.type === 'auth/register/fulfilled') {
          SecureStore.setItemAsync(
            'auth_token',
            action.payload.token,
          );
          SecureStore.setItemAsync('free_recipes', '3');
        }
      },
    );
  }

  return (
    <ThemedScreen>
      <View f={1} jc="center">
        {loading ? (
          <Spinner />
        ) : (
          <AuthForm
            onSubmit={(email: string, password: string) => {
              handleRegistration(email, password);
            }}
            type="register"
            error={registerError}
          />
        )}
      </View>
    </ThemedScreen>
  );
};

export default Page;
