import { RefinedCityStateCountryLocation } from "../../../components/LocationTextField/locations";
import { isEmail, isMobile } from "../../../utils";
import { UserDetails } from "../types";

export const isFieldValueValid = (
  name: keyof UserDetails,
  value: string | RefinedCityStateCountryLocation | undefined
): boolean => {
  switch (name) {
    case "ageGroup":
      return Boolean((value as string).trim());
    case "email":
      if (isEmail((value as string).trim())) return true;
      return false;
    case "fullName":
      return Boolean((value as string).trim());
    case "gender":
      return Boolean((value as string).trim());
    case "location":
      return Boolean(value);
    case "mobile":
      if (isMobile((value as string).trim())) return true;
      return false;

    default:
      return false;
  }
};
