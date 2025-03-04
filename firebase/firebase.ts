// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2WQb4iPC90DKrPZ04V8x_8CyVKXu2Qeg",
  authDomain: "magazine-app-238d1.firebaseapp.com",
  projectId: "magazine-app-238d1",
  storageBucket: "magazine-app-238d1.firebasestorage.app",
  messagingSenderId: "1048399527760",
  appId: "1:1048399527760:web:3e8fe96a3c8d16d1b03655",
  measurementId: "G-SXLKZ629H5",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app) // error
let analytics
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}
const auth = getAuth(app)

export { app, auth, analytics }
