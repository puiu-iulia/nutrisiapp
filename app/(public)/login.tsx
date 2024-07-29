import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Spinner } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import AuthForm from '@/components/authForm';
import ThemedScreen from '@/components/screen';
import {
  loginUser,
  setAuthData,
} from '@/store/auth/actions';

const Page = () => {
  const loading = useSelector(
    (state: any) => state.auth.loading,
  );
  const error = useSelector(
    (state: any) => state.auth.error,
  );

  const [loginError, setLoginError] = useState<any>(null);

  console.log('loginError', error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setLoginError(error);
    }
  }, [error]);

  useEffect(() => {
    if (loginError) {
      Alert.alert(
        'Invalid Credentials',
        'Authentication Error',
        [
          {
            text: 'OK',
            onPress: () => {
              setLoginError(null);
            },
          },
        ],
      );
    }
  }, [loginError]);

  async function tryLocalSignin() {
    dispatch(
      setAuthData({
        loading: true,
        token: null,
        success: false,
      }),
    );
    const token =
      await SecureStore.getItemAsync('auth_token');
    if (token) {
      dispatch(
        setAuthData({
          loading: false,
          token: token,
          success: true,
        }),
      );
    } else {
      dispatch(
        setAuthData({
          loading: false,
          token: null,
          success: false,
        }),
      );
    }
  }

  useEffect(() => {
    tryLocalSignin();
  }, []);

  async function handleLogin(
    email: string,
    password: string,
  ) {
    //@ts-ignore
    dispatch(loginUser({ email, password })).then(
      (action: any) => {
        if (action.type === 'auth/login/fulfilled') {
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
          <Spinner size="large" color={'$nutrisi'} />
        ) : (
          <AuthForm
            onSubmit={(email: string, password: string) => {
              handleLogin(email, password);
            }}
            type="login"
            error={loginError}
          />
        )}
      </View>
    </ThemedScreen>
  );
};

export default Page;
