import { BhandaraCheckinAPIs } from "../types";
import { postAttendance, searchUser } from "./server-apis";
import { attendanceExists } from "./attendanceExitsts";
import { setAccessTokenOnLocalStorage } from "./utils";

setAccessTokenOnLocalStorage();

export const apis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,
};
