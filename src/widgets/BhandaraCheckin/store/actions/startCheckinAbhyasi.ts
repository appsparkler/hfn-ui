import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import { User } from "../../types";

export const continueCheckinAbhyasiPart2 = createAsyncThunk<
  boolean,
  undefined,
  ThunkApiConfig
>(
  "widget/continueCheckinAbhyasiPart2",
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

const continueCheckinAbhyasi = createAsyncThunk<void, string, ThunkApiConfig>(
  "widget/continue-checkin-abhyasi",
  async (abhyasiId, { dispatch, extra: { apis } }) => {
    try {
      const abhyasiData = await apis.getAbhyasiData(abhyasiId);
      if (canCheckinDirectly(abhyasiData)) {
        dispatch(continueCheckinAbhyasiPart2());
      } else {
        const configuredUserDetails = getConfiguredUserDetails(abhyasiData);
        dispatch(
          updateDetailsSectionSlice.actions.setState({
            userDetails: configuredUserDetails,
          })
        );
        dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
      }
    } catch (error) {
      dispatch(mainSectionSlice.actions.setError((error as Error).message));
    }
  }
);

export const isCheckedInAbhyasi = createAsyncThunk<
  boolean,
  string,
  ThunkApiConfig
>(
  "bhandara-checkin/isCheckinAbhyasi",
  async (abhyasiId, { extra: { apis }, rejectWithValue }) => {
    try {
      const isCheckedIn = await apis.isAbhyasiCheckedIn(abhyasiId);
      return isCheckedIn;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>("widget/start-checkin-abhyasi", async (abhyasiId, { dispatch }) => {
  const res = await dispatch(isCheckedInAbhyasi(abhyasiId));
  if (res.meta.requestStatus === "rejected")
    dispatch(
      mainSectionSlice.actions.setState({
        error: true,
        helperText: res.payload as string,
        isProcessing: false,
      })
    );
  else if (res.payload === true) {
    dispatch(continueCheckinAbhyasi(abhyasiId));
  }
});
