import { isEmail, isMobile } from "../../../../utils";
import { FormUserDetails } from "../../types";
import { getUpdateDetailsSectionInitialState } from "../slices";

export const getUserDetailsForEmailOrMobile = (
  emailOrMobile: string
): FormUserDetails => {
  const defaultUserDetails: FormUserDetails =
    getUpdateDetailsSectionInitialState().userDetails;
  const isEmailString = isEmail(emailOrMobile);
  const isMobileString = isMobile(emailOrMobile);
  return {
    ...defaultUserDetails,
    email: isEmailString
      ? {
          ...defaultUserDetails.email,
          disabled: true,
          value: emailOrMobile.toLowerCase(),
        }
      : defaultUserDetails.email,
    mobile: isMobileString
      ? { ...defaultUserDetails.mobile, disabled: true, value: emailOrMobile }
      : defaultUserDetails.mobile,
  };
};
