import { createAsyncThunk } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice, updateDetailsSectionSlice } from "../slices";

export const checkinMobileOrEmailUser = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "bhandara-checkin/checkin-mobile-or-email-user",
  async (_, { extra: { apis }, getState, dispatch }) => {
    const {
      updateDetailsSection: { userDetails },
    } = getState() as RootState;
    const isCheckedIn = await apis.isMobileOrEmailUserCheckedIn({
      fullName: String(userDetails.fullName.value),
      email: userDetails.email.value,
      mobile: userDetails.mobile.value,
    });
    if (isCheckedIn) {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: "User is already checked in",
        })
      );
      dispatch(
        updateDetailsSectionSlice.actions.setState({
          isProcessing: false,
        })
      );
    } else {
      const isCheckinSuccess = await apis.checkinMobileOrEmailUser({
        ageGroup: String(userDetails.ageGroup.value),
        email: String(userDetails.email.value?.toLowerCase()),
        fullName: String(userDetails.fullName.value),
        gender: String(userDetails.gender.value),
        location: userDetails.location.value as unknown as string,
        mobile: String(userDetails.mobile.value),
      });
      if (isCheckinSuccess) {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
      }
    }
  }
);
