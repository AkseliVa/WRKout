import { useRef, useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Button, Alert, Keyboard } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';

export default function NewWorkout() {
    const [open, setOpen] = useState(false);
    const [bodypartOpen, setBodypartOpen] = useState(false)
    const [equipmentOpen, setEquipmentOpen] = useState(false)

    const [value, setValue] = useState(null);
    const [bodypart, setBodypart] = useState(null)
    const [equipment, setEquipment] = useState(null)

    const [bodypartItems, setBodypartItems] = useState([
        {label: 'Back', value: 'back'},
        {label: 'Chest', value: 'chest'},
        {label: 'Cardio', value: 'cardio'},
        {label: 'Lower arms', value: 'lower%20arms'},
        {label: 'Lower legs', value: 'lower%20legs'},
        {label: 'Neck', value: 'neck'},
        {label: 'Shoulders', value: 'shoulders'},
        {label: 'Upper arms', value: 'upper%20arms'},
    ])
    const [items, setItems] = useState([
        {label: 'Exercise name', value: 'name'},
        {label: 'Bodypart', value: 'bodypart'},
        {label: 'Equipment', value: 'equipment'}
    ])
    const [equipmentItems, setEquipmentItems] = useState([
        {label: 'Assisted', value: 'assisted'},
        {label: 'Band', value: 'band'},
        {label: 'Barbell', value: 'barbell'},
        {label: 'Bodyweight', value: 'body%20weight'},
        {label: 'Bosu ball', value: 'bosu%20ball'},
        {label: 'Cable', value: 'cable'},
        {label: 'Dumbbell', value: 'dumbbell'},
        {label: 'Elliptical machine', value: 'elliptical%20machine'},
        {label: 'Ez-barbell', value: 'ez%20barbell'},
        {label: 'Hammer', value: 'hammer'},
        {label: 'Kettlebell', value: 'kettlebell'},
        {label: 'Leverage machine', value: 'leverage%20machine'},
        {label: 'Medicine ball', value: 'medicine%20ball'},
        {label: 'Olympic barbell', value: 'olympic%20barbell'},
        {label: 'Resistance band', value: 'resistance%20band'},
        {label: 'Roller', value: 'roller'},
        {label: 'Rope', value: 'rope'},
        {label: 'Skierg machine', value: 'skierg%20machine'},
        {label: 'Sled machine', value: 'sled%20machine'},
        {label: 'Smith machine', value: 'smith%20machine'},
        {label: 'Stability ball', value: 'stability%20ball'},
        {label: 'Stationary bike', value: 'stationary%20bike'},
        {label: 'Stepmill machine', value: 'stepmill%20machine'},
        {label: 'Tire', value: 'tire'},
        {label: 'Trap bar', value: 'trap%20bar'},
        {label: 'Upperbody ergometer', value: 'upper%20body%20ergometer'},
        {label: 'Weighted', value: 'weighted'},
        {label: 'Wheelroller', value: 'wheel%20roller'},
    ])

    const [search, setSearch] = useState("")

    const dropDownRef = useRef();
    const bodypartDropDownRef = useRef()
    const equipmentDropDownRef = useRef()


    const closeDropDown = () => {
        setOpen(false);
        setBodypartOpen(false)
        setEquipmentOpen(false)
        Keyboard.dismiss()
    };

    const searchExercise = async () => {
        let url = ""
        if (value === "name") {
            url = `https://exercisedb.p.rapidapi.com/exercises/name/${search}?limit=10`
        } else if (value === "bodypart") {
            url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}?limit=10`
        } else if (value === "equipment") {
            url = `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}?limit=10`
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
            const result = await response.text();
            console.log(result);
            console.log(search)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={closeDropDown}>
            <View style={styles.container}>
                <Text>Exercises</Text>
                {value === "bodypart" && 
                <View style={{width: 200, padding: 10}}>
                    <DropDownPicker 
                        open={bodypartOpen}
                        value={bodypart}
                        items={bodypartItems}
                        setOpen={setBodypartOpen}
                        setValue={setBodypart}
                        setItems={setBodypartItems}
                        ref={bodypartDropDownRef}
                    />
                    </View>
                }
                {value === "name" && 
                    <TextInput style={styles.input} placeholder="Search" onChangeText={(text) => setSearch(text.toLowerCase())} />
                }
                {value === "equipment" && 
                <View style={{width: 200, padding: 10}}>
                    <DropDownPicker 
                        open={equipmentOpen}
                        value={equipment}
                        items={equipmentItems}
                        setOpen={setEquipmentOpen}
                        setValue={setEquipment}
                        setItems={setEquipmentItems}
                        ref={equipmentDropDownRef}
                    />
                    </View>
                }
                <View style={{width: 200, padding: 10}}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        ref={dropDownRef}
                    />
                </View>
                <Button onPress={searchExercise} title="Search" />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width:200  , 
        borderColor: 'gray', 
        borderWidth: 1,
        textAlign: "center"
    },
    dropdown: {

    }
  });