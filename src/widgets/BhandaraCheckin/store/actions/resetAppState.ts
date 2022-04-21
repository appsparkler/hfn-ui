import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDetailsSectionSlice } from "../../SectionUpdateDetails/updateDetailsSectionSlice";
import {
  bhandaraCheckinSlice,
  mainSectionSlice,
  ThunkApiConfig,
} from "../index";

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);
