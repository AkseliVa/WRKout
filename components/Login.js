import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
            alert("Sign in failed: " + error.message)
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
        } catch (error) {
            console.log(error)
            alert("Sign up failed: " + error.message)
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../WRKOUT-logo.png')}
            />
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Login"
                onPress={handleLogin}
                color="white"
            />
            <Button 
                title="Sign up"
                onPress={handleSignUp}
                color="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bb0d22',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    logo: {
        width: 250,
        height: 100,
        marginTop: -70,
        marginBottom: 50,
        borderRadius: 10,
    },
    header: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
});
