// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBfaDvSmFFfw8f-_dIr0YQk3CzV5H0t3Qw',
  authDomain: 'todolist-app-cf44c.firebaseapp.com',
  projectId: 'todolist-app-cf44c',
  storageBucket: 'todolist-app-cf44c.appspot.com',
  messagingSenderId: '282157129285',
  appId: '1:282157129285:web:e49909db8d1d6956518d2c',
  measurementId: 'G-CKQ7GG1R6L',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
