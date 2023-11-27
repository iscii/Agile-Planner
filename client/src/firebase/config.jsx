// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAwtWUNnxlLo1REozZDJpgKpOrQ0UIhLcA",
  authDomain: "cs-554-project-37070.firebaseapp.com",
  projectId: "cs-554-project-37070",
  storageBucket: "cs-554-project-37070.appspot.com",
  messagingSenderId: "793448464193",
  appId: "1:793448464193:web:17f816d22cebff1088ebc0",
  measurementId: "G-1WV98F681S"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)