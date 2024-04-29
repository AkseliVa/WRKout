import React, { useState } from 'react';
import { Text, View, Alert, StyleSheet, FlatList, Image, TextInput, Pressable } from "react-native";
import { ref, set } from 'firebase/database';
import RNModal from 'react-native-modal'

const ModalComponent = ({ modalVisible, setModalVisible, setAddedExercises, addedExercises, database, userId, user }) => {
    const [workoutName, setWorkoutName] = useState("");

    const workoutSavedAlert = () =>
    Alert.alert("Success", "Workout saved", [
      {text: 'OK', onPress: () => setModalVisible(!modalVisible)},
    ]);

    const saveWorkout = () => {
      if (workoutName === "") {
        Alert.alert("Error", "Workout must have a name")
      } else {
        const workoutKey = workoutName;
        const workoutRef = ref(database, `users/${userId}/workouts/${workoutKey}`);
        set(workoutRef, { workoutName, exercises: addedExercises });
        setWorkoutName("")
        setAddedExercises([]);
        workoutSavedAlert()
      }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Image style={{ width: 250, height: 100 }} source={{ uri: item.gifUrl }} />
                <Pressable style={styles.button} onPress={() => deleteExercise(index)}>
                    <Text>Delete</Text>
                </Pressable>
            </View>
        );
    };

    const deleteExercise = (index) => {
        const updatedExercises = [...addedExercises];
        updatedExercises.splice(index, 1);
        setAddedExercises(updatedExercises);
    };

    return (
        <RNModal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>WORKOUT</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Insert workout name'
                            placeholderTextColor={"grey"}
                            value={workoutName}
                            onChangeText={setWorkoutName}
                        />

                        {addedExercises &&
                            <View style={{flex: 1}}>
                                <FlatList
                                    data={addedExercises}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                    }}
                                    style={{flex: 1}}
                                />
                            </View>
                        }
                        {addedExercises.length === 0 && 
                            <View style={{flex: 1}}>
                                <Text>No exercises added yet</Text>
                            </View>
                        }
                        <View style={{flexDirection: "row"}}>
                            <Pressable onPress={saveWorkout} style={styles.button}>
                                <Text>Save</Text>
                            </Pressable>
                            <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
                                <Text>Close</Text>
                            </Pressable>
                            <Pressable onPress={() => setAddedExercises([])} style={styles.button}>
                                <Text>Reset</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
        </RNModal>
    );
};

export default ModalComponent;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 300,
        height: 600,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
        marginBottom: 7
    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        color: "black"
    },
    button: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 15,
        marginRight: 15,
        shadowColor: '#680747',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 10,
        shadowRadius: 5,
      }
});
