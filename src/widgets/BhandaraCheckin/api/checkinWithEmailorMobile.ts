import {
  CheckinEmailOrMobileUserDetails,
  CheckinWithEmailOrMobileApi,
} from "widgets/BhandaraCheckin/types";
import { v4 as uuid } from "uuid";
import { db } from "widgets/BhandaraCheckin/dexie";

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
    db.otherCheckins.add({
      id: uuid(),
      ...attendee,
      timestamp: Date.now(),
      deviceId: String(localStorage.getItem("deviceId")),
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
