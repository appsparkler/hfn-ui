import { RefinedCityStateCountryLocation } from "../../../../components/LocationTextField/locations";
import {
  isAbhyasiId as matchesAbhyasiId,
  isAbhyasiIdTemp,
  isEmail,
  isMobile,
} from "../../../../utils";
import { UserDetails, UserSRCM } from "../../types";
import { getUpdateDetailsSectionInitialState } from "../slices";

export const isAbhyasiId = (value: string) =>
  matchesAbhyasiId(value) || isAbhyasiIdTemp(value);

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

export const canCheckinDirectly = (user: UserSRCM) => {
  const { email, mobile, age_group, gender, city } = user;
  const hasMobileOrEmail = Boolean(email || mobile);
  const hasCity = Boolean(city && city.id);
  return Boolean(hasMobileOrEmail && hasCity && age_group && gender);
};
