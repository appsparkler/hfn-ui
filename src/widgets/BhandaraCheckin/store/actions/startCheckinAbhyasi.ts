import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import { UserSRCM } from "../../types";
import {
  AttendanceExistEnumType,
  isCheckedinAbhyasi,
} from "../api-async-thunks/attendanceExists";
import { snackbarSlice } from "../../../../components/Snackbar/snackbarSlice";
import {
  postAttendance,
  PostAttendanceRejectReason,
  searchAbhyasi,
} from "../api-async-thunks";
import {
  errorAbhyasiAlreadyCheckedin,
  errorAbhyasiNotFound,
  getBhandaraCheckinActionName,
  errorServer,
} from "../utils";

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
          // email: null,
          // gender: null,
          // mobile: null,
        })
      );
      if (res.meta.requestStatus === "rejected") {
        dispatch(mainSectionSlice.actions.stopProcessing());
        if (res.payload === PostAttendanceRejectReason.ALREADY_CHECKED_IN) {
          dispatch(
            mainSectionSlice.actions.setError(
              errorAbhyasiAlreadyCheckedin(abhyasiId)
            )
          );
        } else if (res.payload === PostAttendanceRejectReason.SERVER_ERROR) {
          dispatch(
            snackbarSlice.actions.openSnackbar({
              children: errorServer(),
            })
          );
        }
      } else {
        dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess());
        dispatch(mainSectionSlice.actions.stopProcessing());
      }
    } else {
      // VISIT UPDATE DETAILS SECTION
      dispatch(mainSectionSlice.actions.stopProcessing());
      const configuredUserDetails = getConfiguredUserDetails(abhyasi);
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
  void,
  UserSRCM,
  ThunkApiConfig
>(
  getBhandaraCheckinActionName("continueCheckinAbhyasiPart1"),
  async (abhyasi, { dispatch, getState }) => {
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
    } else {
      // CONTINUE TO FINAL CHECKIN SCENARIO
      const res = await dispatch(continueCheckinAbhyasiFinal(abhyasi));
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
      dispatch(mainSectionSlice.actions.stopProcessing());
      dispatch(
        mainSectionSlice.actions.setState({
          error: true,
          helperText: errorAbhyasiNotFound(abhyasiId),
          isProcessing: false,
        })
      );
    } else {
      // CONTINUE CHECKIN IF ABHYASI EXISTS
      const res = await dispatch(
        continueCheckinFoundAbhyasi(searchAbhyasiRes.payload as UserSRCM)
      );
      // handle if checkin-abhyasi-part1 is rejected
    }
  }
);
