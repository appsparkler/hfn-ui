import {
  CheckinEmailOrMobileUserDetails,
  CheckinWithEmailOrMobileApi,
} from "widgets/BhandaraCheckin/types";
import { otherCheckinsCollection } from "../firebase";
import { addDoc } from "firebase/firestore";

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
    addDoc(otherCheckinsCollection, attendee);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
