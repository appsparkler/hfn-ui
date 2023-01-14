import { CheckinWithEmailOrMobileApi } from "widgets/BhandaraCheckin/types";
import { getCheckinDocRef } from "../firebase";
import { setDoc } from "firebase/firestore";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import {
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
} from "@hfn-checkins/types";

export const checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  attendee
) => {
  try {
    const emailOrMobileCheckinData: CheckinWithEmailOrMobileApiStoreData = {
      ...attendee,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinTypesEnum.EmailOrMobile,
      updatedInReport: false,
      dormAndBerthAllocation: attendee.dormAndBerthAllocation,
    };
    const mobileOrEmail =
      (attendee as { mobile: string }).mobile ||
      (attendee as { email: string }).email;
    const docRef = getCheckinDocRef(`${attendee.fullName}-${mobileOrEmail}`);
    setDoc(docRef, emailOrMobileCheckinData);
    return true;
  } catch (e) {
    throw new Error("Server Error: Email/Mobile Checkin");
  }
};
