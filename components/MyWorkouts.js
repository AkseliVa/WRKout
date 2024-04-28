import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, Image, Button, TouchableOpacity, Pressable } from 'react-native';
import { ref, set, onValue } from 'firebase/database';
import { database } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function MyWorkouts() {
    const [workouts, setWorkouts] = useState([]);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

            setUserId(user.uid);
            const fetchWorkouts = () => {
                const itemsRef = ref(database, `users/${user.uid}/workouts/`);
                onValue(itemsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const workoutsArray = Object.keys(data).map((key) => ({
                            id: key,
                            name: data[key].workoutName,
                            exercises: data[key].exercises,
                            isExpanded: false,
                        }));
                        setWorkouts(workoutsArray);
                    } else {
                        setWorkouts([]);
                    }
                });
            };

            fetchWorkouts();

    }, []);

    const deleteWorkout = (workoutId, userId) => {
        const workoutRef = ref(database, `users/${userId}/workouts/${workoutId}`);
        set(workoutRef, null)
            .then(() => {
                console.log('Workout deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting workout: ', error);
            });
    };

    const toggleExpand = (workoutId) => {
        setWorkouts((prevWorkouts) =>
            prevWorkouts.map((workout) =>
                workout.id === workoutId ? { ...workout, isExpanded: !workout.isExpanded } : workout
            )
        );
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => toggleExpand(item.id)} style={styles.button}>
                    <Text style={styles.workoutName}>{item.name}</Text>
                </Pressable>
                {item.isExpanded && (
                    <>
                    <Pressable style={styles.button} onPress={() => deleteWorkout(item.id, userId)}>
                        <Text>Delete</Text>
                    </Pressable>
                    <View style={{flex: 1, width: "100%"}}>
                        <FlatList
                            data={item.exercises}
                            renderItem={({ item: exercise }) => (
                                <View style={styles.item}>
                                    <Text style={styles.itemText}>{exercise.name}</Text>
                                    <Image style={{ width: 250, height: 200 }} source={{ uri: exercise.gifUrl }} />
                                </View>
                            )}
                            keyExtractor={(exercise) => exercise.id}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                        />
                    </View>
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {workouts.length > 0 ? (
                <View style={{flex: 1, width: "100%"}}>
                    <FlatList
                        data={workouts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                    />
                </View>
            ) : (
                <Text style={{color: "white", fontSize: 30, fontWeight: "bold"}}>No workouts yet</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bb0d22",
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
        marginBottom: 10
    },
    workoutName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    button: {
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        margin: 15,
        shadowColor: '#680747',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 10,
        shadowRadius: 5,
      }
});
