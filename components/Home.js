import { Text, StyleSheet, View } from "react-native"

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
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
  });