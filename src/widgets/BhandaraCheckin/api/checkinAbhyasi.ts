import { CheckinAbhyasiApi } from "widgets/BhandaraCheckin/types";
import { LocalStorageKeys } from "../constants";
import { getCheckinDocRef } from "widgets/BhandaraCheckin/firebase";
import { setDoc } from "firebase/firestore";
import {
  CheckinTypesEnum,
  IAbhyasiCheckinApiStoreData,
} from "widgets/BhandaraCheckin/types";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  checkedInAbhyasis.push(abhyasiId);
  return true;
};

export const checkinAbhyasi: CheckinAbhyasiApi = (
  abhyasiId,
  dormAndBerthAllocation,
  eventName,
  batch
) => {
  try {
    const data: IAbhyasiCheckinApiStoreData = {
      abhyasiId,
      timestamp: Date.now(),
      type: CheckinTypesEnum.AbhyasiId,
      dormAndBerthAllocation,
      eventName,
      batch,
    };

    const docRef = getCheckinDocRef(abhyasiId);
    setDoc(docRef, data, { merge: true });
    return true;
  } catch (e) {
    throw new Error("Server Error: Abhyasi ID Checkin");
  }
};
