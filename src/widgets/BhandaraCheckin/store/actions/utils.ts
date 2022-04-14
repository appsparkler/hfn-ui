import {
  isAbhyasiId as matchesAbhyasiId,
  isAbhyasiIdTemp,
  isEmail,
  isMobile,
} from "../../../../utils";
import { User, UserDetails, UserWithEmail, UserWithMobile } from "../../types";
import { getUpdateDetailsSectionInitialState } from "../slices";

export const isAbhyasiId = (value: string) =>
  matchesAbhyasiId(value) || isAbhyasiIdTemp(value);

export const getConfiguredUserDetails = (user: User): UserDetails => {
  const defaultUserDetails: UserDetails =
    getUpdateDetailsSectionInitialState().userDetails;
  return {
    ...defaultUserDetails,
    email: (user as UserWithEmail).email
      ? {
          isValid: true,
          show: false,
          value: String((user as UserWithEmail).email),
        }
      : defaultUserDetails.email,
    mobile: (user as UserWithMobile).mobile
      ? {
          isValid: true,
          show: false,
          value: String((user as UserWithMobile).mobile),
        }
      : defaultUserDetails.mobile,
    ageGroup: user.ageGroup
      ? {
          isValid: true,
          show: false,
          value: String(user.ageGroup),
        }
      : defaultUserDetails.ageGroup,
    fullName: user.fullName
      ? {
          isValid: true,
          show: true,
          disabled: true,
          value: String(user.fullName),
        }
      : defaultUserDetails.fullName,
    gender: user.gender
      ? {
          isValid: true,
          show: false,
          value: String(user.gender),
        }
      : defaultUserDetails.gender,
    location: user.location
      ? {
          isValid: true,
          show: false,
          value: String(user.location) as unknown as any,
        }
      : defaultUserDetails.location,
  };
};

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
      ? { ...defaultUserDetails.email, disabled: true, value: emailOrMobile }
      : defaultUserDetails.email,
    mobile: isMobileString
      ? { ...defaultUserDetails.mobile, disabled: true, value: emailOrMobile }
      : defaultUserDetails.mobile,
  };
};

export const canCheckinDirectly = ({
  ageGroup,
  gender,
  location,
  ...user
}: User) => {
  const { email } = user as UserWithEmail;
  const { mobile } = user as UserWithMobile;
  const hasMobileOrEmail = Boolean(email || mobile);
  return Boolean(ageGroup && gender && location && hasMobileOrEmail);
};
