import { BhandaraCheckinAPIs } from "../types";
import { attendanceExists } from "./attendanceExitsts";
import { searchUser } from "./searchUser";
import { postAttendance } from "./postAttendance";
import { setAccessTokenOnLocalStorage } from "./utils";

setAccessTokenOnLocalStorage();

const checkedInAbhyasis: string[] = [];

export const apis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,
  checkinAbhyasi: (abhyasiId) =>
    new Promise((resolve, reject) => {
      checkedInAbhyasis.push(abhyasiId);
      resolve(true);
      // reject(false);
    }),
};
