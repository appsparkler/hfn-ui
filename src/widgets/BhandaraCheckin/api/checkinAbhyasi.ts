import { CheckinAbhyasiApi } from "widgets/BhandaraCheckin/types";
import { db } from "widgets/BhandaraCheckin/firebase";
import { addDoc, collection } from "firebase/firestore";

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
    const abhyasiIdCheckinsCollection = collection(db, "abhyasiId-checkins");
    await addDoc(abhyasiIdCheckinsCollection, {
      abhyasiId,
      timestamp: Date.now(),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
