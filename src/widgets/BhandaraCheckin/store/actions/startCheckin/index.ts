import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "../utils";
import { RootState, ThunkApiConfig } from "../../index";
import { mainSectionSlice } from "../../slices/mainSectionSlice";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { snackbarSlice } from "../../../../../components/Snackbar/snackbarSlice";

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(
      mainSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(value);
    if (isAbhyasiId) {
      const res = await dispatch(startCheckinAbhyasi(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: res.payload as string,
          })
        );
      }
    } else {
      const res = await dispatch(startCheckinMobileOrEmailUser(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: res.payload as string,
          })
        );
      }
    }
  }
);
