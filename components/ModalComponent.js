import * as React from 'react'
import { Modal, Text, View, Button, Alert, StyleSheet, FlatList, Image } from "react-native";

const ModalComponent = ({ modalVisible, setModalVisible, setAddedExercises, addedExercises }) => {

  const renderItem = ({item, index}) => {
    return (
    <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Image style={{width:250, height: 100}}
            source={{uri: item.gifUrl}} />
        <Button title="Delete" onPress={() => deleteExercise(index)} />
    </View>
    )
  }

  const deleteExercise = (index) => {
    // Create a copy of the addedExercises array
    const updatedExercises = [...addedExercises];
    // Remove the item at the specified index
    updatedExercises.splice(index, 1);
    // Update the state with the modified array
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>WORKOUT</Text>

                    {addedExercises &&
                      <View style={{flex: 1}}>
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

                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <Button title="Reset" onPress={() => setAddedExercises([])} />
                </View>
            </View>
        </Modal>
    );
}

export default ModalComponent;

const styles = StyleSheet.create ({
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
})