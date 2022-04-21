import { AttendanceExistsUser } from "../../types";
import { fetchWithToken } from "../utils";

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
    `https://profile.srcm.net/api/v3/events/6b3ba9a6-84aa-40a4-86bc-3138493b4277/attendance/exists/?${urlSearchParams}`,
    requestOptions
  );
};
