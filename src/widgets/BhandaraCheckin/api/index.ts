import { BhandaraCheckinAPIs } from "../types";
import { attendanceExists } from "./attendanceExitsts";
import { searchUser } from "./searchUser";
import { postAttendance } from "./postAttendance";
import { setAccessTokenOnLocalStorage } from "./utils";

setAccessTokenOnLocalStorage();

export const apis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,
};
