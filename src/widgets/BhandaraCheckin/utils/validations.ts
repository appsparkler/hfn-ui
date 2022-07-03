import { RefinedCityStateCountryLocation } from "../../../components/LocationTextField/locations";
import { isEmail, isMobile } from "../../../utils";
import { FormUserDetails } from "../types";

export const isFieldValueValidV2 = (
  name: keyof FormUserDetails,
  value: string | undefined
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
      return Boolean((value as string).trim());
    case "mobile":
      if (isMobile((value as string).trim())) return true;
      return false;

    default:
      return false;
  }
};
