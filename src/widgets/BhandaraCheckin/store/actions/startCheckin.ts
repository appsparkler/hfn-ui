import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId as isAbhyasiIdUtil } from "./utils";
import { RootState, ThunkApiConfig } from "../index";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { startCheckinAbhyasi } from "./startCheckinAbhyasi";
import { startCheckinMobileOrEmailUser } from "./startCheckinMobileOrEmailUser";

export const startCheckin = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "bhandara-checkin/start-checkin",
  async (_, { extra: { apis }, dispatch, getState }) => {
    const { mainSection } = getState() as RootState;
    const { value } = mainSection;
    dispatch(
      mainSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    const isAbhyasiId = isAbhyasiIdUtil(value);
    if (isAbhyasiId) {
      await dispatch(startCheckinAbhyasi(value));
    } else {
      await dispatch(startCheckinMobileOrEmailUser(value));
    }
  }
);
