import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  initializeFirestore,
} from "firebase/firestore";
import { isString } from "lodash/fp";

// const NODE_ENV = process.env.NODE_ENV;
const firebaseConfig = process.env.REACT_APP_FIREBASE;

const firebaseApp =
  isString(firebaseConfig) && initializeApp(JSON.parse(firebaseConfig));

export const firestoreDb =
  firebaseApp &&
  initializeFirestore(firebaseApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    ignoreUndefinedProperties: true,
  });

firestoreDb &&
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

export const firebaseAuth = getAuth();
