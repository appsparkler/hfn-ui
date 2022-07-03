// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIbvf35U0paxiNBx2ZZ_Y_vKKh9nLuFf4",
  authDomain: "checkin-dev-98729.firebaseapp.com",
  projectId: "checkin-dev-98729",
  storageBucket: "checkin-dev-98729.appspot.com",
  messagingSenderId: "605870671215",
  appId: "1:605870671215:web:d78d2f20e450a60be3949a",
  measurementId: "G-BVQ3BH867H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
