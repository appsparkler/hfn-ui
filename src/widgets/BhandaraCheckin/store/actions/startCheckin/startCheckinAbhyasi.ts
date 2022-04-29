import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainSectionName, RootState, ThunkApiConfig } from "../../index";
import { UserSRCM } from "../../../types";
import {
  AttendanceExistEnumType,
  isCheckedinAbhyasi,
} from "../../api-async-thunks/attendanceExists";
import { searchAbhyasi } from "../../api-async-thunks";
import { getConfiguredUserDetails } from "./utils";
import { onFileText } from "../../../constants";
import {
  errorAbhyasiAlreadyCheckedin,
  errorAbhyasiNotFound,
  errorServer,
} from "../../../utils";
import {
  bhandaraCheckinActions,
  mainSectionActions,
  snackbarActions,
  updateDetailsActions,
} from "../../slices";

const continueCheckinAbhyasiFinal = createAsyncThunk<
  void,
  UserSRCM,
  ThunkApiConfig
>(
  `${mainSectionName}/continue-checkin-abhyasi`,
  async (abhyasi, { dispatch, getState }) => {
    // VISIT UPDATE DETAILS SECTION for updating details before checkin
    const configuredUserDetails = getConfiguredUserDetails(abhyasi);
    if (configuredUserDetails.ageGroup.value === onFileText) {
      dispatch(updateDetailsActions.setAgeOnFileOption());
    }
    if (configuredUserDetails.gender.value === onFileText) {
      dispatch(updateDetailsActions.setGenderOnFileOption());
    }
    dispatch(
      updateDetailsActions.setState({
        userDetails: configuredUserDetails,
      })
    );
    dispatch(bhandaraCheckinActions.goToUpdateDetails());
  }
);

export const continueCheckinFoundAbhyasi = createAsyncThunk<
  boolean,
  UserSRCM,
  ThunkApiConfig
>(
  `${mainSectionName}/continueCheckinFoundAbhyasi`,
  async (abhyasi, { dispatch, getState, rejectWithValue }) => {
    // CHECK IF ABHYASI IS ALREADY CHECKED IN
    const {
      mainSection: { value: abhyasiId },
    } = getState() as RootState;
    const res = await dispatch(isCheckedinAbhyasi(abhyasiId));
    if (res.meta.requestStatus === "rejected") {
      dispatch(mainSectionActions.stopProcessing());
      // ERROR HANDLING
      if (res.payload === AttendanceExistEnumType.SERVER_ERROR) {
        dispatch(
          snackbarActions.openSnackbar({
            children: errorServer(),
          })
        );
      } else if (res.payload === AttendanceExistEnumType.USER_EXISTS) {
        dispatch(
          mainSectionActions.setState({
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
  `${mainSectionName}/startCheckinAbhyasi`,
  async (abhyasiId, { dispatch, rejectWithValue }) => {
    // CHECK IF USER EXISTS IN SRCM DB
    const searchAbhyasiRes = await dispatch(searchAbhyasi(abhyasiId));
    if (searchAbhyasiRes.meta.requestStatus === "rejected") {
      // SHOW ERROR IF ABHYASI NOT FOUND
      dispatch(
        mainSectionActions.setState({
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
