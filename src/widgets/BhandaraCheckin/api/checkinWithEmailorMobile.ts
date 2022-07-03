import {
  CheckinEmailOrMobileUserDetails,
  CheckinWithEmailOrMobileApi,
} from "widgets/BhandaraCheckin/types";

const checkedInEmailOreMobileUsers: CheckinEmailOrMobileUserDetails[] = [];

export const mockedCheckinWithEmailOrMobile: CheckinWithEmailOrMobileApi = (
  userDetails
) =>
  new Promise((resolve, reject) => {
    checkedInEmailOreMobileUsers.push(userDetails);
    resolve(true);
  });
