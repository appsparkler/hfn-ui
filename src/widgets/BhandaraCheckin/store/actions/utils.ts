import {
  isAbhyasiId as matchesAbhyasiId,
  isAbhyasiIdTemp,
} from "../../../../utils";
import { User, UserDetails, UserWithEmail, UserWithMobile } from "../../types";
import { getInitialState } from "../slices/bhandara-checkin";

export const isAbhyasiId = (value: string) =>
  matchesAbhyasiId(value) || isAbhyasiIdTemp(value);

export const getConfiguredUserDetails = (user: User): UserDetails => {
  const defaultUserDetails: UserDetails = getInitialState().userDetails;
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