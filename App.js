import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {app, database} from './components/firebase'
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import MyWorkouts from './components/MyWorkouts';
import Login from './components/Login';

const Tab = createBottomTabNavigator()

export default function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "#4d0b0b",
          },
          tabBarStyle: {
            backgroundColor: "#4d0b0b"
          },
          tabBarIcon: ({ size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName="home"
            } else if (route.name === "New Workout") {
              iconName="weight-lifter"
            } else if (route.name === "My Workouts") {
              iconName="history"
            } else if (route.name === "Login") {
              iconName="login"
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
          {() => <NewWorkout database={database} user={user} userId={userId} />}
        </Tab.Screen>
        {user && (
          <Tab.Screen 
            name="My Workouts"
            component={MyWorkouts}
            options={{ 
              headerTintColor: "white"
            }} 
          />
        )}
        {!user && (
          <Tab.Screen 
            name="Login"
            component={Login}
            options={{ 
              headerTintColor: "white"
            }} 
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
  
}