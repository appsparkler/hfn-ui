import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly, isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { User, UserWithEmail, UserWithMobile } from "../../types";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";

export const checkinMobileOrEmailUser = createAsyncThunk<
  boolean,
  User,
  ThunkApiConfig
>("widget/checkin-user", async (user, { extra: { apis }, rejectWithValue }) => {
  try {
    const checkinStatus = await apis.checkinMobileOrEmailUser(user);
    return checkinStatus;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);

export const continueCheckinAbhyasiPart2 = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "widget/continueCheckinAbhyasiPart2",
  async (_, { dispatch, extra: { apis }, getState }) => {
    try {
      const { updateDetailsSection, mainSection } = getState() as RootState;
      const { userDetails } = updateDetailsSection;
      const user = {
        ageGroup: userDetails.ageGroup.value,
        email: userDetails.email.value,
        fullName: userDetails.fullName.value,
        gender: userDetails.gender.value,
        location: userDetails.location.value as unknown as string,
        mobile: userDetails.mobile.value,
        abhyasiId: mainSection.value,
      } as User;
      const checkinSuccess = await apis.checkinAbhyasi(user);
      if (checkinSuccess) {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
      }
    } catch (error) {
      dispatch(mainSectionSlice.actions.setError((error as Error).message));
      dispatch(mainSectionSlice.actions.stopProcessing());
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

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  "widget/start-checkin-abhyasi",
  async (abhyasiId, { dispatch, extra: { apis } }) => {
    try {
      const isAbhyasiCheckedIn = await apis.isAbhyasiCheckedIn(abhyasiId);
      if (isAbhyasiCheckedIn)
        dispatch(
          mainSectionSlice.actions.setState({
            error: true,
            helperText: `Abhyasi with ID ${abhyasiId} is already checked in.`,
            isProcessing: false,
          })
        );
      else {
        dispatch(continueCheckinAbhyasi(abhyasiId));
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: errorMessage,
          isProcessing: false,
        })
      );
    }
  }
);

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { extra: { apis }, dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(
      mainSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(value);
    if (isAbhyasiId) {
      dispatch(startCheckinAbhyasi(value));
    } else {
    }
  }
);
