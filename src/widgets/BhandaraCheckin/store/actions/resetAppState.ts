import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainSectionSlice } from "../../SectionMain/mainSectionSlice";
import { updateDetailsSectionSlice } from "../../SectionUpdateDetails/updateDetailsSectionSlice";
import { bhandaraCheckinSlice, ThunkApiConfig } from "../index";

export const resetAppState = createAsyncThunk<void, undefined, ThunkApiConfig>(
  "widget/reset-state",
  (_, { dispatch }) => {
    dispatch(mainSectionSlice.actions.reset());
    dispatch(bhandaraCheckinSlice.actions.reset());
    dispatch(updateDetailsSectionSlice.actions.reset());
  }
);
