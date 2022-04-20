import {
  PostAttendanceFailure,
  PostAttendanceSuccess,
  PostAttendanceUser,
} from "../../types";
import { fetchWithToken } from "../init";

export const postAttendance = (
  user: PostAttendanceUser
): Promise<PostAttendanceSuccess | PostAttendanceFailure> => {
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    body: raw,
  };
  return fetchWithToken(
    "https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/",
    requestOptions
  );
};
