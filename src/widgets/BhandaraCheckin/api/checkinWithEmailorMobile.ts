import { CheckinWithEmailOrMobileApi } from "widgets/BhandaraCheckin/types";
import { checkinsCollection } from "../firebase";
import { addDoc } from "firebase/firestore";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import {
  CheckinEmailOrMobileUserDetails,
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
} from "@hfn-checkins/types";

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
    const emailOrMobileCheckinData: CheckinWithEmailOrMobileApiStoreData = {
      ...attendee,
      deviceId: String(localStorage.getItem(LocalStorageKeys.DEVICE_ID)),
      timestamp: Date.now(),
      type: CheckinTypesEnum.EmailOrMobile,
    };
    addDoc(checkinsCollection, emailOrMobileCheckinData);
    return true;
  } catch (e) {
    throw new Error("Server Error: Email/Mobile Checkin");
  }
};
