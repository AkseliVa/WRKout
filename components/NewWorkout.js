import { useRef, useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';

export default function NewWorkout() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Exercise name', value: 'name'},
        {label: 'Bodypart', value: 'bodypart'},
        {label: 'Equipment', value: 'equipment'}
    ]);
    const dropDownRef = useRef();

    const closeDropDown = () => {
        setOpen(false);
    };




    return (
        <TouchableWithoutFeedback onPress={closeDropDown}>
            <View style={styles.container}>
                <Text>Exercises</Text>
                <TextInput style={styles.input} placeholder="Search" />
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