import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  mainSectionActions,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/store";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { isAbhyasiId, isEmail, isMobile, isPnr } from "utils";
import { errorUnrecognizedInput } from "widgets/BhandaraCheckin/utils";
import { bhandaraCheckinName, mainSectionName } from "../../slices";

export const startCheckin = createAsyncThunk<void, string, ThunkApiConfig>(
  `${mainSectionName}/startCheckin`,
  async () => {}
);

export const startCheckinIfNotMultiple = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>(
  `${bhandaraCheckinName}/startCheckinIfNotMultiple`,
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
