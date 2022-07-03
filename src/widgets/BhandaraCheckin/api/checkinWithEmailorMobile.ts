import {
  CheckinEmailOrMobileUserDetails,
  CheckinWithEmailOrMobileApi,
  FirestoreCollections,
} from "widgets/BhandaraCheckin/types";
import { v4 as uuid } from "uuid";
import { db } from "widgets/BhandaraCheckin/dexie";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { firestoreDb } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const checkedInEmailOreMobileUsers: CheckinEmailOrMobileUserDetails[] = [];

export const mockedCheckinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  userDetails
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      checkedInEmailOreMobileUsers.push(userDetails);
      resolve(true);
    }, 1000);
  });

export const checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi = async (
  attendee
) => {
  try {
    addDoc(
      collection(firestoreDb, FirestoreCollections.OTHER_CHECKINS),
      attendee
    );
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
