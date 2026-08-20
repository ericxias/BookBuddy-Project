// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
////npm i firebase
import { getAuth, signOut, updateEmail, updatePassword, sendPasswordResetEmail } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: "ecse428-69588.firebaseapp.com",
  projectId: "ecse428-69588",
  storageBucket: "ecse428-69588.appspot.com",
  messagingSenderId: "1063655494444",
  appId: "1:1063655494444:web:1143c02374fc83dd855289"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, signOut, updateEmail, updatePassword, sendPasswordResetEmail };