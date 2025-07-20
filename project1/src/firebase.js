import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCx2Wrfgn734vkJeMdCMx2eTzfyNPvCI08",
  authDomain: "milkquality-5e897.firebaseapp.com",
  projectId: "milkquality-5e897",
  storageBucket: "milkquality-5e897.firebasestorage.app",
  messagingSenderId: "661655893724",
  appId: "1:661655893724:web:895e66d9a318b9b4212619",
  measurementId: "G-BP4M9T7TBH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
