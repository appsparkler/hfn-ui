import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "../utils";
import { RootState, ThunkApiConfig } from "../../index";
import { mainSectionSlice } from "../../slices/mainSectionSlice";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { snackbarSlice } from "../../../../../components/Snackbar/snackbarSlice";
import { isEmail, isMobile } from "../../../../../utils";
import { errorUnrecognizedInput } from "../../utils";

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(mainSectionSlice.actions.startProcessing());
    const isAbhyasiId = isAbhyasiIdUtil(value);
    const isEmailOrMobile = isEmail(value) || isMobile(value);
    if (isAbhyasiId) {
      const res = await dispatch(startCheckinAbhyasi(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: res.payload as string,
          })
        );
      }
    } else if (isEmailOrMobile) {
      const res = await dispatch(startCheckinMobileOrEmailUser(value));
      if (res.meta.requestStatus === "rejected") {
        dispatch(
          snackbarSlice.actions.openSnackbar({
            children: res.payload as string,
          })
        );
      }
    } else {
      dispatch(mainSectionSlice.actions.setError(errorUnrecognizedInput()));
    }
    dispatch(mainSectionSlice.actions.stopProcessing());
  }
);
