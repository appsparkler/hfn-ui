import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../../index";
import { bhandaraCheckinSlice } from "../../../BhandaraCheckin/bhandaraCheckinSlice";
import { mainSectionSlice } from "../../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../../slices/updateDetailsSectionSlice";
import { UserSRCM } from "../../../types";
import {
  AttendanceExistEnumType,
  isCheckedinAbhyasi,
} from "../../api-async-thunks/attendanceExists";
import { snackbarSlice } from "../../../../../components/Snackbar/snackbarSlice";
import { searchAbhyasi } from "../../api-async-thunks";
import { getConfiguredUserDetails } from "./utils";
import { onFileText } from "../../../constants";
import {
  errorAbhyasiAlreadyCheckedin,
  errorAbhyasiNotFound,
  errorServer,
} from "../../../utils";

const continueCheckinAbhyasiFinal = createAsyncThunk<
  void,
  UserSRCM,
  ThunkApiConfig
>(
  `${mainSectionSlice.name}/continue-checkin-abhyasi`,
  async (abhyasi, { dispatch, getState }) => {
    // VISIT UPDATE DETAILS SECTION for updating details before checkin
    const configuredUserDetails = getConfiguredUserDetails(abhyasi);
    if (configuredUserDetails.ageGroup.value === onFileText) {
      dispatch(updateDetailsSectionSlice.actions.setAgeOnFileOption());
    }
    if (configuredUserDetails.gender.value === onFileText) {
      dispatch(updateDetailsSectionSlice.actions.setGenderOnFileOption());
    }
    dispatch(
      updateDetailsSectionSlice.actions.setState({
        userDetails: configuredUserDetails,
      })
    );
    dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
  }
);

export const continueCheckinFoundAbhyasi = createAsyncThunk<
  boolean,
  UserSRCM,
  ThunkApiConfig
>(
  `${mainSectionSlice.name}/continueCheckinFoundAbhyasi`,
  async (abhyasi, { dispatch, getState, rejectWithValue }) => {
    // CHECK IF ABHYASI IS ALREADY CHECKED IN
    const {
      mainSection: { value: abhyasiId },
    } = getState() as RootState;
    const res = await dispatch(isCheckedinAbhyasi(abhyasiId));
    if (res.meta.requestStatus === "rejected") {
      dispatch(mainSectionSlice.actions.stopProcessing());
      // ERROR HANDLING
      if (res.payload === AttendanceExistEnumType.SERVER_ERROR) {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: errorServer(),
          })
        );
      } else if (res.payload === AttendanceExistEnumType.USER_EXISTS) {
        dispatch(
          mainSectionSlice.actions.setState({
            error: true,
            helperText: errorAbhyasiAlreadyCheckedin(abhyasiId),
            isProcessing: false,
          })
        );
      }
      return rejectWithValue(false);
    } else {
      // CONTINUE TO FINAL CHECKIN SCENARIO
      const res = await dispatch(continueCheckinAbhyasiFinal(abhyasi));
      // handle if checkin-abhyasi-part2 is rejected
      if (res.meta.requestStatus === "rejected") rejectWithValue(false);
      return true;
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  boolean,
  string,
  ThunkApiConfig
>(
  `${mainSectionSlice.name}/startCheckinAbhyasi`,
  async (abhyasiId, { dispatch, rejectWithValue }) => {
    // CHECK IF USER EXISTS IN SRCM DB
    const searchAbhyasiRes = await dispatch(searchAbhyasi(abhyasiId));
    if (searchAbhyasiRes.meta.requestStatus === "rejected") {
      // SHOW ERROR IF ABHYASI NOT FOUND
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: errorAbhyasiNotFound(abhyasiId),
          isProcessing: false,
        })
      );
      return rejectWithValue(false);
    } else {
      // CONTINUE CHECKIN IF ABHYASI EXISTS
      const res = await dispatch(
        continueCheckinFoundAbhyasi(searchAbhyasiRes.payload as UserSRCM)
      );
      if (res.meta.requestStatus === "fulfilled") return true;
      else return rejectWithValue(false);
    }
  }
);
