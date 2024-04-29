import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Image, Alert, Pressable } from 'react-native';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "./firebase";

export default function Login({user}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                Alert.alert("Logged out successfully");
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    const handleLogin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Logged in successfully");
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Sign up failed: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../WRKOUT-logo.png')}
            />
            {!user ? (
                <>
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
                </>
            ) : (
                <Button 
                        title="Logout"
                        onPress={handleLogout}
                        color="white"
                    />
            )}
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
    button: {
        padding: 10,
        alignItems: "center",
    }
})
