import { isEmail, isMobile } from "../../../utils";
import { UserDetails } from "../types";

export const isFieldValueValid = (
  name: keyof UserDetails,
  value: string
): boolean => {
  switch (name) {
    case "ageGroup":
      return Boolean(value.trim());
    case "email":
      if (isEmail(value.trim())) return true;
      return false;
    case "fullName":
      return Boolean(value.trim());
    case "gender":
      return Boolean(value.trim());
    case "location":
      return Boolean(value);
    case "mobile":
      if (isMobile(value.trim())) return true;
      return false;

    default:
      return false;
  }
};
