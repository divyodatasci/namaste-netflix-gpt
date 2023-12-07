// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABxx2rpfGMvLxiOyH-Bd45tw2YiM1I4dM",
  authDomain: "namaste-netflix-gpt-a5fb6.firebaseapp.com",
  projectId: "namaste-netflix-gpt-a5fb6",
  storageBucket: "namaste-netflix-gpt-a5fb6.appspot.com",
  messagingSenderId: "167627809483",
  appId: "1:167627809483:web:66c3486f9a3892a0bb314e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
