import { CheckinAbhyasiApi, CheckinType } from "widgets/BhandaraCheckin/types";
import { LocalStorageKeys } from "../constants";
import { checkinsCollection } from "widgets/BhandaraCheckin/firebase";
import { addDoc } from "firebase/firestore";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  checkedInAbhyasis.push(abhyasiId);
  return true;
};

export const checkinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  try {
    const data = {
      abhyasiId,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinType.ABHYASI_ID,
    };

    addDoc(checkinsCollection, data);
    return true;
  } catch (e) {
    throw new Error("Server Error: Abhyasi ID Checkin");
  }
};
