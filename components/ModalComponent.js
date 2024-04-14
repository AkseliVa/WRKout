import React, { useState } from 'react';
import { Modal, Text, View, Button, Alert, StyleSheet, FlatList, Image, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { push, ref, set } from 'firebase/database';

const ModalComponent = ({ modalVisible, setModalVisible, setAddedExercises, addedExercises, database }) => {
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
        const workoutRef = ref(database, `workouts/${workoutKey}`);
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
                <Button title="Delete" onPress={() => deleteExercise(index)} />
            </View>
        );
    };

    const deleteExercise = (index) => {
        const updatedExercises = [...addedExercises];
        updatedExercises.splice(index, 1);
        setAddedExercises(updatedExercises);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>WORKOUT</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Insert workout name'
                            value={workoutName}
                            onChangeText={setWorkoutName}
                        />

                        {addedExercises &&
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={addedExercises}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                    }}
                                />
                            </View>
                        }
                        <Button title="Save" onPress={saveWorkout} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                        <Button title="Reset" onPress={() => setAddedExercises([])} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
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
        fontFamily: 'Cochin',
        lineHeight: 24,
        color: 'black',
    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
    },
});
