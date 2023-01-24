// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  collection,
  connectFirestoreEmulator,
  doc,
} from "firebase/firestore";
import { FirestoreCollections } from "widgets/BhandaraCheckin/types";
import { getEnv } from "../utils";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = getEnv().FIREBASE;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDb = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
if (getEnv().EMULATOR) {
  connectFirestoreEmulator(firestoreDb, "localhost", 8080);
}

export const analytics = getAnalytics(app);

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

export const checkinsCollection = collection(
  firestoreDb,
  FirestoreCollections.CHECKINS
);

export const metaCollection = collection(
  firestoreDb,
  FirestoreCollections.META
);

export function getCheckinDocRef(id: string) {
  return doc(firestoreDb, FirestoreCollections.CHECKINS, id);
}
