import React from "react";
import { Modal, Text, View, Button, Alert, StyleSheet } from "react-native";

const ModalComponent = ({ modalVisible, setModalVisible, setAddedExercises }) => {
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
  }
})