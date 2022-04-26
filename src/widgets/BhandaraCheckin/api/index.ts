import { BhandaraCheckinAPIs } from "../types";
import { attendanceExists } from "./attendanceExitsts";
import { searchUser } from "./searchUser";
import { postAttendance } from "./postAttendance";
import { setAccessTokenOnLocalStorage } from "./utils";
import { maskedPnrs } from "./maskedPnrs";

setAccessTokenOnLocalStorage();

export const apis: BhandaraCheckinAPIs = {
  attendanceExists,
  postAttendance,
  searchUser,
  maskedPnrs,
};
