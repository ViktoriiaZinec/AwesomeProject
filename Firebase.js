import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtFfc2qQbbkU-CiXyDJPLtYpXJJwvtLoE",

  authDomain: "appweb-ee0c5.firebaseapp.com",

  projectId: "appweb-ee0c5",

  storageBucket: "appweb-ee0c5.appspot.com",

  messagingSenderId: "271144394933",

  appId: "1:271144394933:web:0054f316033e2fa495defc",

  measurementId: "G-X025SSMXP4",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
