// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWps5T4V0s1Zhkr_SCKEAlYr3IK_y38rE",
  authDomain: "precifica-c88aa.firebaseapp.com",
  projectId: "precifica-c88aa",
  storageBucket: "precifica-c88aa.appspot.com",
  messagingSenderId: "651047982503",
  appId: "1:651047982503:web:685a8c1e2e2c52dc16d282",
  measurementId: "G-GJMXJDSYHG",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
