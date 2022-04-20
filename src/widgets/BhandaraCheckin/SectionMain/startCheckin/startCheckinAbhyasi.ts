import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "../../store/actions/utils";
import { RootState, ThunkApiConfig } from "../../store/index";
import { bhandaraCheckinSlice } from "../../store/slices/bhandara-checkin";
import { mainSectionSlice } from "../mainSectionSlice";
import { updateDetailsSectionSlice } from "../../store/slices/updateDetailsSectionSlice";
import { UserSRCM } from "../../types";
import {
  AttendanceExistEnumType,
  isCheckedinAbhyasi,
} from "../../store/api-async-thunks/attendanceExists";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import { postAttendance, searchAbhyasi } from "../../store/api-async-thunks";
import {
  errorAbhyasiAlreadyCheckedin,
  errorAbhyasiNotFound,
  getBhandaraCheckinActionName,
  errorServer,
} from "../../store/utils";
import { getConfiguredUserDetails } from "./utils";
import { onFileText } from "./constants";

const continueCheckinAbhyasiFinal = createAsyncThunk<
  void,
  UserSRCM,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("continue-checkin-abhyasi"),
  async (abhyasi, { dispatch, getState }) => {
    const {
      mainSection: { value: abhyasiId },
    } = getState() as RootState;
    const canAbhyasiCheckinDirectly = canCheckinDirectly(abhyasi);
    // IF ABHYASI CAN CHECKIN DIRECTLY
    if (canAbhyasiCheckinDirectly) {
      const res = await dispatch(
        postAttendance({
          name: abhyasi.name,
          ref: abhyasiId.toUpperCase(),
          city_id: abhyasi.city.id,
          age_group: abhyasi.age_group,
        })
      );
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: errorServer(),
          })
        );
      } else {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
      }
    } else {
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
  }
);

export const continueCheckinFoundAbhyasi = createAsyncThunk<
  boolean,
  UserSRCM,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("continueCheckinAbhyasiPart1"),
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
  getBhandaraCheckinActionName("start-checkin-abhyasi"),
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
