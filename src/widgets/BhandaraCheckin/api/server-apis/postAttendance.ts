import {
  PostAttendanceFailure,
  PostAttendanceSuccess,
  PostAttendanceUser,
} from "../../types";
import { fetchWithToken } from "../utils";
import { API_URL, API_VERSION, EVENT_ID } from "./env-variables";

export const postAttendance = (
  user: PostAttendanceUser
): Promise<PostAttendanceSuccess | PostAttendanceFailure> => {
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    body: raw,
  };
  return fetchWithToken(
    `${API_URL}/api/${API_VERSION}/events/${EVENT_ID}/attendance/`,
    requestOptions
  );
};
