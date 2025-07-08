// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKEIG0X_wJFGGo4yQCqDBsUSJYT5JIIu0",
  authDomain: "curator-ai-3ad58.firebaseapp.com",
  projectId: "curator-ai-3ad58",
  storageBucket: "curator-ai-3ad58.firebasestorage.app",
  messagingSenderId: "432604607783",
  appId: "1:432604607783:web:37a7508b3271f322aa2502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Named exports must match your imports in Login.jsx
export { auth, provider, signInWithPopup };