// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "video-con-7205e.firebaseapp.com",
  projectId: "video-con-7205e",
  storageBucket: "video-con-7205e.firebasestorage.app",
  messagingSenderId: "973774025785",
  appId: "1:973774025785:web:20b02f2f3034bc6038c9e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);