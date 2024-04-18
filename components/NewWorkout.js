import * as React from 'react'
import {  useState, forwardRef } from "react";
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Button, Alert, Keyboard, FlatList, Image } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

import ModalComponent from "../components/ModalComponent";
import SearchTermItems from "./SearchTermItem";
import BodypartItem from "./BodypartItem";
import EquipmentItem from "./EquipmentItem";

export default function NewWorkout({database}) {
    const [exercises, setExercises] = useState([])
    const [addedExercises, setAddedExercises] = useState([])

    const [open, setOpen] = useState(false);
    const [bodypartOpen, setBodypartOpen] = useState(false)
    const [equipmentOpen, setEquipmentOpen] = useState(false)

    const [value, setValue] = useState(null);
    const [bodypart, setBodypart] = useState(null)
    const [equipment, setEquipment] = useState(null)

    const [modalVisible, setModalVisible] = useState(false)

    const [bodypartItems, setBodypartItems] = BodypartItem();
    const [items, setItems] = SearchTermItems();
    const [equipmentItems, setEquipmentItems] = EquipmentItem();    

    const [search, setSearch] = useState("")

    const closeDropDown = () => {
        setOpen(false);
        setBodypartOpen(false)
        setEquipmentOpen(false)
        Keyboard.dismiss()
    };

    const searchExercise = async () => {
        let url = ""
        if (value === "name") {
            url = `https://exercisedb.p.rapidapi.com/exercises/name/${search}?limit=100`
        } else if (value === "bodypart") {
            url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=100`
        } else if (value === "equipment") {
            url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=100`
        } else {
            Alert.alert("Choose a search term")
        }

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b91c571323msh3ac916856233011p1726fajsna35f9c080827',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setExercises(result)
        } catch (error) {
            console.error("error fetching", error);
        }
    }

    const renderItem = ({item}) => {
        const isAdded = addedExercises.some(exercise => exercise.id === item.id);

        return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Image style={{width:250, height: 100}}
                source={{uri: item.gifUrl}} />
            {isAdded ? (
                <AntDesign style={{paddingTop: 15}} name="checkcircle" size={24} color="black" />
            ) : (
            <Button title="ADD TO WORKOUT" onPress={() => AddExercise(item)} />
            )}
        </View>
        )
    }

    const AddExercise = (item) => {
        setAddedExercises(prevExercises => [...prevExercises, item]);
    }

    const CustomDropDownPicker = forwardRef((props, ref) => {
        return <DropDownPicker ref={ref} {...props} />;
      });

      return (
        <View style={styles.container}>
            <Button title="Show Workout" onPress={() => setModalVisible(true)} />
            <ModalComponent
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setAddedExercises={setAddedExercises}
                addedExercises={addedExercises}
                database={database}
            />
            <Text style={{fontWeight: "bold"}}>Search for exercises</Text>
            <TouchableWithoutFeedback onPress={closeDropDown}>
                <View style={styles.highestDropdown}>
                    <CustomDropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
            </TouchableWithoutFeedback>
            {value === "bodypart" && 
                <TouchableWithoutFeedback onPress={closeDropDown}>
                    <View style={styles.dropdown}>
                        <CustomDropDownPicker 
                            open={bodypartOpen}
                            value={bodypart}
                            items={bodypartItems}
                            setOpen={setBodypartOpen}
                            setValue={setBodypart}
                            setItems={setBodypartItems}
                        />
                    </View>
                </TouchableWithoutFeedback>
            }
            {value === "name" && 
                <TextInput style={styles.input} placeholder="Search" onChangeText={(text) => setSearch(text.toLowerCase())} />
            }
            {value === "equipment" && 
                <TouchableWithoutFeedback onPress={closeDropDown}>
                    <View style={styles.dropdown}>
                        <CustomDropDownPicker 
                            open={equipmentOpen}
                            value={equipment}
                            items={equipmentItems}
                            setOpen={setEquipmentOpen}
                            setValue={setEquipment}
                            setItems={setEquipmentItems}
                        />
                    </View>
                </TouchableWithoutFeedback>
            }
            <Button onPress={searchExercise} title="Search" />
            {exercises && (
            <View style={{flex: 1}}>
                 <FlatList 
                    data={exercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </View>
            )}
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center"
    },
    input: {
      width: 200,
      borderColor: 'gray',
      borderWidth: 1,
      textAlign: "center"
    },
    dropdown: {
      width: 200,
      padding: 10,
      position: "relative",
      zIndex: 1000
    },
    highestDropdown: {
      width: 200,
      padding: 10,
      position: "relative",
      zIndex: 2000
    },
    image: {
      width: 250,
      height: 100,
      resizeMode: 'contain',
      borderRadius: 5,
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
  });