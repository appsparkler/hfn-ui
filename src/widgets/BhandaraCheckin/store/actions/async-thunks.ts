import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, UserDetails } from "../../types";
import { bhandaraCheckinSlice, RootState, ThunkApiConfig } from "../index";

// export const isCheckedInAbhyasi = createAsyncThunk<
//   boolean,
//   string,
//   ThunkApiConfig
// >(
//   "bhandara-checkin/isCheckinAbhyasi",
//   async (abhyasiId, { extra: { apis }, rejectWithValue }) => {
//     try {
//       const isCheckedIn = await apis.isAbhyasiCheckedIn(abhyasiId);
//       return isCheckedIn;
//     } catch (error) {
//       return rejectWithValue((error as Error).message);
//     }
//   }
// );

export const checkinAbhyasi = createAsyncThunk<
  boolean,
  undefined,
  ThunkApiConfig
>(
  "widget/checkinAbhyasi",
  async (_, { dispatch, extra: { apis }, getState, rejectWithValue }) => {
    const { updateDetailsSection, mainSection } = getState() as RootState;
    try {
      const { userDetails } = updateDetailsSection;
      const user = {
        ageGroup: userDetails.ageGroup.value,
        email: userDetails.email.value?.toLowerCase(),
        fullName: userDetails.fullName.value,
        gender: userDetails.gender.value,
        location: userDetails.location.value as unknown as string,
        mobile: userDetails.mobile.value,
        abhyasiId: mainSection.value.toUpperCase(),
      } as User;
      const checkinSuccess = await apis.checkinAbhyasi(user);
      if (checkinSuccess) {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
        return true;
      }
      return false;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getAbhyasiData = createAsyncThunk<User, string, ThunkApiConfig>(
  "bhandara-checkin/getAbhyasiData",
  async (abhyasiId, { extra: { apis }, rejectWithValue }) => {
    try {
      const abhyasiData = await apis.getAbhyasiData(abhyasiId);
      return abhyasiData;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const isMobileOrEmailUserCheckedIn = createAsyncThunk<
  boolean,
  UserDetails,
  ThunkApiConfig
>(
  "bhandara-checkin/isMobileOrEmailUserCheckedIn",
  async (userDetails, { extra: { apis }, rejectWithValue }) => {
    try {
      const isCheckedIn = await apis.isMobileOrEmailUserCheckedIn({
        fullName: String(userDetails.fullName.value),
        email: userDetails.email.value,
        mobile: userDetails.mobile.value,
      });
      return isCheckedIn;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const checkinMobileOrEmailUser = createAsyncThunk<
  boolean,
  User,
  ThunkApiConfig
>(
  "bhandara-checkin/checkinMobileOrEmailUser",
  async (user, { extra: { apis }, rejectWithValue }) => {
    try {
      const isCheckinSuccess = await apis.checkinMobileOrEmailUser(user);
      return isCheckinSuccess;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
