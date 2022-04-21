import { BhandaraCheckinAPIs } from "../types";
import { attendanceExists, postAttendance, searchUser } from "./server-apis";
import { setAccessTokenOnLocalStorage } from "./utils";

setAccessTokenOnLocalStorage();

export const apis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,
};
