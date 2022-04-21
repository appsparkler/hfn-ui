import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";

export * from "./attendanceExitsts";
export * from "./postAttendance";
export * from "./searchUser";

export const getCityId = (
  location: RefinedCityStateCountryLocation | string
): number => {
  if (typeof location === "string") {
    return Number(location);
  } else {
    return location.c_id;
  }
};
