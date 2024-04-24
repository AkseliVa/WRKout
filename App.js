import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {app, database} from './components/firebase'

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import MyWorkouts from './components/MyWorkouts';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "#4d0b0b",
          },
          tabBarStyle: {
            backgroundColor: "#4d0b0b"
          },
          tabBarIcon: ({  color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName="home"
            } else if (route.name === "New Workout") {
              iconName="weight-lifter"
            } else if (route.name === "My Workouts") {
              iconName="history"
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={"white"} />
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{ 
            headerTintColor: "white",
          }}  
        >           
          </Tab.Screen>
        <Tab.Screen 
          name="New Workout"
          options={{ 
            headerTintColor: "white"
          }} 
        >
          {() => <NewWorkout database={database} />}
        </Tab.Screen>
        <Tab.Screen 
          name="My Workouts"
          options={{ 
            headerTintColor: "white"
          }} 
        >
          {() => <MyWorkouts database={database} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
  
}

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: "#c3195d"
  }
});
