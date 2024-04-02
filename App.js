import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDatabase, push, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import MyWorkouts from './components/MyWorkouts';

const Tab = createBottomTabNavigator()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCybN7bvjKJ0oT6XtrruBGQnAGpXX6fBEY",
  authDomain: "workouts-86a8d.firebaseapp.com",
  databaseURL: "https://workouts-86a8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "workouts-86a8d",
  storageBucket: "workouts-86a8d.appspot.com",
  messagingSenderId: "199288975711",
  appId: "1:199288975711:web:dd5b4e6ccf653a230c46ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size}) => {
            let iconName;

            if (route.name === "Home") {
              iconName="home"
            } else if (route.name === "New Workout") {
              iconName="weight-lifter"
            } else if (route.name === "My Workouts") {
              iconName="history"
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          }
        })}
      >
        <Tab.Screen name="Home" component={Home}></Tab.Screen>
        <Tab.Screen name="New Workout">
          {() => <NewWorkout database={database} />}
        </Tab.Screen>
        <Tab.Screen name="My Workouts">
          {() => <MyWorkouts database={database} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
