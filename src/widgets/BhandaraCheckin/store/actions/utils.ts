import { isEmail, isMobile } from "../../../../utils";
import { getUpdateDetailsSectionInitialState } from "../slices/updateDetailsSectionSlice";
import { UserDetails, UserDetailsV2 } from "../../types";
import { getUpdateDetailsV2SectionInitialState } from "../slices";

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

export const getUserDetailsForEmailOrMobileV2 = (
  emailOrMobile: string
): UserDetailsV2 => {
  const defaultUserDetails: UserDetailsV2 =
    getUpdateDetailsV2SectionInitialState().userDetails;
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
