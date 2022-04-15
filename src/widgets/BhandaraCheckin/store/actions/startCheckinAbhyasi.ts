import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { CurrentSectionEnum, User } from "../../types";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";

export const continueCheckinAbhyasiPart2 = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "widget/continueCheckinAbhyasiPart2",
  async (_, { dispatch, extra: { apis }, getState }) => {
    const { updateDetailsSection, mainSection, bhandaraCheckin } =
      getState() as RootState;
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
      }
    } catch (error) {
      if (
        bhandaraCheckin.currentSection === CurrentSectionEnum.UPDATE_DETAILS
      ) {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: (error as Error).message,
          })
        );
        dispatch(updateDetailsSectionSlice.actions.stopProcessing());
      } else {
        dispatch(mainSectionSlice.actions.setError((error as Error).message));
        dispatch(mainSectionSlice.actions.stopProcessing());
      }
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
