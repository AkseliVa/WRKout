import React from 'react';
import { Text, StyleSheet, View, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const goToLoginPage = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 250, height: 100, marginTop: -70, marginBottom: 50, borderRadius: 10 }}
                source={require('../WRKOUT-logo.png')}
            />
            <Text style={styles.header}>The App For Your Workout</Text>
            <Text style={styles.header}>Needs</Text>
            <Text style={styles.text}>In the "New Workout"</Text>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>page you can</Text>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>search for exercises by:</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>* Exercise name</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>* Bodypart</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>* Equipment</Text>
            <Text style={styles.text}>In the "My Workouts" you</Text>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 7, marginRight: 7 }}>can view your saved workouts</Text>

            <Button title="Login" onPress={goToLoginPage} />
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
    text: {
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        fontSize: 25,
        marginLeft: 7,
        marginRight: 7,
    },
    header: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
