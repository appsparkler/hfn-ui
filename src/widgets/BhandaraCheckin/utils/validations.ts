import { isEmail, isMobile } from "utils";
import { FormUserDetails } from "widgets/BhandaraCheckin/types";

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
    case "city":
      return Boolean((value as string).trim());
    case "state":
      return Boolean((value as string).trim());
    case "country":
      return Boolean((value as string).trim());
    case "mobile":
      if (isMobile((value as string).trim())) return true;
      else return false;
    case "dormAndBerthAllocation":
      return true;

    default:
      return false;
  }
};
