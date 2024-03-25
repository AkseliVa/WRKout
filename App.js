import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import History from './components/MyWorkouts';

const Tab = createBottomTabNavigator()

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
        <Tab.Screen name="New Workout" component={NewWorkout} ></Tab.Screen>
        <Tab.Screen name="My Workouts" component={History}></Tab.Screen>
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
