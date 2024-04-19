import { Text, StyleSheet, View } from "react-native"

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>The App For Your Workout</Text>
            <Text style={styles.header}>Needs</Text>
            <Text style={styles.text}>In the "New Workout" page you can</Text>
            <Text style={{color: "white", fontSize: 25}}>search for exercises by:</Text>
            <Text style={{color: "white", fontSize: 20}}>* Exercise name</Text>
            <Text style={{color: "white", fontSize: 20}}>* Bodypart</Text>
            <Text style={{color: "white", fontSize: 20}}>* Equipment</Text>
            <Text style={styles.text}>In the "My Workouts" you can view</Text>
            <Text style={{color: "white", fontSize: 25}}>your saved workouts</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c3195d",
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        color: "white",
        marginTop: 50,
        fontSize: 25
    },
    header: {
        color: "white",
        fontSize: 30
    }
  });