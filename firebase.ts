import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import necessary Firestore methods

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzlsRVArkjrY5qNTcTilvIxQpbj8g9erc",
  authDomain: "gym-project-774c2.firebaseapp.com",
  projectId: "gym-project-774c2",
  storageBucket: "gym-project-774c2.firebasestorage.app",
  messagingSenderId: "698111633596",
  appId: "1:698111633596:web:a407b8b0d1c656c31048b9",
  measurementId: "G-QF95TQDMVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc };
export default app;
