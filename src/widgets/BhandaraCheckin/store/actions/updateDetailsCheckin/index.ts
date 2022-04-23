import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../..";
import { handleCheckinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { isAbhyasiId } from "../utils";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { updateDetailsSectionSlice } from "../../slices/updateDetailsSectionSlice";

export const updateDetailsCheckin = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("updateDetailsSection/checkin-in", async (_, { dispatch, getState }) => {
  const { mainSection } = getState() as RootState;
  dispatch(updateDetailsSectionSlice.actions.startProcessing());
  if (isAbhyasiId(mainSection.value)) {
    const res = await dispatch(checkinAbhyasi());
    if (res.meta.requestStatus === "rejected") {
      console.error(res.payload);
    }
  } else {
    const res = await dispatch(handleCheckinMobileOrEmailUser());
    if (res.meta.requestStatus === "rejected") {
      console.error(res.payload);
    }
  }
  dispatch(updateDetailsSectionSlice.actions.stopProcessing());
});
