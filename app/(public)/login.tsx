import { StyleSheet, Image, View, TextInput, Button, Pressable, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { useAuth } from '../../provider/AuthProvider';

const Page = () => {
    const [email, setEmail] = useState('iulia@test.com');
    const [password, setPassword] = useState('123456');
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
        <View style={styles.container}>
            {/* <Spinner visible={loading} /> */}
            <Image style={styles.logo} source={{ uri: 'https://galaxies.dev/img/lockup.webp' }} />

            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.inputField} />
            <TextInput secureTextEntry placeholder="Password" value={password} onChangeText={setPassword} style={styles.inputField} />
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            <Link href={'/(public)/register'} asChild>
                <Pressable style={styles.button}>
                    <Text>Create new account</Text>
                </Pressable>
            </Link>
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
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
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
    button: {
        marginTop: 20,
        alignItems: 'center',
        textDecorationLine: 'underline',
    },
});