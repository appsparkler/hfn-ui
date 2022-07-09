// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  disableNetwork as $disableNetwork,
  enableNetwork as $enableNetwork,
  collection,
} from "firebase/firestore";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { ENVS, FirestoreCollections } from "widgets/BhandaraCheckin/types";

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

export const firestoreDb = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

export const analytics = getAnalytics(app);

export const initFirebase = (env: ENVS) => {
  enableIndexedDbPersistence(firestoreDb).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
};

export const turnOffOfflineMode = async () => {
  localStorage.removeItem(LocalStorageKeys.OFFLINE_MODE);
  await $enableNetwork(firestoreDb);
};

export const turnOnOfflineMode = async () => {
  localStorage.setItem(LocalStorageKeys.OFFLINE_MODE, "true");
  await $disableNetwork(firestoreDb);
};

export const checkinsCollection = collection(
  firestoreDb,
  FirestoreCollections.CHECKINS
);
