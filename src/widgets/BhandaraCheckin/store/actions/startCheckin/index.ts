import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "../utils";
import { ThunkApiConfig } from "../../index";
import { mainSectionActions } from "../../index";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { isEmail, isMobile } from "../../../../../utils";
import { errorUnrecognizedInput } from "../../../utils";

export const startCheckin = createAsyncThunk<void, string, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (value, { dispatch, getState }) => {
    dispatch(mainSectionActions.startProcessing());
    const isAbhyasiId = isAbhyasiIdUtil(value);
    const isEmailOrMobile = isEmail(value) || isMobile(value);
    if (isAbhyasiId) {
      await dispatch(startCheckinAbhyasi(value));
    } else if (isEmailOrMobile) {
      await dispatch(startCheckinMobileOrEmailUser(value));
    } else {
      dispatch(mainSectionActions.setError(errorUnrecognizedInput()));
    }
    dispatch(mainSectionActions.stopProcessing());
  }
);
