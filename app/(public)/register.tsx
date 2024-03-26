import React, { useState } from 'react';
import { View } from 'tamagui';
import AuthForm from '@/components/authForm';
import ThemedScreen from '@/components/screen';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useAuth } from '../../provider/AuthProvider';

const Page = () => {
  const [loading, setLoading] = useState(false);
  //   const { onRegister, onLogin } = useAuth();

  const handleRegistration = async () => {
    // try {
    //   setLoading(true);
    //   await onRegister!(email, password);
    //   await onLogin!(email, password);
    // } catch (error: any) {
    //   console.log(error);
    //   alert(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <ThemedScreen>
      <View f={1} jc="center">
        {/* <Spinner visible={loading} /> */}
        <AuthForm
          onSubmit={handleRegistration}
          type="register"
        />
      </View>
    </ThemedScreen>
  );
};

export default Page;
