import {
  CheckinEmailOrMobileUserDetails,
  CheckinWithEmailOrMobileApi,
} from "widgets/BhandaraCheckin/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "widgets/BhandaraCheckin/firebase";

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
    await addDoc(collection(db, "other-checkins"), {
      ...attendee,
      timestamp: Date.now(),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
