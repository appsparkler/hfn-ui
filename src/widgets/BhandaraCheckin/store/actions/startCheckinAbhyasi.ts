import { createAsyncThunk } from "@reduxjs/toolkit";
import { canCheckinDirectly } from "./utils";
import { ThunkApiConfig } from "../index";
import { bhandaraCheckinSlice } from "../slices/bhandara-checkin";
import { getConfiguredUserDetails } from "./utils";
import { mainSectionSlice } from "../slices/mainSectionSlice";
import { updateDetailsSectionSlice } from "../slices/updateDetailsSectionSlice";
import {
  checkinAbhyasi,
  getAbhyasiData,
  isCheckedInAbhyasi,
} from "./async-thunks";
import { User } from "../../types";

const continueCheckinAbhyasi = createAsyncThunk<void, string, ThunkApiConfig>(
  "widget/continue-checkin-abhyasi",
  async (abhyasiId, { dispatch }) => {
    const res = await dispatch(getAbhyasiData(abhyasiId));
    if (res.meta.requestStatus === "rejected") {
      dispatch(mainSectionSlice.actions.setError(res.payload as string));
    } else if (canCheckinDirectly(res.payload as User)) {
      dispatch(checkinAbhyasi());
    } else {
      const configuredUserDetails = getConfiguredUserDetails(
        res.payload as User
      );
      dispatch(
        updateDetailsSectionSlice.actions.setState({
          userDetails: configuredUserDetails,
        })
      );
      dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    }
  }
);

export const startCheckinAbhyasi = createAsyncThunk<
  void,
  string,
  ThunkApiConfig
>("widget/start-checkin-abhyasi", async (abhyasiId, { dispatch }) => {
  const res = await dispatch(isCheckedInAbhyasi(abhyasiId));
  if (res.meta.requestStatus === "rejected")
    dispatch(
      mainSectionSlice.actions.setState({
        error: true,
        helperText: res.payload as string,
        isProcessing: false,
      })
    );
  else if (res.payload === true) {
    dispatch(continueCheckinAbhyasi(abhyasiId));
  }
});
