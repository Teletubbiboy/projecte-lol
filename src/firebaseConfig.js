// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvJ58ZLN6b7HkpbDRVyJbw6O7oGbmhC9Y",
  authDomain: "ecomerce-46d8b.firebaseapp.com",
  projectId: "ecomerce-46d8b",
  storageBucket: "ecomerce-46d8b.firebasestorage.app",
  messagingSenderId: "670381101410",
  appId: "1:670381101410:web:1a01dffccb7917ed495c3b",
  measurementId: "G-X9NGWLY2KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);