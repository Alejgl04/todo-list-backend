// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { envs } from './envs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envs.apiKey,
  authDomain: envs.authDomain,
  projectId: envs.projectId,
  storageBucket: envs.storageBucket,
  messagingSenderId: envs.messagingSenderid,
  appId: envs.appId,
  measurementId: envs.measureMentid,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getFirestore(firebaseApp);
