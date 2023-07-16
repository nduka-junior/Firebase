// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
require('dotenv').config()

// const firebaseConfig = {
//   apiKey: "AIzaSyDaISfmA1Lqyv6Qv5lDQyhymQ7UwIQeDM4",
//   authDomain: "learning-e8305.firebaseapp.com",
//   projectId: "learning-e8305",
//   storageBucket: "learning-e8305.appspot.com",
//   messagingSenderId: "373480467294",
//   appId: "1:373480467294:web:7d829f5da36e7235d0bdcf",
// };

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  
export const storage = getStorage(app);