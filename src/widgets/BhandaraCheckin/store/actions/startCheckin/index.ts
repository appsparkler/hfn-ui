import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "../utils";
import { RootState, ThunkApiConfig } from "../../index";
import { mainSectionSlice } from "../../slices/mainSectionSlice";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";
import { isEmail, isMobile } from "../../../../../utils";
import { errorUnrecognizedInput } from "../../../utils";

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(mainSectionSlice.actions.startProcessing());
    const isAbhyasiId = isAbhyasiIdUtil(value);
    const isEmailOrMobile = isEmail(value) || isMobile(value);
    if (isAbhyasiId) {
      await dispatch(startCheckinAbhyasi(value));
    } else if (isEmailOrMobile) {
      await dispatch(startCheckinMobileOrEmailUser(value));
    } else {
      dispatch(mainSectionSlice.actions.setError(errorUnrecognizedInput()));
    }
    dispatch(mainSectionSlice.actions.stopProcessing());
  }
);
