import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  isAbhyasiId as isAbhyasiIdUtil,
  isAbhyasiIdTemp,
} from "../../../../utils";
import {
  User,
  UserDetails,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../../types";
import {
  getInitialState,
  BhandaraCheckinState,
  ThunkApiConfig,
} from "../slices/bhandara-checkin";

export const isAbhyasiID = createAction(
  "bhandara-checkin/is-abhyasi-id",
  (abhyasiId: string) => {
    if (isAbhyasiIdUtil(abhyasiId) || isAbhyasiIdTemp(abhyasiId)) {
      return { payload: true };
    } else {
      return { payload: false };
    }
  }
);

export const getAbhyasiData = createAsyncThunk<
  UserWithEmail | UserWithMobile | UserWithEmailAndMobile,
  string,
  ThunkApiConfig
>(
  "bhandara-checkin/getAbhyasiData",
  async (abhyasiId, { dispatch, rejectWithValue, extra: { apis } }) => {
    try {
      const abhyasiData = apis.getAbhyasiData(abhyasiId);
      return abhyasiData;
    } catch (error) {
      return rejectWithValue({
        helperText: (error as Error).message,
        startCheckInError: true,
      } as BhandaraCheckinState);
    }
  }
);

export const areAllDetailsAvailable = createAction(
  "bhandara-checkin/areAllDetailsAvailable",
  ({ ageGroup, fullName, gender, location, ...user }: User) => {
    const { mobile } = user as UserWithMobile;
    const { email } = user as UserWithEmail;
    const hasEmailOrMobile = Boolean(mobile || email);
    return {
      payload:
        Boolean(ageGroup) &&
        Boolean(fullName) &&
        Boolean(gender) &&
        Boolean(location) &&
        Boolean(hasEmailOrMobile),
    };
  }
);

export const checkinAbhyasi = createAsyncThunk<
  boolean,
  UserWithEmail | UserWithMobile | UserWithEmailAndMobile,
  ThunkApiConfig
>("bhandara-checkin/checkinAbhyasi", async (user, { extra: { apis } }) => {
  const isCheckedIn = await apis.checkinMobileOrEmailUser(user);
  return isCheckedIn;
});

export const getConfiguredUserDetails = createAction(
  "bhandara-checkin/showMissingLinks",
  (user: UserWithEmail | UserWithMobile | UserWithEmailAndMobile) => {
    const defaultUserDetails: UserDetails = getInitialState().userDetails;

    return {
      payload: {
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
      },
    };
  }
);
