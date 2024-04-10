import React, { useState } from 'react';
import { View, Spinner } from 'tamagui';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import AuthForm from '@/components/authForm';
import ThemedScreen from '@/components/screen';
import { registerUser } from '@/store/auth/actions';

const Page = () => {
  const loading = useSelector(
    (state: any) => state.auth.loading,
  );
  const registerError = useSelector(
    (state: any) => state.auth.error,
  );
  console.log('registerError', registerError);

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
          />
        )}
      </View>
    </ThemedScreen>
  );
};

export default Page;
