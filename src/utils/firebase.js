// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuUmpkst6zW3gH5khbP16xCms3t4XMg4k",
  authDomain: "theflix-gpt.firebaseapp.com",
  projectId: "theflix-gpt",
  storageBucket: "theflix-gpt.firebasestorage.app",
  messagingSenderId: "813351972547",
  appId: "1:813351972547:web:ef317e4d43d82775b77c76",
  measurementId: "G-TDH4JGPNST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth and export it
export const auth = getAuth(app); // Named export for auth
