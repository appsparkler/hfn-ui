import { BhandaraCheckinAPIs, CheckinEmailOrMobileUserDetails } from "../types";
import { attendanceExists } from "./attendanceExitsts";
import { searchUser } from "./searchUser";
import { postAttendance } from "./postAttendance";
import { setAccessTokenOnLocalStorage } from "./utils";
import { checkinAbhyasi } from "./checkinAbhyasi";

setAccessTokenOnLocalStorage();

const checkedInEmailOreMobileUsers: CheckinEmailOrMobileUserDetails[] = [];

export const apis: BhandaraCheckinAPIs = {
  attendanceExists,
  postAttendance,
  searchUser,
  checkinAbhyasi,
  checkinWithEmailOrMobile: (userDetails) =>
    new Promise((resolve, reject) => {
      checkedInEmailOreMobileUsers.push(userDetails);
      resolve(true);
    }),
};
