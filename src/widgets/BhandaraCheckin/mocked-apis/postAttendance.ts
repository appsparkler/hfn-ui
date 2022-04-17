import { fetchWithToken } from "./init";

export type CheckedInUserPost = {
  name: string;
  ref: string | null;
  email: string | null;
  mobile: string | null;
  attendance_datetime?: string | null;
  session?: number;
  city_id: number | null;
};

export const postAttendance = async (user: CheckedInUserPost) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer UG7P1gwxzV4KCmMZtC3Ar8IN0jdpJa");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(user);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    //   redirect: "follow",
  };
  const res = await fetch(
    "https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/",
    requestOptions
  );
  return res;
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.log("error", error));
};
