import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import { ref, set, onValue } from 'firebase/database';

export default function MyWorkouts({ database }) {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = () => {
            const itemsRef = ref(database, 'workouts/');
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
    }, [database]);

    const deleteWorkout = (workoutId) => {
        const workoutRef = ref(database, `workouts/${workoutId}`);
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
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <Text style={styles.workoutName}>{item.name}</Text>
                </TouchableOpacity>
                {item.isExpanded && (
                    <>
                        <Button title="Delete" onPress={() => deleteWorkout(item.id)} />
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
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {workouts.length > 0 ? (
                <FlatList
                    data={workouts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            ) : (
                <Text style={{color: "white", fontSize: 30}}>No workouts yet</Text>
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
        fontFamily: 'Cochin',
        lineHeight: 24,
        color: 'black',
    },
    workoutName: {
        fontSize: 25,
        marginBottom: 10,
    },
});
