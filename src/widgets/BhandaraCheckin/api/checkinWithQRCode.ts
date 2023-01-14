import { getCheckinDocRef } from "../firebase";
import { setDoc } from "firebase/firestore";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import {
  CheckinTypesEnum,
  ICheckinWIthQRApiStoreData,
  IQRCheckinUser,
} from "@hfn-checkins/types";
import { CheckinWithQRApi } from "../types/apis";
import { forEach, map } from "lodash/fp";

export const checkinWithQRCode: CheckinWithQRApi = (attendees) => {
  try {
    const currentCheckins = map<IQRCheckinUser, ICheckinWIthQRApiStoreData>(
      (attendee) => {
        return {
          ...attendee,
          deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
          timestamp: Date.now(),
          type: CheckinTypesEnum.QR,
          updatedInReport: false,
        };
      }
    )(attendees);

    forEach<ICheckinWIthQRApiStoreData>((eachCheckin) => {
      const docRef = getCheckinDocRef(eachCheckin.regId);
      setDoc(docRef, eachCheckin);
    })(currentCheckins);
  } catch (e) {
    throw new Error("Server Error: QR Checkin Failed");
  }
};
