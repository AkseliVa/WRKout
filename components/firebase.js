import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCybN7bvjKJ0oT6XtrruBGQnAGpXX6fBEY",
    authDomain: "workouts-86a8d.firebaseapp.com",
    databaseURL: "https://workouts-86a8d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "workouts-86a8d",
    storageBucket: "workouts-86a8d.appspot.com",
    messagingSenderId: "199288975711",
    appId: "1:199288975711:web:dd5b4e6ccf653a230c46ea"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
