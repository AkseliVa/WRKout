import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {app, database} from './components/firebase'

import Home from './components/Home';
import NewWorkout from './components/NewWorkout';
import Login from './components/Login'
import MyWorkouts from './components/MyWorkouts';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

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
              iconName = "home";
            } else if (route.name === "New Workout") {
              iconName = "weight-lifter";
            } else if (route.name === "My Workouts") {
              iconName = "history";
            } else if (route.name === "Login") {
              user ? iconName = "logout" :
              iconName = "login";
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={"white"} />;
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          options={{ 
            headerTintColor: "white",
          }}  
        >
          {() => <Home user={user} />}
        </Tab.Screen>
        <Tab.Screen 
          name="New Workout"
          options={{ 
            headerTintColor: "white"
          }} 
        >
          {() => <NewWorkout database={database} user={user} userId={userId} />}
        </Tab.Screen>
          <Tab.Screen 
            name="My Workouts"
            component={MyWorkouts}
            options={{ 
              headerTintColor: "white"
            }} 
          />
          <Tab.Screen 
            name="Login"
          >
            {() => <Login user={user}/>}
            </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}