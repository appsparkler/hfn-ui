import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mainSectionActions,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/store";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { isAbhyasiId, isEmail, isMobile, isPnr } from "utils";
import { errorUnrecognizedInput } from "widgets/BhandaraCheckin/utils";

export const startCheckin = createAsyncThunk<void, string, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (value, { dispatch, getState }) => {
    dispatch(mainSectionActions.startProcessing());
    const isEmailOrMobile = isEmail(value) || isMobile(value);
    if (isAbhyasiId(value)) {
      await dispatch(startCheckinAbhyasi(value));
    } else if (isEmailOrMobile) {
      await dispatch(startCheckinMobileOrEmailUser(value));
    } else if (isPnr(value)) {
    } else {
      dispatch(mainSectionActions.setError(errorUnrecognizedInput()));
    }
    dispatch(mainSectionActions.stopProcessing());
  }
);
