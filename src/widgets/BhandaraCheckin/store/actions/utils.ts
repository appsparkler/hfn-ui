import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import {
  isAbhyasiId as matchesAbhyasiId,
  isAbhyasiIdTemp,
  isEmail,
  isMobile,
} from "../../../../utils";
import {
  User,
  UserDetails,
  UserSRCM,
  UserWithEmail,
  UserWithMobile,
} from "../../types";
import { getUpdateDetailsSectionInitialState } from "../slices";

export const isAbhyasiId = (value: string) =>
  matchesAbhyasiId(value) || isAbhyasiIdTemp(value);

export const getConfiguredUserDetails = (user: UserSRCM): UserDetails => {
  const defaultUserDetails: UserDetails =
    getUpdateDetailsSectionInitialState().userDetails;
  return {
    ...defaultUserDetails,
    email: user.email
      ? {
          isValid: true,
          show: false,
          value: user.email,
        }
      : defaultUserDetails.email,
    mobile: user.mobile
      ? {
          isValid: true,
          show: false,
          value: user.mobile,
        }
      : defaultUserDetails.mobile,
    ageGroup: user.age_group
      ? {
          isValid: true,
          show: false,
          value: user.age_group,
        }
      : defaultUserDetails.ageGroup,
    fullName: user.name
      ? {
          isValid: true,
          show: true,
          disabled: true,
          value: user.name,
        }
      : defaultUserDetails.fullName,
    gender: user.gender
      ? {
          isValid: true,
          show: false,
          value: user.gender,
        }
      : defaultUserDetails.gender,
    location: user.city
      ? {
          isValid: true,
          show: false,
          value:
            (user.city?.id as unknown as RefinedCityStateCountryLocation) ||
            ("" as unknown as RefinedCityStateCountryLocation),
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

export const canCheckinDirectly = (user: UserSRCM) => {
  const { email, mobile, age_group, gender, city } = user;
  const hasMobileOrEmail = Boolean(email || mobile);
  const hasCity = Boolean(city && city.id);
  return Boolean(hasMobileOrEmail && hasCity && age_group && gender);
};
