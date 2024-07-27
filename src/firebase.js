// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc,setDoc }from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsy7q7x71oLkjktAreSsfdYU0MFl1xuuc",
  authDomain: "penny-wise-6b50b.firebaseapp.com",
  projectId: "penny-wise-6b50b",
  storageBucket: "penny-wise-6b50b.appspot.com",
  messagingSenderId: "812476823855",
  appId: "1:812476823855:web:76cbba76a6a430cd2dc9da",
  measurementId: "G-NZGV5Q7WVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db,auth,provider,doc,setDoc};