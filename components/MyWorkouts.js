import { Text, StyleSheet, View, FlatList, Image, Button } from "react-native"
import { useEffect, useState } from 'react'
import { ref, set, onValue } from 'firebase/database';

export default function MyWorkouts({database}) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const itemsRef = ref(database, 'workouts/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const exercisesArray = Object.values(data).flatMap(workout => workout);
            } else {
                setItems([])
            }
            setItems(exercisesArray);
        })
        }, []);

        const renderItem = ({item, index}) => {
            return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Image style={{width:250, height: 100}}
                    source={{uri: item.gifUrl}} />
            </View>
            )
          }

    return (
        <View style={styles.container}>
            {items && 
                <View style={{flex: 1}}>
                    <FlatList 
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                    }}
                    />
                </View>
            }           
            {items.length === 0 && 
                <Text>No workouts yet</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
  });