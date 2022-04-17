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
import {
  abhyasiAlreadyCheckedIn,
  abhyasiNotFoundError,
  getBhandaraCheckinActionName,
  serverError,
} from "../utils";

const continueCheckinAbhyasiPart2 = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("continue-checkin-abhyasi"),
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

export const continueCheckinAbhyasiPart1 = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("continueCheckinAbhyasiPart1"),
  async (abhyasiId, { dispatch }) => {
    // CHECK IF ABHYASI IS ALREADY CHECKED IN
    const res = await dispatch(isCheckedinAbhyasi(abhyasiId));
    if (res.meta.requestStatus === "rejected") {
      // ERROR HANDLING
      if (res.payload === AttendanceExistEnumType.SERVER_ERROR) {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: serverError(),
          })
        );
      } else if (res.payload === AttendanceExistEnumType.USER_EXISTS) {
        dispatch(
          mainSectionSlice.actions.setState({
            error: true,
            helperText: abhyasiAlreadyCheckedIn(abhyasiId),
            isProcessing: false,
          })
        );
      }
    } else {
      // CONTINUE TO FINAL CHECKIN SCENARIO
      const res = await dispatch(continueCheckinAbhyasiPart2(abhyasiId));
      // handle if checkin-abhyasi-part2 is rejected
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("start-checkin-abhyasi"),
  async (abhyasiId, { dispatch }) => {
    // CHECK IF USER EXISTS IN SRCM DB
    const searchAbhyasiRes = await dispatch(searchAbhyasi(abhyasiId));
    if (searchAbhyasiRes.meta.requestStatus === "rejected") {
      // SHOW ERROR IF ABHYASI NOT FOUND
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: abhyasiNotFoundError(abhyasiId),
          isProcessing: false,
        })
      );
    } else {
      // CONTINUE CHECKIN IF ABHYASI EXISTS
      const res = await dispatch(continueCheckinAbhyasiPart1(abhyasiId));
      // handle if checkin-abhyasi-part1 is rejected
    }
  }
);
