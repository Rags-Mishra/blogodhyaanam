// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA1-KgLDoN3QDSVzW7n2NC6zLKGTRqo0I",
  authDomain: "blogodhyaanam.firebaseapp.com",
  projectId: "blogodhyaanam",
  storageBucket: "blogodhyaanam.firebasestorage.app",
  messagingSenderId: "712304354320",
  appId: "1:712304354320:web:8038491f0e3ff31528d695",
  measurementId: "G-9CCR7QLD3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
