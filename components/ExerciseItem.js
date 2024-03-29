import * as React from 'react'
import { View, Text, Image, Button, StyleSheet } from "react-native";

const ExerciseItem = ({ item, AddExercise }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Image style={{ width: 250, height: 100 }} source={{ uri: item.gifUrl }} />
            <Button title="ADD TO WORKOUT" onPress={() => AddExercise(item)} />
        </View>
    );
}

export default ExerciseItem;

const styles = StyleSheet.create ({
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