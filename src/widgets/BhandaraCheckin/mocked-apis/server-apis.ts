import { RefinedCityStateCountryLocation } from "../../../components/LocationTextField/locations";
import { User, UserSRCM, UserWithEmail, UserWithMobile } from "../types";
import { fetchWithToken } from "./init";

export const fetchUserDetails = (abhyasiId: string): Promise<UserSRCM> =>
  fetchWithToken(
    `https://profile.srcm.net/api/abhyasis/search/?${new URLSearchParams({
      ref: abhyasiId.toUpperCase(),
    })}`
  ).then((res) => res.results[0]);

export type CheckedInUserPost = {
  name: string;
  ref: string | null;
  email: string | null;
  mobile: string | null;
  // attendance_datetime: string | null;
  session: number;
  city_id: number;
};

export const getCityId = (
  location: RefinedCityStateCountryLocation | string
): number => {
  if (typeof location === "string") {
    return Number(location);
  } else {
    return location.c_id;
  }
};

export const checkinUser = async (user: User) => {
  const payload: CheckedInUserPost = {
    name: String(user.fullName),
    ref: String(user.abhyasiId) || null,
    email: String((user as UserWithEmail).email) || null,
    mobile: String((user as UserWithMobile).mobile) || null,
    // attendance_datetime: "2022-04-14 16:57:42",
    session: 1,
    city_id: getCityId(user.location),
  };
  const res = await fetchWithToken(
    "https://profile.srcm.net/api/v3/events/837dc13b-9073-4912-ba8a-208c9eb6432d/attendance/",
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};
