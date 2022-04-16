import { createAsyncThunk } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice, updateDetailsSectionSlice } from "../slices";
import {
  checkinMobileOrEmailUser,
  isMobileOrEmailUserCheckedIn,
} from "./async-thunks";

export const handleCheckinMobileOrEmailUser = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "bhandara-checkin/checkin-mobile-or-email-user",
  async (_, { getState, dispatch }) => {
    const {
      updateDetailsSection: { userDetails },
    } = getState() as RootState;
    dispatch(updateDetailsSectionSlice.actions.startProcessing());
    const res = await dispatch(isMobileOrEmailUserCheckedIn(userDetails));
    if (res.meta.requestStatus === "rejected") {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: res.payload as string,
        })
      );
      dispatch(updateDetailsSectionSlice.actions.stopProcessing());
    } else {
      // not checked in
      if (!res.payload) {
        const res = await dispatch(
          checkinMobileOrEmailUser({
            ageGroup: String(userDetails.ageGroup.value),
            email: String(userDetails.email.value?.toLowerCase()),
            fullName: String(userDetails.fullName.value),
            gender: String(userDetails.gender.value),
            location: userDetails.location.value as unknown as string,
            mobile: String(userDetails.mobile.value),
          })
        );
        dispatch(updateDetailsSectionSlice.actions.stopProcessing());
        if (res.meta.requestStatus === "rejected") {
          dispatch(
            snackbarSlice.actions.openSnackbar({
              children: res.payload as string,
            })
          );
        } else {
          dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
        }
      }
      dispatch(updateDetailsSectionSlice.actions.stopProcessing());
    }
  }
);
