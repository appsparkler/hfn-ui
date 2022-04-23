import { isEmail, isMobile } from "../../../../utils";
import { getUpdateDetailsSectionInitialState } from "../slices/updateDetailsSectionSlice";
import { UserDetails } from "../../types";

export const getUserDetailsForEmailOrMobile = (
  emailOrMobile: string
): UserDetails => {
  const defaultUserDetails: UserDetails =
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
