import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "..";
import { updateDetailsSectionSlice } from "../slices";
import { checkinMobileOrEmailUser } from "./checkinMobileOrEmailUser";
import { continueCheckinAbhyasiPart2 } from "./startCheckinAbhyasi";
import { isAbhyasiId } from "./utils";

export const updateDetailsCheckin = createAsyncThunk<
  void,
  undefined,
  ThunkApiConfig
>(
  "updateDetailsSection/checkin-in",
  async (state, { dispatch, extra: { apis }, getState }) => {
    const { mainSection } = getState() as RootState;
    dispatch(
      updateDetailsSectionSlice.actions.setState({
        isProcessing: true,
      })
    );
    if (isAbhyasiId(mainSection.value)) {
      dispatch(continueCheckinAbhyasiPart2());
    } else {
      dispatch(checkinMobileOrEmailUser());
    }
  }
);
