import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwkfOiimKCxTQL6RpN6fhPuXIl2MUtW-8",
  authDomain: "react-andy-e6d33.firebaseapp.com",
  projectId: "react-andy-e6d33",
  storageBucket: "react-andy-e6d33.appspot.com",
  messagingSenderId: "245564416777",
  appId: "1:245564416777:web:c8661571c39b5849c869d8",
  measurementId: "G-YJBTYVEE7B",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
