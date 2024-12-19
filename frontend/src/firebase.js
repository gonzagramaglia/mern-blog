// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b914f.firebaseapp.com",
  projectId: "mern-blog-b914f",
  storageBucket: "mern-blog-b914f.firebasestorage.app",
  messagingSenderId: "851189617939",
  appId: "1:851189617939:web:f9ab3f78fe034f330b36e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
