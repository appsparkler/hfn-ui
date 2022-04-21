import { BhandaraCheckinAPIs } from "../types";
import { attendanceExists, postAttendance, searchUser } from "./server-apis";
import { init } from "./init";

init();

export const mockedApis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,
};
