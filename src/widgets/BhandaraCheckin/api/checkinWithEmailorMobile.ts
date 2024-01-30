import { CheckinWithEmailOrMobileApi } from "widgets/BhandaraCheckin/types";
import { getCheckinDocRef } from "../firebase";
import { setDoc } from "firebase/firestore";
import {
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
} from "widgets/BhandaraCheckin/types";

export const checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  attendee,
  batch
) => {
  try {
    const emailOrMobileCheckinData: CheckinWithEmailOrMobileApiStoreData = {
      ...attendee,
      batch,
      timestamp: Date.now(),
      type: CheckinTypesEnum.EmailOrMobile,
      dormAndBerthAllocation: attendee.dormAndBerthAllocation,
    };
    const mobileOrEmail =
      (attendee as { mobile: string }).mobile ||
      (attendee as { email: string }).email.toUpperCase();
    const docRef = getCheckinDocRef(`em-${attendee.fullName}-${mobileOrEmail}`);
    setDoc(docRef, emailOrMobileCheckinData, { merge: true });
    return true;
  } catch (e) {
    throw new Error("Server Error: Email/Mobile Checkin");
  }
};
