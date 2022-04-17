import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "./utils";
import { ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import {
  checkinAbhyasi,
  getAbhyasiData,
  // isCheckedInAbhyasi,
} from "./async-thunks";
import { User } from "../../types";
import {
  AttendanceExistEnumType,
  isCheckedinAbhyasi,
} from "../api-async-thunks/attendanceExists";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { searchAbhyasi } from "../api-async-thunks";

const continueCheckinAbhyasi = createAsyncThunk<void, string, ThunkApiConfig>(
  "widget/continue-checkin-abhyasi",
  async (abhyasiId, { dispatch }) => {
    const res = await dispatch(getAbhyasiData(abhyasiId));
    if (res.meta.requestStatus === "rejected") {
      dispatch(mainSectionSlice.actions.setError(res.payload as string));
    } else if (canCheckinDirectly(res.payload as User)) {
      dispatch(checkinAbhyasi());
    } else {
      const configuredUserDetails = getConfiguredUserDetails(
        res.payload as User
      );
      dispatch(
        updateDetailsSectionSlice.actions.setState({
          userDetails: configuredUserDetails,
        })
      );
      dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>("widget/start-checkin-abhyasi", async (abhyasiId, { dispatch }) => {
  const searchAbhyasiRes = await dispatch(searchAbhyasi(abhyasiId));
  if (searchAbhyasiRes.meta.requestStatus === "rejected") {
    dispatch(
      mainSectionSlice.actions.setState({
        error: true,
        helperText: `Abhyasi with ID ${abhyasiId} not found.`,
        isProcessing: false,
      })
    );
  }
  const res = await dispatch(isCheckedinAbhyasi(abhyasiId));
  if (res.meta.requestStatus === "rejected") {
    if (res.payload === AttendanceExistEnumType.SERVER_ERROR) {
      dispatch(
        snackbarSlice.actions.openSnackbar({
          children: "Server Error! Please try again in some time.",
        })
      );
    } else if (res.payload === AttendanceExistEnumType.USER_EXISTS) {
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: `Abhyasi with ID has ${abhyasiId} already checked in.`,
          isProcessing: false,
        })
      );
    }
  } else {
    // const res = await dispatch(continueCheckinAbhyasi(abhyasiId));
  }
});
