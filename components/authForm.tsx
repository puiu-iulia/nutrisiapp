import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View, Input } from 'tamagui';
import {
  Pressable,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import ThemedButton from './button';

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  type?: 'login' | 'register';
}

function AuthForm({
  onSubmit,
  type = 'login',
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const link =
    type === 'login'
      ? '/(public)/register'
      : '/(public)/login';

  function onHandleSubmit() {
    onSubmit(email, password);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <View p={32}>
        <Image
          style={styles.logo}
          source={require('./../assets/images/icon.png')}
        />
        <Input
          value={email}
          placeholder="Email"
          bc={'white'}
          borderWidth={0}
          mb={16}
          color={'$gray3Dark'}
          onChangeText={setEmail}
        />
        <Input
          value={password}
          placeholder="Password"
          secureTextEntry
          borderWidth={0}
          bc={'white'}
          mb={32}
          color={'$gray3Dark'}
          onChangeText={setPassword}
        />
        <ThemedButton
          buttonTitle={type.toUpperCase()}
          onPress={onHandleSubmit}
          disabled={!email || !password}
        />
        <Link href={link} asChild>
          <Pressable>
            <Text
              fontSize={16}
              mt={16}
              color={'$nutrisi'}
              textAlign="center"
              textDecorationLine="underline"
            >
              {type === 'login'
                ? 'Create new account'
                : 'Login into existing account'}
            </Text>
          </Pressable>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
