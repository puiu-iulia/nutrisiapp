import { Button, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useAuth } from '../../provider/AuthProvider';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={styles.container}>
      {/* <Spinner visible={loading} /> */}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.inputField} />
      <TextInput secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} style={styles.inputField} />
      <Button title="Create free account" onPress={handleRegistration} disabled={loading} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  inputField: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
});