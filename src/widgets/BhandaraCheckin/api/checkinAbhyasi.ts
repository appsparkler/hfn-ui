import {
  CheckinAbhyasiApi,
  FirestoreCollections,
} from "widgets/BhandaraCheckin/types";
import { LocalStorageKeys } from "../constants";
import { firestoreDb } from "widgets/BhandaraCheckin/firebase";
import { collection, addDoc } from "firebase/firestore";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      checkedInAbhyasis.push(abhyasiId);
      resolve(true);
    }, 1000);
  });

export const checkinAbhyasi: CheckinAbhyasiApi = async (abhyasiId) => {
  try {
    const data = {
      abhyasiId,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
    };
    const abhyasiIdCollection = collection(
      firestoreDb,
      FirestoreCollections.ABHYASI_ID_CHECKINS
    );
    addDoc(abhyasiIdCollection, data);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
