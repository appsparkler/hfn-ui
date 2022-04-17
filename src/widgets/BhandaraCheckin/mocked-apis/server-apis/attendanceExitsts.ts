import { AttendanceExistsUser } from "../../types";
import { fetchWithToken } from "../init";

export const attendanceExists = (
  user: AttendanceExistsUser
): Promise<{
  attendance_exists: boolean;
  registration_exists: boolean;
}> => {
  const urlSearchParams = new URLSearchParams(user);
  var requestOptions = {
    method: "GET",
  };

  return fetchWithToken(
    `https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/exists/?${urlSearchParams}`,
    requestOptions
  );
};
