// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const passwordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;
  return await confirmPasswordReset(auth, oobCode, newPassword);
};