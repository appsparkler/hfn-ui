import { CheckinAbhyasiApi } from "widgets/BhandaraCheckin/types";
import { LocalStorageKeys } from "../constants";
import { getCheckinDocRef } from "widgets/BhandaraCheckin/firebase";
import { setDoc } from "firebase/firestore";
import {
  CheckinTypesEnum,
  IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  checkedInAbhyasis.push(abhyasiId);
  return true;
};

export const checkinAbhyasi: CheckinAbhyasiApi = (
  abhyasiId,
  dormAndBerthAllocation,
  batch
) => {
  try {
    const data: IAbhyasiCheckinApiStoreData = {
      abhyasiId,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinTypesEnum.AbhyasiId,
      updatedInReport: false,
      dormAndBerthAllocation,
      eventName: batch,
    };

    const docRef = getCheckinDocRef(abhyasiId);
    setDoc(docRef, data);
    return true;
  } catch (e) {
    throw new Error("Server Error: Abhyasi ID Checkin");
  }
};
