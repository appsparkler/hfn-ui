import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../../index";
import { updateDetailsActions } from "../../slices";
import { handleCheckinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { isAbhyasiId } from "../utils";
import { checkinAbhyasi } from "./checkinAbhyasi";

export const updateDetailsCheckin = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>("updateDetailsSection/checkin-in", async (_, { dispatch, getState }) => {
  const { mainSection } = getState() as RootState;
  dispatch(updateDetailsActions.startProcessing());
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
  dispatch(updateDetailsActions.stopProcessing());
});
