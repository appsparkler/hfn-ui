import {
  CheckinEmailOrMobileUserDetails,
  CheckinType,
  CheckinWithEmailOrMobileApi,
} from "widgets/BhandaraCheckin/types";
import { checkinsCollection } from "../firebase";
import { addDoc } from "firebase/firestore";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";

const checkedInEmailOreMobileUsers: CheckinEmailOrMobileUserDetails[] = [];

export const mockedCheckinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  userDetails
) => {
  checkedInEmailOreMobileUsers.push(userDetails);
  return true;
};

export const checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  attendee
) => {
  try {
    addDoc(checkinsCollection, {
      ...attendee,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinType.EMAIL_OR_MOBILE,
    });
    return true;
  } catch (e) {
    throw new Error("Server Error: Email/Mobile Checkin");
  }
};
