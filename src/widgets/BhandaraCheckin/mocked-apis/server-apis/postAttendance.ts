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
    "https://profile.srcm.net/api/v3/events/6b3ba9a6-84aa-40a4-86bc-3138493b4277/attendance/",
    requestOptions
  );
};
