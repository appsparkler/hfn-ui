import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ThunkApiConfig } from "..";
import { updateDetailsSectionSlice } from "../slices";
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
    if (isAbhyasiId(mainSection.value)) {
      dispatch(
        updateDetailsSectionSlice.actions.setState({
          isProcessing: true,
        })
      );
      dispatch(continueCheckinAbhyasiPart2());
    } else {
    }
  }
);
