import { fetchWithToken } from "../init";

export type PostAttendanceUser = {
  name: string;
  ref?: string | null;
  email: string | null;
  mobile: string | null;
  attendance_datetime?: string;
  city_id: number | null;
  age_group: string | null;
  gender: string | null;
};

export const postAttendance = (user: PostAttendanceUser) => {
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
