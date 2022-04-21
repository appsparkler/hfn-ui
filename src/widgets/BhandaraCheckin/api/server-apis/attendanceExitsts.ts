import { AttendanceExistsUser } from "../../types";
import { fetchWithToken } from "../utils";
import { API_URL, API_VERSION, EVENT_ID } from "./env-variables";

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
    `${API_URL}/api/${API_VERSION}/events/${EVENT_ID}/attendance/exists/?${urlSearchParams}`,
    requestOptions
  );
};
