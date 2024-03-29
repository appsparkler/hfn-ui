import { getCheckinDocRef } from "../firebase";
import { setDoc } from "firebase/firestore";
import {
  CheckinTypesEnum,
  ICheckinWIthQRApiStoreData,
  IQRCheckinUser,
} from "widgets/BhandaraCheckin/types";
import { CheckinWithQRApi } from "../types/apis";
import { forEach, map } from "lodash/fp";

export const checkinWithQRCode: CheckinWithQRApi = (attendees) => {
  try {
    const currentCheckins = map<IQRCheckinUser, ICheckinWIthQRApiStoreData>(
      (attendee) => {
        return {
          ...attendee,
          timestamp: Date.now(),
          type: CheckinTypesEnum.QR,
        };
      }
    )(attendees);

    forEach<ICheckinWIthQRApiStoreData>((eachCheckin) => {
      const docRef = getCheckinDocRef(eachCheckin.regId);
      setDoc(docRef, eachCheckin, { merge: true });
    })(currentCheckins);
  } catch (e) {
    throw new Error("Server Error: QR Checkin Failed");
  }
};
