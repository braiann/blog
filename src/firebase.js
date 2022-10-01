// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpzppayNxsF-lthsjNiRl1VCiMbQlglvs",
  authDomain: "blog-ff862.firebaseapp.com",
  projectId: "blog-ff862",
  storageBucket: "blog-ff862.appspot.com",
  messagingSenderId: "106828362522",
  appId: "1:106828362522:web:681b2c9e9f0b933faa72a3",
  measurementId: "G-5GD7FFQ3ZK"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
const analytics = getAnalytics(app)