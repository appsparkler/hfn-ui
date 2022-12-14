import { CheckinAbhyasiApi } from "widgets/BhandaraCheckin/types";
import { LocalStorageKeys } from "../constants";
import { checkinsCollection } from "widgets/BhandaraCheckin/firebase";
import { addDoc } from "firebase/firestore";
import {
  CheckinTypesEnum,
  IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";

let checkedInAbhyasis: string[] = [];

export const mockedCheckinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  checkedInAbhyasis.push(abhyasiId);
  return true;
};

export const checkinAbhyasi: CheckinAbhyasiApi = (abhyasiId) => {
  try {
    const data: IAbhyasiCheckinApiStoreData = {
      abhyasiId,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinTypesEnum.AbhyasiId,
      updatedInReport: false,
      dormAndBirthAllocation: "", // TODO: Add dormAndBirthAllocation,
      eventName: "", // TODO: Add batch
    };

    addDoc(checkinsCollection, data);
    return true;
  } catch (e) {
    throw new Error("Server Error: Abhyasi ID Checkin");
  }
};
