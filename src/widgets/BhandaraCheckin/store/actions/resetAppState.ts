import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  bhandaraCheckinSlice,
  mainSectionSlice,
  ThunkApiConfig,
  updateDetailsSectionSlice,
} from "../index";

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);
