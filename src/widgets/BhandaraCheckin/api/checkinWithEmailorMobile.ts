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
) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      checkedInEmailOreMobileUsers.push(userDetails);
      resolve(true);
    }, 1000);
  });

export const checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi = async (
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
    console.error("Error adding document: ", e);
    return false;
  }
};
