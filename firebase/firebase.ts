// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU4xU0DamDmhRP8ScwmFcSt3rdXPu8DP0",
  authDomain: "the-execuvision.firebaseapp.com",
  projectId: "the-execuvision",
  storageBucket: "the-execuvision.firebasestorage.app",
  messagingSenderId: "654606856809",
  appId: "1:654606856809:web:79cbc980467dc5dc7468f8",
  measurementId: "G-BTW6Q1XL1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app) // error
let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, analytics, db }
