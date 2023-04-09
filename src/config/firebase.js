import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD8xloBMq8HcyD9Eib22HSqWuiOff3GwAI",
  authDomain: "sponge-house-learning.firebaseapp.com",
  projectId: "sponge-house-learning",
  storageBucket: "sponge-house-learning.appspot.com",
  messagingSenderId: "1039651314042",
  appId: "1:1039651314042:web:720134e69b5879a4609ec3",
  measurementId: "G-P8X7CQ72D1"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app)