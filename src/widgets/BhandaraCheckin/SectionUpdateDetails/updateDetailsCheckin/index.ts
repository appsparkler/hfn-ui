import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "../../store";
import { updateDetailsSectionSlice } from "../../store/slices";
// import { checkinAbhyasi } from "../async-thunks";
import { handleCheckinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { isAbhyasiId } from "../../store/actions/utils";
import { checkinAbhyasi } from "./checkinAbhyasi";

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
  }
  dispatch(updateDetailsSectionSlice.actions.stopProcessing());
});
